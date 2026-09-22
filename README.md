# Vermac Construction public website

Production: https://vermacconstruction.com/
Repository: keegzoller/checklist (the keegzoller/vermac repository is the separate estimator).
Netlify project: vermac. Production branch: main. Static HTML, CSS and JavaScript; no build step.

## Quote delivery

Both homeowner-project and builder-project are detected by Netlify Forms at deploy time.
The browser first saves the submission to Netlify. Only a successful save leads to the confirmation page.
A secondary GoHighLevel webhook receives the existing CRM field mapping; failure or timeout there does not discard a saved request.
Native form submissions still work without JavaScript. The hidden bot-field provides Netlify honeypot filtering.

**Email notifications must be configured in Netlify → Forms → Submission notifications.**
The intended business recipient is vermacconstruction1@gmail.com; confirm any additional recipient before adding it.
Email subject identifies homeowner vs builder inquiries. The email field enables Reply-to to the homeowner.
Netlify provides durable submission storage and email notifications without a custom email API credential.
An accepted POST proves request handling, not delivery to an inbox. Verify an identified test in Netlify and the recipient inbox.

Campaign labels and the landing/submission paths are included in saved forms. No analytics provider is configured here.
If a Google tag is installed separately, generate_lead is emitted after successful capture with form name only.

## SEO

- Server-rendered static service pages at /siding-installation/ and /siding-replacement/.
- /service-area/ describes the existing published coverage; no invented office locations.
- Unique titles, descriptions, canonical URLs, social metadata and JSON-LD.
- /robots.txt and /sitemap.xml; confirmation and internal checklist excluded from the sitemap and marked noindex.
- _redirects maps relevant old Wix routes to current content. Unknown/retired pages retain 404 rather than redirecting every URL to the homepage.
- Search Console submission and Google Business Profile verification require those account sessions. No claim of completed indexing or improved ranking is made by deploying this code.

## Checks

`npm test` runs form delivery tests; `python3 scripts/check-site.py` checks local page structure, links, schema and sitemap.
Preview locally: `python3 -m http.server 8765` (Netlify Forms POSTs require a Netlify deploy).
Production verification must include both mobile/desktop display, a labeled test request, saved submission and email receipt.
