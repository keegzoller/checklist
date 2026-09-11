# Vero VSL (Remotion)

Product videos for Vero, built in Remotion so every word, number and screen can be changed
and re-rendered without touching a video editor.

Two cuts, same project:

- **`VeroVSL`** — 1:20, the considered version. Dark stage, real product screenshots,
  scene cross-fades. For a sales follow-up or an embed where someone is already leaning in.
- **`VeroFast`** — 0:49, the feed version. Kinetic typography, hard colour cuts, the POS
  and marketing-channel logo constellations. Built to stop a scroll.

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
| `VeroFast` | 1920x1080 | 0:49 | paid social, LinkedIn feed, top of a cold email |

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
