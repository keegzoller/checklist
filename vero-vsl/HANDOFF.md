# Vero VSL: handoff

Everything needed to pick this up in Claude Code. Written 2026-09-11.

---

## 1. What this is

A 1:20 video sales letter for **Vero**, built in **Remotion** (React that renders to MP4)
rather than a video editor, so copy, timing, numbers and screenshots are all editable in
code and re-rendered on demand.

- **Audience:** cold prospects, multi-location operators (3 to 5 units)
- **Ask:** 15-minute walkthrough on their own accounts
- **Format:** 1920x1080, 30fps, 2,400 frames
- **Built to work muted.** On-screen text carries the story, so it holds up in a LinkedIn
  feed or an email embed before any voiceover exists.

Current render: `out/vero-vsl-1080p.mp4` (24.8 MB, 80.04s).

---

## 2. Sources used

**Websites read**

| URL | What came from it |
| --- | --- |
| `https://www.vc-solutions.net` | Positioning and voice. The line "Every Platform Knows Who People Are. We Know Where They Are." became scene 8. Verticals, channel list, the Tampa/multi-location framing. |
| `https://dashboard.vc-solutions.net` | Login wall only. Confirmed the product name "VCS Intelligence" and that the dashboard is not publicly fetchable, which is why screens had to come from a recording. |

Neither site provided product screenshots. The public site never mentions Vero by name.

**Screen recording (the important source)**

`Screen Recording 20260907 at 8.43.30PM.mov`, 13.25s, 1632x846, 60fps. Three frames were
cut from it and are now in `public/screens/`:

| File | Source timestamp | Screen |
| --- | --- | --- |
| `screen-connections.png` | t=2.0s | Connections page: Square, Meta, Google, Google Analytics feeding the Vero measurement layer, out to Location performance / Channel measurement / Readiness controls |
| `screen-ask.png` | t=5.5s | Workspace home: $4.9M revenue in view, 16 locations, 12/16 marketed, 26-week window, four starter investigations |
| `screen-investigating.png` | t=11.0s | "Reading every location in the register" with scope confirmed / reading source data / preparing the answer |

Edits applied to those frames, all reversible by re-cutting from the .mov:

- **Connections:** cropped to y 0-648 to remove a browser URL tooltip and the line
  "1 of 5 sources authorized · 0 measurement ready". The workspace name in the header is
  **Gaussian-blurred** (box 252,8 - 344,46) because it named a real client and this goes to
  cold prospects.
- **Ask / Investigating:** cropped x 88-1478 to drop a partially visible left sidebar.

The recording ends before Vero renders an answer, which is the one gap. See §6.

**Not used:** no external stock, no third-party assets, no CDN dependencies. Fonts are
self-hosted from npm (`@fontsource-variable/inter`, `@fontsource-variable/manrope`) because
Google Fonts was network-blocked during the build, which turned out to be the better
outcome: the render is reproducible offline.

---

## 3. Design decisions worth knowing

**Dark stage, light product.** Vero's real UI is light. The video is a dark navy stage with
the product presented in a light browser window sitting on it. Do not "fix" the mismatch by
darkening the screenshots or lightening the stage. The contrast is what makes the product
shots pop.

**Two palettes, both in `src/theme.ts`.**
- `C` = the dark stage (bg `#060E1A`, accents `#2159B0` / `#5FA8FF`)
- `L` = Vero's own UI, sampled from the product (page `#F4F5F9`, primary `#2126B7`, green
  `#1F9D57`). Any new mock UI must use `L` or it will read as a different product.

**Scenes cross-fade, they do not cut.** Each `Sequence` runs 14 frames past its nominal
length (`OVERLAP` in `src/Video.tsx`) so the outgoing scene fades out while the incoming one
fades in. Without this there is a blank frame at every boundary. The final scene passes
`fadeOut={false}` so the CTA holds to the last frame.

**No invented proof points.** Every figure in the designed answer view is illustrative and
carries a "sample view" tag on screen. The real numbers in the two workspace screenshots
($4.9M, 16 locations) are actual. This was deliberate.

**"Vero," not "VeroIQ."** The product UI in the recording says Vero throughout, so the video
says Vero. If the brand is now VeroIQ, it is one string in `src/Video.tsx` (the `Watermark`
component) plus the scene 5 kicker.

---

## 4. Project structure

```
vero-vsl/
├── src/
│   ├── index.ts           registerRoot
│   ├── Root.tsx           <Composition id="VeroVSL" 1920x1080 2400f 30fps>
│   ├── Video.tsx          scene ORDER, OVERLAP cross-fade, watermark, progress bar
│   ├── theme.ts           C (dark) + L (Vero light) palettes, fonts, SCENES timing map
│   ├── screens.ts         screenshot slot config  <- the file you edit most
│   ├── scenes/Scenes.tsx  all nine scenes
│   └── components/
│       ├── Base.tsx       Backdrop, Scene wrapper, Kicker/Headline/Sub, motion helpers
│       ├── Screen.tsx     ScreenFrame (light browser chrome), RealScreenshot
│       └── Mocks.tsx      MockAnswer, the designed stand-in answer view
├── public/screens/        the three real screenshots
├── SCRIPT.md              scene-by-scene script, VO lines, recording notes
├── README.md              run and edit instructions
└── HANDOFF.md             this file
```

**Scene map** (`SCENES` in `src/theme.ts`, frames at 30fps):

