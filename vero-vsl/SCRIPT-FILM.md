# Vero: the product film

**Composition:** `VeroFilm` · 1920x1080 · 30fps · 2,352 frames (1:18)
**Audience:** multi-location and franchise owners who sign off on the marketing spend
**Ask:** fifteen minutes on a month they have already argued about
**Source:** the founder's spine, plus *Vero — positioning and narrative* for the language.

---

## The story it tells

The spine, as the founder tells it:

> I don't know if my marketing is working, which channels to spend on, or how much.
> Introducing Vero. It connects to your point of sale, then to every marketing channel, and
> attributes where customers came from and what they came for. This is **not** an AI that
> reads your data — it reasons deterministically, builds the floor of what happens without
> marketing, and forecasts what a change will do. The result: clearer decisions, better
> allocation, more customers in the door.

Seven acts hang off it.

| Act | Does what |
| --- | --- |
| 1 | the three things you don't know, and that you decide anyway |
| 2 | why nobody in the chain can tell you |
| 3 | introducing Vero, and what it plugs into |
| 4 | **what we are not** |
| 5 | how it actually works — the three mechanisms |
| 6 | what it sounds like, and what it refuses to say |
| 7 | outcomes and the close |

**Act 4 is load-bearing.** Without "this is not an AI that reads your dashboards," every
claim in act 5 sounds like the same AI-summarises-your-reports pitch the buyer has already
been sold twice. Do not cut it to save runtime.

**Act 5 is the moat.** Deterministic reasoning, the counterfactual floor and the forecast
are the three things a competitor cannot copy by bolting a chatbot onto a dashboard. Each
one shows a mechanism rather than asserting a benefit — that is why they are panels and not
bullet points.

## Beats

| # | key | in | dur | on screen |
| --- | --- | --- | --- | --- |
| 1 | `open` | 0:00 | 0.9s | Vero mark and wordmark |
| | | | | **ACT 1 — what you don't know** |
| 2 | `hook` | 0:00.9 | 2.9s | "**$40,000 a month.**" → "The only money you spend that nobody can account **for.**" |
| 3 | `threeUnknowns` | 0:03.8 | 4.7s | the three questions, each with an empty answer slot → "Three questions. **No answers.**" |
| 4 | `instinct` | 0:08.5 | 2.5s | "And in thirty days, **you'll do it again.**" → "Knowing exactly as much as you do right now." |
| | | | | **ACT 2 — why nobody can tell you** |
| 5 | `graded` | 0:11 | 5.0s | Meta, Google, the agency — "None of your channels are lying. They just can't afford to tell you when it isn't working." |
| 6 | `lastExpense` | 0:16 | 3.7s | rent ✓ food cost ✓ a bad hire ✓ **marketing ?** |
| | | | | **ACT 3 — introducing Vero** |
| 7 | `intro` | 0:19.6 | 2.3s | the **Vero signature** — glow bloom, orbital rings, the wordmark uncovering |
| 8 | `connectPos` | 0:22 | 3.8s | "It starts at your point of sale." — six POS logos checking in |
| 9 | `connectChannels` | 0:25.8 | 3.7s | "Then every channel you buy." — ten marketing channels |
| 10 | `attribute` | 0:29.4 | 5.1s | where they came from, and what they came for |
| | | | | **ACT 4 — what we are not** |
| 11 | `notChatbot` | 0:34.5 | 4.7s | "A chatbot." "A widget." "Another dashboard." struck out in turn → "Vero is a measurement **system.**" |
| | | | | **ACT 5 — how it actually works** |
| 12 | `deterministic` | 0:39.2 | 5.7s | **01** "Ask it the same question twice. You get the same answer." |
| 13 | `baseline` | 0:44.9 | 5.6s | **02** the floor — unmarketed vs marketed, the gap shaded |
| 14 | `forecast` | 0:50.5 | 5.6s | **03** move $18K on screen, projection with its range |
| | | | | **ACT 6 — an answer, and a refusal** |
| 15 | `answerTrend` | 0:56.1 | 5.5s | "So you ask. And it **answers.**" — Destin's trend against its floor |
| 16 | `whenItCant` | 1:01.6 | 4.8s | "And when it can't tell yet, **it says so.**" |
| | | | | **ACT 7 — outcomes and close** |
| 17 | `outcomes` | 1:06.4 | 6.3s | three cards, each with an icon and an accent rail that draws as it lands |
| 18 | `tagline` | 1:12.8 | 1.9s | **"Decisions made simple."** |
| 19 | `cta` | 1:14.7 | 4.0s | the Vero signature · vc-solutions.net · info@vc-solutions.net |

### The Vero signature

