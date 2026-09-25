# What we still need from you

Everything in the film renders today without any of this — the placeholders are real
components, not empty boxes. But each item below replaces something built from a guess with
something built from the product, and they are listed in the order that buys the most.

---

## 1. The Vero logo — highest value, smallest effort

`public/logos/vero-mark.png` is the mark **keyed out of a 174px crop of the September screen
recording**. It is the only Vero asset we have, and it is soft anywhere above ~150px, which
is why it never appears larger than that in any of the three cuts.

**Send:** transparent PNG at 1024px+, or the SVG. Ideally also a horizontal lockup
(mark + "Vero" wordmark) if one exists.

**Where it lands:** drop the file in `public/logos/` and name it in
`src/fast/logoAssets.ts` under `vero`. Then the size cap comes off and the open, the intro,
the connection hub and the close can all use it large.

---

## 2. Dashboard captures

Three real screens are in the film today: the Connections page, the workspace home, and the
investigating state. Everything else that looks like Vero is a designed panel matching the
product's light palette.

Each capture below replaces one designed panel outright. **App window only, 2400px wide or
more, at a normal zoom level.** A real workspace with a blurred client name is fine — we
already blur one in the Connections shot.

| # | Capture | Replaces | Beat |
| --- | --- | --- | --- |
| 1 | **A rendered answer** — a real reply in the workspace, ideally one where Vero pushes back or declines | `Exchange` ×2 | "What it sounds like" |
| 2 | **A location lift table** showing at least one row withheld as unreadable | `RefusePanel` | "the first thing that will tell you no" |
| 3 | **Channel return comparison** — return per dollar by channel | `NextDollar` panel | act 5 |
| 4 | **The floor / counterfactual chart** — marketed vs. unmarketed over time | `BaselinePanel` | "it builds the floor" |
| 5 | **A forecast or scenario view**, if one exists yet | `ForecastPanel` | "it forecasts the change" |
| 6 | **Product / item-level attribution** — what the attributed customers actually bought | right half of `AttributionPanel` | "what they came for" |
| 7 | **A reasoning / show-your-work view** — the rows behind a number | `DeterministicPanel` | "it reasons deterministically" |

If a screen doesn't exist in the product yet, say so and the panel stays as-is — it is
better to keep an honest mockup than to fake a screenshot.

---

## 3. Third-party logos

Sixteen brand marks appear in the connection beats. Most are correct already.

**Correct — official paths from `simple-icons`, nothing needed:**
Square · Shopify · Meta · Google Ads · TikTok · Google Analytics · Yelp · Snapchat

**Drawn by hand, honest geometry, fine to leave:**
Clover (the clover leaf) · Google Business Profile (the map pin)

**Monogram stand-ins — a coloured tile with a letter, in the brand's own colour:**

| Brand | Why it is a stand-in |
| --- | --- |
| **Toast** | logo is a custom wordmark |
| **Lightspeed** | custom wordmark |
| **NCR Aloha** | custom wordmark |
| **Simpli.fi** | custom wordmark |
| **Klaviyo** | custom wordmark |
| **Nextdoor** | the official mark is a wordmark that turns to mush at tile size |

These read as a lockup at video scale and are deliberately not bad traces of someone's
trademark. If you want the real ones, grab the SVG from each brand's press or partner page,
drop it in `public/logos/`, and name it in `src/fast/logoAssets.ts`. One line each.

**Worth deciding:** the POS list is currently Toast, Square, Clover, Lightspeed, Shopify POS
and NCR Aloha; the channel list is Meta, Google Ads, TikTok, Google Analytics, Business
Profile, Simpli.fi, Yelp, Snapchat, Nextdoor and Klaviyo. If Vero actually integrates with
something not on those lists — or doesn't integrate with something that is — tell me and
I'll swap them. Showing a logo we can't connect to is the one thing here that could bite.

---

## 4. Optional, but they would make it feel bigger

- **A voiceover.** Scripts for all three cuts are written to the existing timing, so
  recording them moves nothing. `SCRIPT-FILM.md` has the current one, beat by beat.
- **A music bed.** Nothing ships in the repo and the render is silent. Something restrained
  — the film's whole register is calm.
- **A real customer number**, even one. Every figure on screen is currently illustrative.
  One true result, attributable, changes the character of the whole close.
