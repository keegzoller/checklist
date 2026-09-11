# Vero: the product film

**Composition:** `VeroFilm` · 1920x1080 · 30fps · 1,330 frames (0:44)
**Audience:** multi-location and franchise operators who already suspect their reporting
**Ask:** fifteen minutes on a month they have already argued about
**Source:** *Vero — what it is and why it exists*. Nearly every line on screen is either
lifted from that document or compressed from it.

---

## Why this cut exists

The first two cuts sold an attribution product: connect your data, see what worked. That
is the category Vero is explicitly **not** in, and it is what made those cuts feel
generic — every tool in the market says that, and every one of them is lying by omission.

This one makes Vero's actual argument:

> Every party in marketing is paid to say it worked. You are the only person in the room
> with money at risk, and the only one who cannot check. Vero is built to say when it
> didn't — and when nobody can tell yet.

That argument is only credible if the video is willing to state the limits, so it does:
two beats near the end are spent on what Vero cannot do.

---

## Craft reference

Built in the grammar of a modern SaaS launch film rather than kinetic typography:

- **Near-white stage**, one soft diagonal wash of the brand blue in a corner. No colour flips.
- **Blur reveals.** Words fade in from `blur(9px)` and lift 16px, 2.5 frames apart, on a
  single ease-out curve. No springs, no overshoot, no bounce. The wobble is what made the
  earlier cuts read as a template.
- **Grey and black in the same sentence.** The whole line is there; only the part being
  said is black. That one device carries most of the emphasis in this cut.
- **Beats blur themselves out** before their last frame, so each hard cut is covered.
- **Product UI at size.** Panels are 1,500–1,800px wide, bleed off the frame edge, and
  drift in slowly. A cropped panel reads as a window onto something bigger; a centred,
  fully-visible screenshot reads as a slide.

Two rules that are easy to undo by accident, both in `src/film/Scenes.tsx`:

1. **A statement is at most five words a line, and never below ~100px.** Seven words at
   86px is a paragraph, not a title, and the first pass of this cut was full of them.
2. **Never centre a product panel.** It bleeds, or it isn't doing its job.

---

## Beats

| # | key | in | dur | on screen |
| --- | --- | --- | --- | --- |
| 1 | `open` | 0:00 | 1.7s | Vero mark and wordmark |
| 2 | `onlyOne` | 0:01.7 | 3.3s | "You're the only one with money at risk." → "And the only one who **can't check.**" |
| 3 | `theRoom` | 0:05 | 3.7s | three reports — Meta +34%, Google Ads +41%, "Great month." from the agency — then "All three are paid to say that." |
| 4 | `sameSale` | 0:08.7 | 2.7s | one $84.20 order, claimed in full by two platforms |
| 5 | `intro` | 0:11.3 | 2.2s | "The only honest number in the room." |
| 6 | `register` | 0:13.5 | 3.2s | **real Connections screen** · "It reads the register." |
| 7 | `twoQuestions` | 0:16.7 | 3.5s | attribution (dimmed) vs incrementality (live) |
| 8 | `method` | 0:20.2 | 4.0s | marketed locations against comparable unmarketed ones · "the gap is the answer" |
| 9 | `refuse` | 0:24.2 | 4.2s | **the payoff.** +8.4% withheld, +8.2% reported, noise floor ±7.9% |
| 10 | `proof` | 0:28.3 | 3.2s | 4.6% · 0 · 4 of 4 · 0 of 360 — "it fails by going quiet" |
| 11 | `partner` | 0:31.5 | 3.5s | **real workspace screen** · "Not a dashboard." · Vero arguing back about Destin |
| 12 | `limit` | 0:35 | 2.8s | what it cannot do: which creative won, yesterday, without weeks and more than one location |
| 13 | `measure` | 0:37.8 | 2.7s | "They measure the campaign. **We measure the money.**" |
| 14 | `cta` | 0:40.5 | 3.8s | "Bring us a month you already argued about." · contact · a VCS product |

Timings live in `FILM` in `src/film/theme.ts`. Change a `dur` and push every later `from`
by the same amount; `FILM_TOTAL` must equal the sum. Each scene's internal `exit` frames
are relative to that scene and want to sit about ten frames before its end.

---

## Voiceover

Written to the existing timing — no frames move. Read it flat and unhurried; the copy is
already doing the selling and pushing it makes the whole thing sound like an ad.

1. "You're the only one in that meeting with money at risk. And the only one who can't check."
2. "Meta reports Meta's contribution. Google reports Google's. The agency's report is written
   by the party being graded. All three are paid to say it worked."
3. "And two of them counted the same sale."
4. "Vero is the only honest number in the room."
5. "It takes what you spent from the platforms, and what you earned from your own register.
   Not a modelled conversion. The till."
6. "Everyone else answers the first question — which ad gets the credit. Vero answers the
   one that matters: would that sale have happened anyway?"
7. "It measures your marketed locations against comparable locations we don't advertise to.
   Same brand, same menu, same weather, same economy. The gap is what your marketing moved."
8. "Any tool can produce a number. Vero is built to refuse. Eight point four is withheld.
   Eight point two is reported — because significance depends on how noisy a location is,
   not on how big the number looks."
9. "It claims an effect where there is none four point six percent of the time. It has never
   once got the sign wrong. It fails by going quiet."
10. "It isn't a dashboard. It's something you ask — and it will tell you when you're wrong."
11. "It can't tell you which creative won, or what happened yesterday. It needs weeks, and
    more than one location. Saying that first is what makes the rest of it worth anything."
12. "They measure the campaign. We measure the money."
13. "Bring us a month you already argued about."

Record one file per beat into `public/vo/`, then add inside each `Sequence` in
`src/film/Video.tsx`:

```tsx
import { Audio, staticFile } from 'remotion';
<Audio src={staticFile('vo/film-01.mp3')} />
```

There is no music in the repo; the render is silent.

---

## What is real and what is not

**Real:** two product screenshots (Connections, the workspace home), the Vero mark, the VCS
logo, the palette, and every claim in beats 9 and 10 — the 4.6% false-positive rate, the
zero sign errors, 4 of 4 traps, 0 of 360 on pure noise all come from the source document.

**Illustrative:** the location names and figures in the report cards, the $84.20 order, the
method panel's revenue bars, the lift table, and Destin's +9.1%. These are constructed to
demonstrate the mechanism. Unlike the earlier cuts they are **not** tagged "sample view" on
screen, because they read as product UI rather than as claims about a client — if you plan
to send this to cold prospects who may read them as results, add the tag back.

**The one gap:** there is no real capture of a rendered Vero answer, so `RefusePanel` and
`AnswerPanel` in `src/film/Panels.tsx` are designed from the product's own light palette.
Capture those two states and they can be swapped for real screenshots.
