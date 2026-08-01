/**
 * Netlify Forms trigger: runs on every verified (non-spam) form submission and
 * emails the lead to the sales inbox.
 *
 * The filename is the trigger — `submission-created` is invoked by Netlify Forms
 * automatically, it is not meant to be called directly.
 *
 * Env vars:
 *   RESEND_API_KEY    required — API key for the Resend mail API (https://resend.com)
 *   LEAD_NOTIFY_TO    optional — override the recipient (default below)
 *   LEAD_NOTIFY_FROM  optional — override the sender; must be on a domain verified in Resend
 */

const DEFAULT_TO = 'keeganzoller@vc-solutions.net'
const DEFAULT_FROM = 'Vermac Website <onboarding@resend.dev>'

/** Fields Netlify adds or that only exist for spam filtering — not worth showing in the email. */
const HIDDEN_FIELDS = new Set(['form-name', 'bot-field', 'subject', 'ip', 'user_agent', 'referrer'])

const FIELD_LABELS: Record<string, string> = {
  name: 'Name',
  company: 'Company',
  phone: 'Phone',
  email: 'Email',
  town: 'Town / Address',
  location: 'Project location',
  service: 'Service needed',
  scope: 'Scope',
  timeline: 'Timeline',
  message: 'Project details',
  'inquiry-type': 'Inquiry type',
  page_url: 'Submitted from',
}

const FIELD_ORDER = [
  'inquiry-type',
  'company',
  'name',
  'phone',
  'email',
  'town',
  'location',
  'service',
  'scope',
  'timeline',
  'message',
]

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case '&':
        return '&amp;'
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '"':
        return '&quot;'
      default:
        return '&#39;'
    }
  })

/** Order the known fields first, then anything else the form happens to send. */
const orderFields = (data: Record<string, unknown>) => {
  const keys = Object.keys(data).filter((key) => !HIDDEN_FIELDS.has(key))
  const known = FIELD_ORDER.filter((key) => keys.includes(key))
  const rest = keys.filter((key) => !FIELD_ORDER.includes(key)).sort()
  return [...known, ...rest]
    .map((key) => ({
      key,
      label: FIELD_LABELS[key] || key.replace(/[-_]/g, ' ').replace(/^./, (c) => c.toUpperCase()),
      value: String(data[key] ?? '').trim(),
    }))
    .filter((field) => field.value !== '')
}

export default async (req: Request) => {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    // Nothing to send with. Return 200 so Netlify does not retry — the submission
    // itself is safely stored and Netlify's built-in notification email still fires.
    console.warn('RESEND_API_KEY is not set — skipping lead notification email.')
    return new Response('Email skipped: RESEND_API_KEY is not configured', { status: 200 })
  }

  let payload: { form_name?: string; data?: Record<string, unknown>; created_at?: string }
  try {
    payload = ((await req.json()) as { payload?: typeof payload }).payload ?? {}
  } catch {
    console.error('submission-created received a body that was not JSON.')
    return new Response('Invalid payload', { status: 400 })
  }

  const data = payload.data ?? {}
  const fields = orderFields(data)
  const formName = payload.form_name || 'website form'
  const who = String(data.name || data.company || 'Website visitor').trim()
  const inquiry = String(data['inquiry-type'] || '').trim()
  const subject = inquiry ? `New ${inquiry} lead: ${who}` : `New website lead: ${who}`

  const header = [
    `New submission from the ${formName} form on vermacconstruction.com`,
    payload.created_at ? `Received: ${payload.created_at}` : '',
  ].filter(Boolean)

  const textBody = [...header, '', ...fields.map((field) => `${field.label}: ${field.value}`)].join('\n')

  const htmlBody = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#1c0c0f;line-height:1.5">
      <h2 style="margin:0 0 4px;color:#a62b34">New website lead</h2>
      <p style="margin:0 0 20px;color:#666;font-size:14px">
        From the ${escapeHtml(formName)} form on vermacconstruction.com${
          payload.created_at ? ` &middot; ${escapeHtml(payload.created_at)}` : ''
        }
      </p>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:560px">
        ${fields
          .map(
            (field) => `
          <tr>
            <td style="padding:8px 16px 8px 0;vertical-align:top;color:#666;font-size:14px;white-space:nowrap;border-bottom:1px solid #eee">
              ${escapeHtml(field.label)}
            </td>
            <td style="padding:8px 0;vertical-align:top;font-size:15px;border-bottom:1px solid #eee">
              ${escapeHtml(field.value).replace(/\n/g, '<br>')}
            </td>
          </tr>`,
          )
          .join('')}
      </table>
    </div>
  `.trim()

  const replyTo = String(data.email || '').trim()

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.LEAD_NOTIFY_FROM || DEFAULT_FROM,
      to: [process.env.LEAD_NOTIFY_TO || DEFAULT_TO],
      subject,
      text: textBody,
      html: htmlBody,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  })

  if (!response.ok) {
    const detail = await response.text()
    console.error(`Resend rejected the lead notification (${response.status}): ${detail}`)
    return new Response('Failed to send notification email', { status: 502 })
  }

  console.log(`Lead notification email sent for the ${formName} form.`)
  return new Response('OK')
}
