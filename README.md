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

## Inline homeowner quote flow

Homepage quote links progressively open an inline panel below the hero. The wizard clones the existing detected homeowner form, preserving its Netlify name and fields. Project choices advance immediately; text answers use Continue or Enter. Details are optional. Review includes direct edit actions; closing retains in-page progress. The original bottom forms remain available, including when JavaScript is unavailable. Email notification configuration is still managed in Netlify, not in the wizard.

Browser verified: required town validation, all questions, optional details, review editing, close/reopen persistence, capture failure/retry, successful isolated local capture and thank-you redirect, and mobile layout. The isolated success test blocked external CRM requests and verified the encoded payload locally.

### Popup correction

Quote buttons open a native modal dialog over the current page, matching the Chores No More entry behavior. The same guided card replaces the long bottom form and service-page forms when JavaScript is available. Moving the single card between its bottom mount and dialog preserves answers. Native dialog provides focus containment, Escape dismissal, and inert background; body scroll is locked while open. Closing restores the original trigger focus. Static forms remain solely as progressive/no-JavaScript fallback and for Netlify build-time form detection.

## September 2026 site refinements

- `/builders/` restores a dedicated builder/GC intake, linked in primary navigation and on the homepage.
- `/future-builders/` introduces Vermac Future Builders, with a separate student/parent/educator inquiry and homepage announcement strip. College assistance is described only as assistance after two years working at Vermac; amounts and detailed participation terms remain to be established by the business.
- `/service-area/` links to 11 individual town pages. Each includes a distinct planning topic, related services, neighboring towns, a quote wizard, canonical metadata, and Service/WebPage schema. No town-specific offices, reviews, or project locations are invented.
- `refinements.css` is shared by the homepage and interior pages. `showcase.js` adds a horizontal project gallery with touch scrolling, mouse dragging, arrow navigation, optional autoplay, and reduced-motion handling. Photo enlargement uses a native modal dialog.
- `inquiry-wizard.js` progressively enhances builder and student forms. Static form markup remains available for Netlify detection and non-JavaScript submission. `quote.js` saves all three inquiry types in Netlify before optional CRM forwarding.

Validation: `npm test`, `python3 scripts/check-site.py`, desktop/mobile browser checks, and isolated local builder/student submissions with external CRM blocked. Local form tests verify capture payloads, required input, invalid email, and edit/review behavior without generating customer-facing test messages.
