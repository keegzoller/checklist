/**
 * VERO -- the product film
 * ------------------------
 * A third composition. The first two were poster-grade: big colour flips,
 * springy type, one idea per scene. This one is built the way a serious SaaS
 * launch film is built -- near-white stage, restrained motion, real product UI
 * at size, and an argument rather than a list of features.
 *
 * The argument comes from "Vero -- what it is and why it exists": every party
 * in marketing is paid to say it worked, the owner is the only one who can't
 * check, and Vero is the tool built to say when it can't tell. That is a
 * sharper story than "connect your data", and it is the reason this cut exists.
 *
 * COLOUR still comes from vc-solutions.net. It is just used the way a product
 * film uses colour: one accent, held back, with the product's own UI providing
 * everything else.
 */

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const F = {
  /** The stage. Not pure white -- a hair of warmth keeps panels from floating. */
  page: '#FFFFFF',
  pageSoft: '#FBFCFD',

  /** Type. `ink` is the word being said, `ghost` is the rest of the sentence. */
  ink: '#0F1115',
  ghost: '#9AA3AE',
  muted: '#6B7280',
  faint: '#AEB6C0',

  /** vc-solutions.net: --vc-accent and the far end of its signature gradient. */
  brand: '#2159B0',
  sky: '#38BDF8',
  brandWash: 'rgba(33,89,176,0.06)',

  /** Chips, hairlines, panel edges. */
  chip: '#EFF3F9',
  chipInk: '#1E212D',
  line: '#E7EBF0',
  lineSoft: '#F1F4F8',

  /** Product semantics, matching Vero's own light UI. */
  green: '#1F9D57',
  greenWash: '#E9F7EF',
  red: '#D93A3A',
  redWash: '#FDECEC',
  amber: '#B45309',
  amberWash: '#FEF3E2',
  panel: '#FFFFFF',
  panelAlt: '#F7F8FA',
} as const;

/**
 * Manrope, not Anton.
 *
 * Anton is vc-solutions.net's heading font and it carried the poster cut well,
 * but a condensed display face is exactly what made that cut read as a
 * template. A product film needs a grotesque that can sit next to real UI
 * without shouting over it -- and Vero's own interface is already set in one.
 * The brand stays VCS's through colour, the logo and the language.
 *
 * To go back to Anton it is this one constant plus `import '@fontsource/anton'`.
 */
export const FONT = 'Manrope Variable, Inter Variable, system-ui, sans-serif';
export const FONT_UI = 'Inter Variable, system-ui, sans-serif';

/**
 * Beats, in frames @30fps. Hard cuts, no overlap -- each scene paints its own
 * background from frame 0.
 *
 * THE SPINE, as the founder tells it. Everything else is texture hung on this:
 *
 *   I don't know if my marketing is working, which channels to spend on, or
 *   how much.  ->  Introducing Vero.  ->  It connects to your point of sale.
 *   ->  Then to every marketing channel.  ->  It attributes where customers
 *   came from and what they came for.  ->  This is NOT an AI that reads your
 *   data.  ->  It reasons deterministically, it builds the floor of what
 *   happens without marketing, and it forecasts what a change will do.  ->
 *   Outcomes: clearer decisions, better allocation, more customers in the door.
 *
 * Seven acts. Act 4 ("what we are not") is load-bearing -- without it every
 * claim in act 5 sounds like the same AI-summarizes-your-dashboard pitch the
 * buyer has already been sold twice.
 *
 * PACING RULE: a beat's length follows how much there is to read, not a house
 * average. A panel of numbers holds past the last reveal so it can be read
 * twice; a logo, a tagline or a two-word line gets out of the way. Trimming
 * the light beats is where the runtime comes from -- trimming the dense ones
 * just makes them illegible.
 *
 * `FILM_TOTAL` must equal the sum.
 */
export const FILM = {
  open: { from: 0, dur: 32 },

  // act 1 -- what you don't know
  hook: { from: 32, dur: 96 },
  threeUnknowns: { from: 128, dur: 150 },
  instinct: { from: 278, dur: 92 },

  // act 2 -- why nobody can tell you
  graded: { from: 370, dur: 118 },
  lastExpense: { from: 488, dur: 116 },

  // act 3 -- introducing Vero, and what it connects to
  intro: { from: 604, dur: 44 },
  connectPos: { from: 648, dur: 122 },
  connectChannels: { from: 770, dur: 118 },
  attribute: { from: 888, dur: 160 },

  // act 4 -- what we are not
  notChatbot: { from: 1048, dur: 150 },

  // act 5 -- how it actually works
  deterministic: { from: 1198, dur: 172 },
  baseline: { from: 1370, dur: 168 },
  forecast: { from: 1538, dur: 168 },

  // act 6 -- an answer, and a refusal
  answerTrend: { from: 1706, dur: 165 },
  whenItCant: { from: 1871, dur: 145 },

  // act 7 -- outcomes and close
  outcomes: { from: 2016, dur: 178 },
  tagline: { from: 2194, dur: 58 },
  cta: { from: 2252, dur: 100 },
} as const;

export const FILM_TOTAL = 2352; // 78.4s