`src/film/Signature.tsx` carries the brand moment used at the introduction and again at the
close: a glow blooming out of the mark, two orbital rings drawing on and continuing to
turn, a short turn-to-face on entry, and the wordmark uncovering from behind the mark.

The mark is a raster droplet with a definite "up", so **spinning it outright looks broken** —
the rotation on entry is a `rotateY` that reads as turning to face the viewer, and the
continuous motion belongs to the rings, not the mark. The rings are wide and flat on
purpose: near-circular ones read as clip-art atom rather than orbit.

### Pacing

Beat length follows reading load, not a house average. A panel of numbers holds past its
last reveal so it can be read twice; a logo, a tagline or a two-word line gets out of the
way. **Trimming the light beats is where runtime comes from — trimming the dense ones just
makes them illegible.**

Scenes no longer carry hand-tuned exit frames. `useSceneExit()` reads the sequence's own
duration (`useVideoConfig().durationInFrames` is the *sequence* length inside a `Sequence`)
and clears nine frames before the end, which with a seven-frame blur leaves two blank frames
at the cut. That is a beat, not dead air — the previous hand-set exits were leaving seven,
which across nineteen cuts was about three seconds of white.

**Getting below ~1:16 means removing beats, not shortening them.** The dense panels are
already at the floor of what can be read.

Timings live in `FILM` in `src/film/theme.ts`. Change a `dur` and push every later `from`
by the same amount; `FILM_TOTAL` must equal the sum.

---

## Three rules the cut depends on

1. **A statement is at most five words a line and never below ~100px.** Seven words at 86px
   is a paragraph, not a title.
2. **Never centre a product panel.** It bleeds off the frame edge, or it is not doing its
   job. A cropped panel reads as a window onto something bigger; a fully-visible one reads
   as a slide.
3. **Hold past the last word.** Each scene's `exit` sits far enough after the final reveal
   that the line can be read twice. Shortening a `dur` without pulling its `exit` back will
   cut a sentence off mid-read — which is what "too fast" actually means.

Motion is blur-and-lift on one ease-out curve. **No springs.** The wobble is what made the
earlier poster cuts read as a template.

---

## Voiceover

Written to the existing timing — no frames move. Read it flat.

1. "Forty thousand a month. The only money you spend that nobody can account for."
2. "Is my marketing working? Which channels should I spend on? How much should I spend?
   Three questions, and nobody can answer any of them."
3. "And in thirty days, you'll do it again — knowing exactly as much as you do right now."
4. "None of your channels are lying. They just can't afford to tell you when it isn't
   working."
5. "You know what your rent buys. You know your food cost to the point. Marketing is the one
   line where good and bad look identical."
6. "Introducing Vero."
7. "It starts at your point of sale. Not clicks, not impressions — the money through your
   tills."
8. "Then it connects every channel you buy."
9. "So you can see where your customers came from, and what they came for."
10. "Vero isn't a chatbot. It isn't a widget, and it isn't another dashboard. It's a
    measurement system — it starts at your revenue and works backwards."
11. "Ask it the same question twice and you get the same answer. That's what deterministic
    means: the number comes from counting your register rows, not from a model generating
    something that sounds right."
12. "It builds the floor — what would have happened without any marketing at all — from your
    own locations that aren't being marketed. Everything above that line is yours."
13. "And it forecasts the change before you make it, with the range, not just the number."
14. "So you ask, and it answers."
15. "And when it can't tell yet, it says so."
16. "What changes for you: clarity in the decision, better allocation of every dollar, and
    more customers through the door."
17. "Decisions made simple. Vero."

Record one file per beat into `public/vo/`, then inside each `Sequence` in
`src/film/Video.tsx`:

```tsx
import { Audio, staticFile } from 'remotion';
<Audio src={staticFile('vo/film-01.mp3')} />
```

No music ships in the repo; the render is silent.

---

## What is real and what is not

**Real:** the Vero mark, the palette, and the sixteen third-party brand marks.

**Everything that looks like the Vero product is a designed panel.** The film no longer
contains a single real screenshot — the three beats that carried them were each replaced by
something better over the last two passes, but the net effect is that a prospect never sees
the actual application. `ASSETS.md` opens on this; it is the most valuable thing to fix.

Designed, in the product's own light palette: the report cards, the P&L checklist, the
attribution split, the generic-chatbot card, all three mechanism panels, the location answer
with its trend line, the lift table, and the outcome cards. Their figures are illustrative
and built to demonstrate the mechanism.

**Not tagged "sample view" on screen**, unlike the two earlier cuts, because they read as
product UI rather than as claims about a client. If this goes to cold prospects who might
read them as results, add the tag back.
