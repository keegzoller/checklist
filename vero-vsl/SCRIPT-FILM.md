# Vero: the product film

**Composition:** `VeroFilm` · 1920x1080 · 30fps · 2,870 frames (1:36)
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
| 1 | `open` | 0:00 | 1.7s | Vero mark and wordmark |
| | | | | **ACT 1 — what you don't know** |
| 2 | `eitherWay` | 0:01.7 | 3.7s | "You're spending the money either way." → "You should **get to know.**" |
| 3 | `threeUnknowns` | 0:05.3 | 5.8s | the three questions, each with an empty answer slot → "Three questions. **No answers.**" |
| 4 | `gut` | 0:11.2 | 3.8s | "So you go with your gut. **Again.**" → "And it still bothers you every single month." |
| | | | | **ACT 2 — why nobody can tell you** |
| 5 | `graded` | 0:15 | 4.2s | Meta, Google, the agency — "None of them are lying. They just can't afford to tell you it didn't." |
| 6 | `lastExpense` | 0:19.2 | 4.2s | rent ✓ food cost ✓ a bad hire ✓ **marketing ?** |
| | | | | **ACT 3 — introducing Vero** |
| 7 | `intro` | 0:23.3 | 2.3s | "Introducing Vero." |
| 8 | `connectPos` | 0:25.7 | 5.7s | **"It starts at your point of sale."** — six POS logos checking in, feeding the mark |
| 9 | `connectChannels` | 0:31.3 | 5.5s | **"Then every channel you buy."** — ten marketing channels |
| 10 | `attribute` | 0:36.8 | 6.2s | **where they came from** (channel split) and **what they came for** (item mix) |
| | | | | **ACT 4 — what we are not** |
| 11 | `notAnAI` | 0:43 | 5.5s | "This is not an AI that reads your dashboards." — a generic chatbot summary, struck out |
| | | | | **ACT 5 — how it actually works** |
| 12 | `deterministic` | 0:48.5 | 6.7s | **01** same question asked three times, same answer, every figure traceable to rows |
| 13 | `baseline` | 0:55.2 | 6.7s | **02** the floor — your unmarketed locations vs. your marketed ones, the gap shaded |
| 14 | `forecast` | 1:01.8 | 6.7s | **03** move $18K on screen, see the projection and its range |
| | | | | **ACT 6 — what it sounds like** |
| 15 | `sounds` | 1:08.5 | 5.5s | **real investigating screen**, then two real answers |
| 16 | `tellYouNo` | 1:14 | 4.5s | +8.4% withheld, +8.2% reported |
| | | | | **ACT 7 — outcomes and close** |
| 17 | `outcomes` | 1:18.5 | 7.0s | clarity in the decision · better allocation of every dollar · more customers through the door |
| 18 | `limit` | 1:25.5 | 2.8s | what it won't do |
| 19 | `measure` | 1:28.3 | 3.0s | "They measure the campaign. **Vero measures the money.**" |
| 20 | `cta` | 1:31.3 | 4.3s | "Bring us a month you already argued about." · contact · a VCS product |

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

1. "You're spending the money either way. You should get to know."
2. "Is my marketing working? Which channels should I spend on? How much should I spend?
   Three questions, and nobody can answer any of them."
3. "So you go with your gut. Again. You've been doing that for years, and it still bothers
   you every single month."
4. "Facebook tells you how Facebook did. Google tells you how Google did. Your agency writes
   the report on its own work. None of them are lying — they just can't afford to tell you
   it didn't work."
5. "You know what your rent buys. You know your food cost to the point. Marketing is the one
   line where good and bad look identical."
6. "Introducing Vero."
7. "It starts at your point of sale. Not clicks, not impressions — the money through your
   tills."
8. "Then it connects every channel you buy."
9. "So you can see where your customers came from, and what they came for."
10. "This is not an AI that reads your dashboards. Restating numbers you already couldn't
    trust, with more confidence, is not an answer."
11. "Vero reasons deterministically. Same question, same data, same answer — every time.
    And every figure traces back to the register rows it came from."
12. "It builds the floor: what would have happened without any marketing at all, from your
    own locations that aren't being marketed. Everything above that line is yours."
13. "And it forecasts the change before you make it — with the range, not just the number."
14. "Ask it anything. It'll tell you when you're wrong, and when it can't tell yet, it says
    so."
15. "What changes for you: clarity in the decision, better allocation of every dollar, and
    more customers through the door."
16. "It won't tell you which image won, or what happened yesterday. It needs a few weeks and
    more than one location."
17. "They measure the campaign. Vero measures the money."
18. "Bring us a month you already argued about."

Record one file per beat into `public/vo/`, then inside each `Sequence` in
`src/film/Video.tsx`:

```tsx
import { Audio, staticFile } from 'remotion';
<Audio src={staticFile('vo/film-01.mp3')} />
```

No music ships in the repo; the render is silent.

---

## What is real and what is not

**Real:** all three product screenshots — Connections, the workspace home and the
investigating state — plus the Vero mark, the VCS logo and the palette. The two answers in
beat 15 are quoted from the positioning document.

**Designed, in the product's own light palette:** the report cards, the P&L checklist, the
attribution split, the generic-chatbot card, all three mechanism panels in act 5, the lift
table, and the outcome cards. Their figures are illustrative and built to demonstrate the
mechanism.

**Not tagged "sample view" on screen**, unlike the two earlier cuts, because they read as
product UI rather than as claims about a client. If this goes to cold prospects who might
read them as results, add the tag back.

**See `ASSETS.md`** for the ranked list of logos and dashboard captures that would replace
each designed panel, and what each one buys.
