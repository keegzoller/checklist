/**
 * Form submission notifier — the free-plan alternative to Netlify's built-in
 * email notifications (Project configuration → Notifications), which require a
 * paid plan.
 *
 * Netlify fires this function automatically on every *verified* (non-spam) form
 * submission — the filename `submission-created` is what registers the trigger,
 * so don't rename it. Event-triggered functions are included on the free plan.
 *
 * Pick a channel by setting environment variables in the Netlify UI
 * (Project configuration → Environment variables). Anything you set gets sent;
 * anything you leave unset is skipped. Setting several is fine.
 *
 *   Phone push, no signup:  NTFY_TOPIC          e.g. vermac-leads-8f3k
 *                           NTFY_SERVER         (optional, default https://ntfy.sh)
 *   Email:                  RESEND_API_KEY      free tier, 3k emails/month
 *                           NOTIFY_EMAIL_TO     vermacconstruction1@gmail.com
 *                           NOTIFY_EMAIL_FROM   (optional, default onboarding@resend.dev)
 *   Text message:           TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID
 *   Chat:                   SLACK_WEBHOOK_URL  /  DISCORD_WEBHOOK_URL
 *
 * If nothing is configured the submission is still logged to the function log,
 * so a lead is never lost.
 */

interface FormPayload {
  form_name?: string
  created_at?: string
  site_url?: string
  data?: Record<string, unknown>
}

/* Fields Netlify adds or that only exist for spam filtering — not worth notifying about. */
const HIDDEN_FIELDS = new Set(['form-name', 'bot-field', 'ip', 'user_agent', 'referrer'])

const LABELS: Record<string, string> = {
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  town: 'Town / address',
  location: 'Location',
  service: 'Service',
  company: 'Company',
  scope: 'Scope',
  timeline: 'Timeline',
  message: 'Message',
  'inquiry-type': 'Inquiry type',
}

function label(key: string) {
  return LABELS[key] || key.replace(/[-_]/g, ' ').replace(/^./, (c) => c.toUpperCase())
}

function readableForm(formName: string) {
  if (formName === 'homeowner-project') return 'Homeowner'
  if (formName === 'builder-project') return 'Builder / GC'
  return formName || 'website form'
}

/** Flatten the submitted fields into "Label: value" lines, dropping empties. */
function fieldLines(data: Record<string, unknown>) {
  return Object.entries(data)
    .filter(([key, value]) => !HIDDEN_FIELDS.has(key) && String(value ?? '').trim() !== '')
    .map(([key, value]) => `${label(key)}: ${String(value).trim()}`)
}

/** HTTP headers can only carry latin-1, so fold anything else (em dashes, accents) down. */
function asciiHeader(value: string) {
  return value
    .replace(/[‒-―]/g, '-')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[^\x20-\x7e]/g, '')
}

async function send(channel: string, request: Promise<Response>) {
  try {
    const res = await request
    if (!res.ok) {
      console.error(`[notify] ${channel} failed: ${res.status} ${await res.text().catch(() => '')}`)
      return
    }
    console.log(`[notify] ${channel} sent`)
  } catch (err) {
    console.error(`[notify] ${channel} errored:`, err)
  }
}

export default async (req: Request) => {
  const { payload } = (await req.json()) as { payload: FormPayload }
  const data = payload?.data || {}
  const formLabel = readableForm(payload?.form_name || '')
  const lines = fieldLines(data)

  const title = `New ${formLabel} lead — Vermac Construction`
  const body = lines.join('\n')
  const dashboard = 'https://app.netlify.com/projects/vermac/forms'

  /* Always log it — the function log is the fallback record if no channel is configured. */
  console.log(`[notify] ${title}\n${body}`)

  const {
    NTFY_TOPIC,
    NTFY_SERVER,
    RESEND_API_KEY,
    NOTIFY_EMAIL_TO,
    NOTIFY_EMAIL_FROM,
    TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID,
    SLACK_WEBHOOK_URL,
    DISCORD_WEBHOOK_URL,
  } = process.env

  const jobs: Promise<void>[] = []

  /* ntfy.sh — free push notification to your phone, no account needed.
     Install the ntfy app, subscribe to your topic, done. Pick an unguessable
     topic name: anyone who knows it can read (and post to) your notifications. */
  if (NTFY_TOPIC) {
    const server = (NTFY_SERVER || 'https://ntfy.sh').replace(/\/$/, '')
    jobs.push(
      send(
        'ntfy',
        fetch(`${server}/${encodeURIComponent(NTFY_TOPIC)}`, {
          method: 'POST',
          headers: {
            Title: asciiHeader(title),
            Priority: 'high',
            Tags: 'hammer_and_wrench',
            Click: dashboard,
          },
          body,
        }),
      ),
    )
  }

  /* Email via Resend. The default from-address only delivers to the address that
     owns the Resend account; verify a domain to send anywhere else. */
  if (RESEND_API_KEY && NOTIFY_EMAIL_TO) {
    const replyTo = typeof data.email === 'string' ? data.email : undefined
    jobs.push(
      send(
        'resend',
        fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: NOTIFY_EMAIL_FROM || 'Vermac Website <onboarding@resend.dev>',
            to: NOTIFY_EMAIL_TO.split(',').map((addr) => addr.trim()),
            ...(replyTo ? { reply_to: replyTo } : {}),
            subject: title,
            text: `${body}\n\nAll submissions: ${dashboard}`,
          }),
        }),
      ),
    )
  }

  /* Telegram — lands as a phone notification like a text message. */
  if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
    jobs.push(
      send(
        'telegram',
        fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: `🔨 ${title}\n\n${body}`,
            disable_web_page_preview: true,
          }),
        }),
      ),
    )
  }

  if (SLACK_WEBHOOK_URL) {
    jobs.push(
      send(
        'slack',
        fetch(SLACK_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: `*${title}*\n${body}` }),
        }),
      ),
    )
  }

  if (DISCORD_WEBHOOK_URL) {
    jobs.push(
      send(
        'discord',
        fetch(DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: `**${title}**\n${body}`.slice(0, 1900) }),
        }),
      ),
    )
  }

  if (jobs.length === 0) {
    console.warn(
      '[notify] No notification channel configured. Set NTFY_TOPIC (easiest) or ' +
        'RESEND_API_KEY + NOTIFY_EMAIL_TO in Netlify environment variables.',
    )
  }

  await Promise.all(jobs)

  return new Response('OK')
}