| # | key | from | dur | content |
| --- | --- | --- | --- | --- |
| 1 | `hook` | 0 | 180 | "You researched every location before you opened it." |
| 2 | `oneCampaign` | 180 | 210 | one campaign fanning to five stores |
| 3 | `blindSpot` | 390 | 270 | -18% / ? / +31%, "nobody can tell you why" |
| 4 | `clicks` | 660 | 210 | vanity metrics struck through |
| 5 | `connect` | 870 | 300 | **real** Connections screen |
| 6 | `ask` | 1170 | 300 | **real** workspace home |
| 7 | `answer` | 1470 | 390 | **real** investigating, cross-fades to designed answer at frame 118 |
| 8 | `differentiator` | 1860 | 180 | "Vero shows you where they came from" |
| 9 | `cta` | 2040 | 360 | connect your accounts, 15 minutes, contact block |

To lengthen a scene, change its `dur` and push every later `from` by the same amount.
`TOTAL` must equal the sum.

---

## 5. Running it

```bash
npm install
npm run studio     # live editor, scrub and hot-reload
npm run render     # out/vero-vsl.mp4
```

Node 18+. If Remotion cannot download a browser:

```bash
REMOTION_BROWSER="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npm run render
```

Note: this was rendered in a Linux container using Chromium's **headless_shell** binary. A
regular Chrome binary fails with "Old Headless mode has been removed." On a Mac, point at
Chrome and it works. Also: `--concurrency` cannot exceed core count.

---

## 6. Open items

**1. The answer screen (the only real gap).**
Scene 7 dissolves from real footage into a designed answer view. The recording stops before
Vero renders one. Capture "Which locations are performing best?" through to a rendered
answer, then:

```ts
// src/screens.ts
answer: 'screen-04-answer.png',
```

Drop the PNG in `public/screens/` (2400px+ wide, app window only). `MockAnswer` gets bypassed
automatically. Nothing else changes. Until then the payoff shot of the video is a mockup.

**2. Voiceover.**
`SCRIPT.md` has nine VO lines written to fit the existing timing without moving a frame.
Record one file per scene into `public/vo/`, then add inside each `Sequence` in
`src/Video.tsx`:

```tsx
import { Audio, staticFile } from 'remotion';
<Audio src={staticFile('vo/scene-01.mp3')} />
```

Music goes at the top level of `VeroVSL` under everything else, `volume={0.12}`.

**3. Vertical / square cut.**
Not built. The scenes are laid out on a wide grid (500px text column plus a 1200px screen),
so a feed cut needs its own layouts, not a resized composition. Roughly: stack text above
screen, drop the two-column `ProductScene`, re-time nothing.

**4. Decisions made without asking, reversible on request.**
Blurred client workspace name; cropped the "1 of 5 sources authorized" line; removed a
1080x1080 composition that would have rendered broken layouts.

---

## 7. The fast cut (added 2026-09-11)

A second composition, `VeroFast`, lives beside the original. 0:49, 1,470 frames, same
1920x1080. It is the same product story told in the grammar of the reference VSL that
prompted it: kinetic typography, hard colour cuts between white and Vero indigo, big
counting numbers, floating cards, and two logo constellations.

**It does not replace `VeroVSL`.** Both render from this project. The long cut is the
considered one with real product footage; the fast cut is the one built to stop a scroll.

**What carried over from §3 deliberately:**

- Product surfaces are still light. The stage flips colour, the cards never do.
- Every invented number still wears a `sample view` tag (the spend beat and the payoff).
- The palette is Vero's own. `V.blue` = `#0006C1` is the exact button fill sampled from
  the Connections page. The full-bleed stage gradient is the same hue (238deg) with the
  luminance lifted, because `#0006C1` across a whole 1080p frame eats white type alive.
  **Keep the hue locked if you retune it** — that is what makes the flips read as one brand.

**What is new and worth knowing:**

- **Hard cuts, not cross-fades.** The opposite of §3's rule, on purpose: fading white into
  indigo gives you four frames of grey mud. Every fast scene paints its own full-bleed
  background from frame 0, so there is no gap to fade through. Do not add `OVERLAP` here.
- **The Vero mark is now a file.** `public/logos/vero-mark.png`, keyed out of the product
  header in the screen recording with a flood-fill so the white eyes survive. The source is
  174px square, so nothing draws it above ~150px. A real export removes that ceiling — it
  is one line in `src/fast/logoAssets.ts`.
- **Brand logos are drawn in code**, not downloaded. Official paths come from
  `simple-icons` via `tools/gen-brand-paths.mjs`, which writes a small generated module so
  the bundle does not carry 3,000 icons. Brands whose logo is a custom wordmark get a
  monogram tile in their own colour rather than a bad trace. See README "Logos".
- **`spring()` is not a hook.** `Constellation` computes one draw-in spring per spoke
  inside a `.map()`; that is `spring()` called directly, not `useEase`. If you add
  per-item animation elsewhere in a loop, do the same.
- **Module-level JSX has a TDZ trap.** `STEPS` in `src/fast/Scenes.tsx` is a module-level
  array containing JSX. Anything it references (`Tick`, `VeroMark`) must be declared
  *above* it or the bundle throws "Cannot access 'X' before initialization" at runtime,
  not at compile time.

**Still open on the fast cut:** no audio (script in `SCRIPT-FAST.md`, nothing recorded),
and no vertical cut — same reason as §6.3, the scenes are laid out on a wide grid.

---

## 8. Suggested first prompt in Claude Code

> This is a Remotion project that renders two product videos for Vero: `VeroVSL` (1:20,
> dark stage, real screenshots) and `VeroFast` (0:49, kinetic typography, logo
> constellations). Read HANDOFF.md, then SCRIPT.md or SCRIPT-FAST.md depending on which cut
> I mean. I want to [X]. Keep product surfaces light against a contrasting stage, keep every
> illustrative number tagged "sample view," and do not add cross-fades to the fast cut --
> the hard cuts are the style.
