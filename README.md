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

## The quote form (Netlify Forms)

The contact form is wired for **Netlify Forms** (`data-netlify="true"`, a hidden
`form-name`, and a honeypot). On deploy Netlify auto-detects it and captures
submissions; successful submits redirect to `thank-you.html`.

To get the submissions emailed to the client:
**Netlify → Site settings → Forms → Form notifications → Add notification → Email**,
sending to `vermacconstruction1@gmail.com`.

(Not hosting on Netlify? Swap the form for a Formspree endpoint or a serverless
handler instead.)

## Notes

- Fonts load from Google Fonts; for best Lighthouse scores, self-host Poppins + Inter.
- The real Vermac logo and team photo are referenced from the current Wix site; both
  degrade gracefully to a text/gradient fallback if unavailable. Request higher-res
  originals before launch.
