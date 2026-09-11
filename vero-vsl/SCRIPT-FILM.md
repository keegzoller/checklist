# Vero: the product film

**Composition:** `VeroFilm` · 1920x1080 · 30fps · 2,165 frames (1:12)
**Audience:** multi-location and franchise owners who sign off on the marketing spend
**Ask:** fifteen minutes on a month they have already argued about
**Source:** *Vero — positioning and narrative*. Almost every line on screen is lifted from
that document or compressed from it.

---

## The story it tells

Someone who watches this end to end should be able to answer three questions. The film is
structured so that each act answers one of them.

| The question | The act that answers it |
| --- | --- |
| Why should I care? | 1 — you spend it either way, and every month you still guess |
| Why can nobody already tell me? | 2 — everyone reporting to you is graded by themselves, and marketing is the one expense you cannot check |
| What is Vero, and what do I get? | 3 and 4 — it reads the register and compares against your own quiet locations, and here are four things that land on your desk |

**Act 4 is the one that matters most and the one the earlier version of this cut was
missing.** Explaining the method without ever saying what an owner actually receives is
the difference between clever and worth buying. Do not cut it down.

---

## Beats

| # | key | in | dur | on screen |
| --- | --- | --- | --- | --- |
| 1 | `open` | 0:00 | 1.8s | Vero mark and wordmark |
| | | | | **ACT 1 — the feeling** |
| 2 | `eitherWay` | 0:01.8 | 3.8s | "You're spending the money either way." → "You should **get to know.**" |
| 3 | `everyMonth` | 0:05.7 | 4.0s | you get a report, the charts go up, everyone sounds pleased → "And you still don't know whether to spend more or less." |
| 4 | `gut` | 0:09.7 | 4.2s | "So you go with your gut. **Again.**" → "You've been doing that for years." → "And it still bothers you every single month." |
| | | | | **ACT 2 — why nobody can tell you** |
| 5 | `graded` | 0:13.8 | 4.5s | three reports — Meta, Google, the agency — "None of them are lying. They just can't afford to tell you it didn't." |
| 6 | `sameSale` | 0:18.3 | 3.3s | one $84.20 order, claimed in full by two platforms |
| 7 | `lastExpense` | 0:21.7 | 4.3s | rent ✓ food cost ✓ a bad hire ✓ **marketing ?** |
| | | | | **ACT 3 — what Vero does** |
| 8 | `register` | 0:26 | 4.0s | **real Connections screen** · "Vero looks at your register." |
| 9 | `quietOnes` | 0:30 | 4.7s | marketed locations against your own unmarketed ones · "the difference is what your marketing did" |
| | | | | **ACT 4 — what you actually get** |
| 10 | `whatYouGet` | 0:34.7 | 1.8s | "Four things you've never had." |
| 11 | `getLocations` | 0:36.5 | 3.7s | **01** — 4 of 12 locations, worth about $7,500 a week, broken out by store |
| 12 | `getNextDollar` | 0:40.2 | 3.7s | **02** — geofencing $6.85 vs Meta $2.90 per dollar · "move the money the other way" |
| 13 | `getLeak` | 0:43.8 | 3.7s | **03** — Google Search at Schenectady stopped delivering May 4, −70% clicks, spend unchanged, $3,200 burned |
| 14 | `getAsk` | 0:47.5 | 3.8s | **04** — **real workspace screen** · "Someone to ask, any time you wonder." |
| 15 | `sounds` | 0:51.3 | 5.8s | **real investigating screen**, then two real answers — including one that tells the owner they're wrong about Meta |
| 16 | `tellYouNo` | 0:57.2 | 4.3s | "the first thing in your marketing that will tell you **no**" · +8.4% withheld, +8.2% reported |
| | | | | **ACT 5 — the close** |
| 17 | `limit` | 1:01.5 | 3.2s | what it won't do: which image won, yesterday, without a few weeks and more than one location |
| 18 | `measure` | 1:04.7 | 3.2s | "They measure the campaign. **Vero measures the money.**" |
| 19 | `cta` | 1:07.8 | 4.3s | "Bring us a month you already argued about." · contact · a VCS product |

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

Written to the existing timing — no frames move. Read it flat. The copy is doing the
selling and pushing it makes the whole thing sound like an ad.

1. "You're spending the money either way. You should get to know."
2. "You get a report. The charts go up. Everyone sounds pleased. And you still don't know
   whether to spend more next month, or less."
3. "So you go with your gut. Again. You've been doing that for years, and it's worked out
   okay — and it still bothers you every single month."
4. "Facebook tells you how Facebook did. Google tells you how Google did. Your agency
   writes the report on its own work. None of them are lying. They just can't afford to
   tell you it didn't work."
5. "And two of them counted the same sale."
6. "You know what your rent buys. You know your food cost to the point. You can tell a bad
   hire inside a month. Marketing is the one line where good and bad look identical."
7. "Vero looks at your register. Not clicks, not impressions — the actual money through
   your tills."
8. "Then it compares the locations you're advertising at against your own locations you
   aren't. Same brand, same menu, same weather. The quiet ones show what would have
   happened anyway. The difference is what your marketing did."
9. "Here's what you get. Where it's working, and what that's worth — four of your twelve
   locations, about seventy-five hundred a week."
10. "Where the next dollar should go. Geofencing is returning more than twice what Meta is,
    on a third of the budget."
11. "Money that's leaking, the week it starts. Google Search at Schenectady stopped
    delivering on May fourth. Seventy percent fewer clicks, same budget going out."
12. "And someone to ask, any time you wonder."
13. "It'll even tell you when you're wrong. And when it can't tell yet, it says so."
14. "It won't tell you which image won, or what happened yesterday. It needs a few weeks and
    more than one location."
15. "They measure the campaign. Vero measures the money."
16. "Bring us a month you already argued about."

Record one file per beat into `public/vo/`, then inside each `Sequence` in
`src/film/Video.tsx`:

```tsx
import { Audio, staticFile } from 'remotion';
<Audio src={staticFile('vo/film-01.mp3')} />
```

No music ships in the repo; the render is silent.

---

## What is real and what is not

**Real:** all three product screenshots — Connections (beat 8), the workspace home
(beat 14) and the investigating state (beat 15) — plus the Vero mark, the VCS logo, and
the palette. The two answers in beat 15 are quoted from the positioning document, which
states they are answers Vero gives today from real data.

**Designed, in the product's own light palette:** the report cards, the double-counted
order, the P&L checklist, the method panel, the three value panels in act 4, and the lift
table in beat 16. Figures in them are illustrative and constructed to demonstrate the
mechanism.

**These are not tagged "sample view" on screen**, unlike the two earlier cuts, because they
read as product UI rather than as claims about a client. If this goes to cold prospects who
might read them as results, add the tag back.

### The captures that would upgrade this most

Everything designed above exists because the 2026-09-07 recording stops before Vero renders
an answer. In rough order of value:

1. **A rendered answer** — a real reply in the workspace, ideally one where Vero pushes
   back. Replaces the exchanges in beat 15 with real footage.
2. **A location lift table** showing at least one withheld row. Replaces `RefusePanel`
   (beat 16), which is the argument's payoff shot.
3. **A channel comparison** — return per dollar by channel. Replaces `NextDollar` (beat 12).
4. **A location revenue view** with per-store dollar figures. Replaces `LocationValue`
   (beat 11).
5. **An alert or flag** on a channel that stopped delivering. Replaces `LeakPanel` (beat 13).

Capture app-window only, 2400px or wider. Drop the PNGs in `public/screens/` and swap the
component for a `Panel` wrapping the image — the layouts already accommodate a panel of
that size.
