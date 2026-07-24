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

## Making the quote form work

The contact form posts to a placeholder endpoint. Point its `action=` at a form
handler (Formspree, Netlify Forms, or a small serverless function) that emails
submissions to `vermacconstruction1@gmail.com`.

## Notes

- Fonts load from Google Fonts; for best Lighthouse scores, self-host Poppins + Inter.
- The real Vermac logo and team photo are referenced from the current Wix site; both
  degrade gracefully to a text/gradient fallback if unavailable. Request higher-res
  originals before launch.
