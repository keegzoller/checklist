# Vero VSL (fast cut): script and shot list

**Composition:** `VeroFast` · 1920x1080 · 30fps · 1,590 frames (0:53)
**Audience:** cold prospects, multi-location and franchise operators
**Ask:** 15-minute walkthrough on their own accounts
**Reference:** the Fynd VSL — kinetic typography, hard colour cuts, logo constellation.
Same grammar, **VC Solutions' brand** and Vero's story.

**Brand:** everything visual comes off vc-solutions.net — `#2159B0` (`--vc-accent`),
`#0f172a` (`--vc-navy`), `#38BDF8` (the far end of the site's signature gradient), and
**Anton**, the site's heading font. Vero is VCS's product, so the video speaks in VCS's
voice and the product shows itself in its own face (Inter) inside cards.

Built to work **muted**, like the long cut. On-screen text carries the whole thing.

---

## The constraints this cut protects

1. **Product surfaces stay light, stages carry the colour.** Every card, pill and mock
   UI in here is Vero's own light palette. Nothing is darkened to "match" a stage.
2. **Every invented number is tagged `sample view` on screen.** Two scenes carry
   figures (the spend beat and the payoff); both are tagged. Nothing here is claimed
   as a real client result.
3. **Two voices, two typefaces.** Anton is VCS's heading font and carries the video's own
   voice — headlines, hero numbers, stat values. Inter is the product's face and carries
   anything imitating Vero's UI: the Vero wordmark, logo pills, the connections list, the
   ranked table, the answer card. Mixing them up makes a product card read as a poster.
4. **Green means an outcome, sky means the brand.** `#34D399` is reserved for "this went
   the right way" — connected, paid, positive, resolved. `#38BDF8` carries every other
   accent. That is the difference between colour that says something and colour that
   decorates.

---

## Scene by scene

| # | key | in | dur | stage | on screen |
| --- | --- | --- | --- | --- | --- |
| 1 | `hook` | 0:00 | 3.5s | white | "you're spending **money.**" / every location · every channel · every month |
| 2 | `butWhere` | 0:03.5 | 3.0s | brand | "but you can't tell / **where it worked.**" |
| 3 | `spendVsProof` | 0:06.5 | 5.5s | white | `$248,000` ad spend last quarter, channel chips orbiting it — then hard cut to a circled **?** for "revenue you can trace back to it" |
| 4 | `theyBought` | 0:12 | 3.5s | brand | "they walked in. / **they bought.**" over four paid receipts |
| 5 | `connect` | 0:15.5 | 4.0s | sky | "so connect the **register.**" + readiness cards |
| 6 | `noMore` | 0:19.5 | 5.0s | brand | four objections struck out in sequence → "**it all ties to the register.**" |
| 7 | `steps` | 0:24.5 | 8.0s | alternating | `01 connected.` `02 reconciled.` `03 ranked.` `04 answered.` — 2s each, each with one card |
| 8 | `posLogos` | 0:32.5 | 3.7s | brand | "it plugs into your **register**" — Toast, Square, Clover, Lightspeed, Shopify POS, NCR Aloha |
| 9 | `channelLogos` | 0:36.2 | 3.7s | brand | "and every channel you **buy**" — Meta, Google Ads, TikTok, Google Analytics, Business Profile, Simpli.fi, Yelp, Snapchat, Nextdoor, Klaviyo |
| 10 | `whereTheyAre` | 0:39.8 | 3.8s | brand | "every platform knows **who** they are. / Vero knows **where.**" — map pins dropping on five locations |
| 11 | `payoff` | 0:43.7 | 4.2s | brand | "marketing that **pays for itself.**" + four stat cards (`sample view`) |
| 12 | `cta` | 0:47.8 | 5.2s | white | Vero lockup · "see it on **your own numbers.**" · 15 minutes · contact · *a VCS product* |

Timings live in `FAST` in `src/fast/theme.ts`. To lengthen a scene, change its `dur`
and push every later `from` by the same amount; `FAST_TOTAL` must equal the sum.

---

## Voiceover (written to the existing timing, no frames move)

The pace is faster than the long cut — roughly 3 words per second — so these are short
on purpose. Record one file per scene.

1. **hook** — "You're spending money. Every location, every channel, every month."
2. **butWhere** — "But you can't tell where it worked."
3. **spendVsProof** — "A quarter of a million dollars out the door. And the revenue you
   can trace back to it? Nobody can tell you. Not your agency. Not your ad platforms."
4. **theyBought** — "They walked in. They bought. And not one platform saw the receipt."
5. **connect** — "So connect the register."
6. **noMore** — "No more averaging every store together. No more reports that stop at the
   click. It all ties back to the register."
7. **steps** — "Connected. Reconciled — one sale, counted once. Ranked, store by store.
   Answered, in plain English."
8. **posLogos** — "It plugs into your point of sale."
9. **channelLogos** — "And every channel you buy."
10. **whereTheyAre** — "Every platform knows who your customers are. Vero shows you where
    they came from."
11. **payoff** — "Marketing that pays for itself."
12. **cta** — "See it on your own numbers. Fifteen minutes, on your locations."

To wire audio, add inside each `Sequence` in `src/fast/Video.tsx`:

```tsx
import { Audio, staticFile } from 'remotion';
<Audio src={staticFile('vo/fast-01.mp3')} />
```

Music sits at the top level of `VeroFast`, under everything, `volume={0.10}`. There is no
music track in the repo — the render is currently silent.

---

## What is real and what is not

**Real:** the Vero mark (cut from the product header), the VCS logo (the real asset from
vc-solutions.net), the palette and heading font (read off the live site's CSS), the line in
scene 10 (lifted from the VCS homepage), and the hub-and-spoke model in scenes 8 and 9 —
that is literally how the Connections page is laid out.

**Illustrative, and tagged on screen:** the `$248,000` spend, the four receipts, the
location names and percentages (including the five pins in scene 10), and the four payoff
stats. Nothing here came from a client.

**Stand-in brand marks:** Toast, Lightspeed, NCR Aloha, Simpli.fi and Klaviyo are drawn as
monogram tiles in each brand's own colour, because their real logos are custom wordmarks
rather than drawable geometry and tracing them badly is worse than not tracing them.
Square, Shopify, Meta, Google Ads, TikTok, Google Analytics, Yelp and Snapchat use their
official paths from `simple-icons`. Clover and Business Profile are drawn (a clover leaf
and a map pin are honest geometry). Drop official files into `public/logos/` and name them
in `src/fast/logoAssets.ts` to replace any of them.
