# Vero VSL (Remotion)

Product videos for Vero, built in Remotion so every word, number and screen can be changed
and re-rendered without touching a video editor.

Two cuts, same project:

- **`VeroVSL`** — 1:20, the considered version. Dark stage, real product screenshots,
  scene cross-fades. For a sales follow-up or an embed where someone is already leaning in.
- **`VeroFast`** — 0:53, the feed version. Kinetic typography, hard colour cuts, the POS
  and marketing-channel logo constellations. Built to stop a scroll, and themed to
  vc-solutions.net rather than to Vero's product UI alone.

## Run it

```bash
npm install
npm run studio       # live editor at localhost:3000, scrub and edit with hot reload
npm run render       # the 1:20 cut  -> out/vero-vsl.mp4
npm run render:fast  # the 0:49 cut  -> out/vero-fast.mp4
```

Node 18+ required. If Remotion cannot download a browser on your machine, point it at one
you already have:

```bash
REMOTION_BROWSER="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npm run render
```

On Linux this must be Chromium's **headless_shell**, not a regular Chrome binary — Chrome
fails with "Old Headless mode has been removed", which does not obviously mean "wrong
binary". Also: `--concurrency` cannot exceed your core count.

## Compositions

| id | size | length | use |
| --- | --- | --- | --- |
| `VeroVSL` | 1920x1080 | 1:20 | email embed, site, YouTube, sales follow-up |
| `VeroFast` | 1920x1080 | 0:53 | paid social, LinkedIn feed, top of a cold email |

A square or vertical feed cut needs its own layouts rather than a resized frame (the scenes
are built on a wide grid). That is a separate pass, not a flag on this one.

## Screenshot slots

Four product moments, three of them real footage cut from the 2026-09-07 screen recording.
`src/screens.ts` maps each slot to a file in `public/screens/`:

| slot | file | what it is |
| --- | --- | --- |
| `connections` | `screen-connections.png` | Connections page, real |
| `ask` | `screen-ask.png` | workspace home, real |
| `investigating` | `screen-investigating.png` | "reading every location in the register", real |
| `answer` | `null` | designed sample, waiting on a real capture |

To swap in a real answer screen:

```ts
answer: 'screen-04-answer.png',
```

Set any slot to `null` to fall back (only `answer` has a mock behind it; the others render
nothing). Capture at 2400px or wider, app window only.

## Where to edit what

### The 1:20 cut

| File | What lives there |
| --- | --- |
| `SCRIPT.md` | the script, timings, VO lines and recording notes |
| `src/theme.ts` | dark stage palette (`C`), Vero UI palette (`L`), fonts, scene timings |
| `src/scenes/Scenes.tsx` | all nine scenes, headline copy, chips, stat cards |
| `src/components/Mocks.tsx` | the sample answer view: rows, numbers, Vero light palette |
| `src/components/Base.tsx` | background, type styles, motion helpers |
| `src/screens.ts` | screenshot slots |

### The 0:49 cut

| File | What lives there |
| --- | --- |
| `SCRIPT-FAST.md` | the script, scene table and VO lines |
| `src/fast/theme.ts` | the `V` palette and the `FAST` scene timing map |
| `src/fast/Scenes.tsx` | all eleven scenes, every line of on-screen copy |
| `src/fast/Kinetic.tsx` | the motion vocabulary: word-rise, squiggle, counter, sparkles |
| `src/fast/Logos.tsx` | the Vero mark, brand glyphs, logo pills, the constellation |
| `src/fast/logoAssets.ts` | drop-in slots for official logo files |

Timing is frame-based at 30fps, so 30 frames is one second. To give a scene more room,
change its `dur` (in `src/theme.ts` for the long cut, `src/fast/theme.ts` for the fast one)
and push every later scene's `from` by the same amount. The `TOTAL` / `FAST_TOTAL` constant
at the bottom of each file is the sum.

## Adding voiceover

Record one file per scene, drop them in `public/vo/`, then in `src/Video.tsx` add an
`<Audio>` inside each `<Sequence>`:

