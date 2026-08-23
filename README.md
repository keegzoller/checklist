# Vermac Construction — Website

A clean, modern, conversion-focused website for **Vermac Construction Inc**, the
family-owned siding contractor serving Saratoga County, NY.

- **`index.html`** — the new Vermac Construction homepage. Single-file, static
  (semantic HTML + CSS + vanilla JS, no build step). Built from the design system
  in `design.md` and the business content in `info.md`.
- **`checklist.html`** — the previous "Campaign Setup Tracker" checklist tool,
  preserved here (it was the repo's original `index.html`).

## Before launch — client to confirm

The build never fabricates unverified facts. Search `index.html` for **`CONFIRM`**
and **`PLACEHOLDER`** to find the items the client must supply or verify:

- License #, insurance details, and any workmanship warranty wording
- Business hours; whether to publish a street address
- Real customer reviews (name + town) — the review cards are placeholders
- Real project photos + before/after pairs (the slider uses placeholder graphics)
- Exact siding materials/brands installed (and manufacturer certifications, before adding logos)
- Full service-area town list; live social media URLs
- Financing options, if any

## Deploy (Netlify)

The site is static — no build step. `netlify.toml` sets the publish directory to
the repo root.

1. Netlify → **Add new site → Import from GitHub** → pick this repo → deploy.
2. **Domain:** Netlify → *Domain settings* → add `vermacconstruction.com`, then update
   the DNS at the current registrar to the values Netlify shows. Email on
   `vermacconstruction1@gmail.com` (Gmail) is unaffected — no MX changes needed.

## Lead forms (GoHighLevel + Netlify backup)

There are two intake forms — **Homeowner** (`homeowner-project`) and **Builder/GC**
(`builder-project`) — toggled by a segmented control in the contact section.

On submit, JavaScript does two things, then redirects to `thank-you.html`:

1. **GoHighLevel** — POSTs the lead as JSON to the LeadConnector inbound webhook
   (`GHL_WEBHOOK` in `index.html`), which fires the client's **SMS + email** workflow.
   Phone is normalized to E.164; builder-specific fields (company, scope, timeline,
   location) are included and summarized into `message`.
2. **Netlify Forms** — captures a backup copy (AJAX) so a lead survives even if the
   GHL workflow is ever paused. Both forms have `data-netlify`, a hidden `form-name`,
   and a honeypot (`bot-field`). If JS is disabled, the native submit still captures
   to Netlify.

**Client setup:**
- **GoHighLevel:** the workflow (Inbound Webhook → Create/Update Contact → Send SMS →
  Send Email) must be built + published in GHL, with a registered A2P/10DLC number for
  SMS. See `integrations.md` for the field mapping and a `curl` test command.
- **Netlify submission alerts:** see below — a serverless function, not the built-in
  email notification (that one needs a paid plan).

## Submission alerts on the free plan

Netlify's built-in form email notifications are a paid-plan feature. Instead,
`netlify/functions/submission-created.mts` runs automatically on every **verified**
(non-spam) submission — event-triggered functions are included on the free plan — and
sends the lead wherever you point it. Netlify still stores every submission at
*Project configuration → Forms*, regardless.

Choose a channel by adding environment variables in the Netlify UI
(*Project configuration → Environment variables*). Whatever is set gets sent; unset
channels are skipped, and setting more than one is fine. No redeploy of the code is
needed — just a redeploy to pick up new variables.

| Channel | Variables | Notes |
| --- | --- | --- |
| **Phone push** *(easiest, no signup)* | `NTFY_TOPIC` | Install the free [ntfy](https://ntfy.sh) app, subscribe to the same topic name. Use something unguessable — anyone who knows the topic can read it. |
| **Email** | `RESEND_API_KEY`, `NOTIFY_EMAIL_TO` | [Resend](https://resend.com) free tier is 3,000 emails/month. Optional `NOTIFY_EMAIL_FROM`; the default sender only delivers to the address that owns the Resend account until you verify a domain. |
| **Text-style message** | `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | Create a bot via @BotFather. |
| **Slack / Discord** | `SLACK_WEBHOOK_URL` / `DISCORD_WEBHOOK_URL` | Incoming-webhook URL from the app. |

With nothing configured, submissions are still written to the function log
(*Logs → Functions → submission-created*), so a lead is never lost.

**Testing:** submit the real form on the live site with real-looking values — test
strings like `asdf` or `test@test.com` get flagged as spam, and spam submissions never
trigger the function.

The webhook URL is a public ingestion endpoint (accepts data only), so it's safe in
client-side code.

## Notes

- Fonts load from Google Fonts; for best Lighthouse scores, self-host Poppins + Inter.
- The real Vermac logo and team photo are referenced from the current Wix site; both
  degrade gracefully to a text/gradient fallback if unavailable. Request higher-res
  originals before launch.