```tsx
import { Audio, staticFile } from 'remotion';
// inside a Sequence:
<Audio src={staticFile('vo/scene-01.mp3')} />
```

Music goes at the top level of `VeroVSL`, under everything else, with `volume={0.12}` so it
sits behind the read.

## Brand

The fast cut is themed to **vc-solutions.net**, not to the reference video it borrows its
motion from. Every value in `src/fast/theme.ts` is the site's own, read off the live CSS:

| Token | Value | Source |
| --- | --- | --- |
| `V.brand` | `#2159B0` | `--vc-accent` |
| `V.brandBright` | `#007BFF` | `--vc-blue` |
| `V.sky` | `#38BDF8` | far end of `linear-gradient(135deg,#2159B0,#38BDF8)` |
| `V.navy` | `#0F172A` | `--vc-navy` |
| `V.ink` | `#1E212D` | `--vc-text-dark` |
| `V.inkSoft` | `#475569` | `--text-slate` |
| `V.page` | `#F8FAFC` | `--bg-off-white` |

`BRAND_GRADIENT` is the site's signature gradient and is what every squiggle underline
draws in. `STAGE_DARK` and `STAGE_BRIGHT` are the two full-bleed stages.

**Two typefaces, two voices.** `FONT_HEAD` is **Anton** — the site's
`--heading-font-font-family` — and carries the video's own voice: headlines, hero numbers,
stat values. `FONT_BODY` is **Inter** and carries anything imitating Vero's product UI: the
Vero wordmark, logo pills, the connections list, the ranked table, the answer card. Keep
that split. A product card set in Anton reads as a poster, not as software.

**Colour has meaning.** `V.green` (`#34D399`) is reserved for outcomes — connected, paid,
positive, resolved. `V.sky` carries every other accent. Do not use green decoratively.

Both fonts are self-hosted from npm (`@fontsource/anton`, `@fontsource-variable/inter`), so
the render never reaches for Google Fonts.

## Logos

The fast cut shows six point-of-sale brands and ten marketing channels. They are all drawn
in code, so the render needs no network and ships no downloaded assets.

- **Official paths**, from `simple-icons` (CC0): Square, Shopify, Meta, Google Ads, TikTok,
  Google Analytics, Yelp, Snapchat.
- **Drawn**, because the mark genuinely is simple geometry: Clover, Google Business Profile.
- **Monogram tiles in the brand's own colour**, as honest stand-ins: Toast, Lightspeed,
  NCR Aloha, Simpli.fi, Klaviyo. Their real logos are custom wordmarks, and a bad trace of
  someone's trademark is worse than an obvious placeholder.

To use a real file for any of them, drop it in `public/logos/` and name it in
`src/fast/logoAssets.ts`. Anything listed there wins over the built-in glyph. PNG with
transparency (512px+) or SVG.

`npm run icons` regenerates `src/fast/brandPaths.generated.ts` after you change the brand
list in `tools/gen-brand-paths.mjs`.

### The VCS logo

`public/logos/vcs-logo.png` is the real asset from vc-solutions.net — a navy script
wordmark with a blue swoosh and a **map pin for the period**. That pin is the whole VCS
idea ("every platform knows who people are, we know where they are"), so it is redrawn as
an animated component (`MapPin` in `src/fast/Logos.tsx`) and gets its own scene rather than
being decoration. The logo is dark artwork and only works on a light surface.

### The Vero mark

`public/logos/vero-mark.png` is the real mark, keyed out of the product header in the
screen recording. The source is only 174px square, so the video never draws it above about
150px. **A proper export is the single highest-value asset to hand this project** — drop it
in `public/logos/` and point `vero` at it in `logoAssets.ts`, and the size cap comes off.

## Note on the numbers

Every invented figure on screen is illustrative and carries a "sample view" tag. The only
real numbers in either cut are the ones inside the two workspace screenshots in the 1:20
version. If a real client outcome replaces one, it should be one that survives the question
that follows it on a sales call.
