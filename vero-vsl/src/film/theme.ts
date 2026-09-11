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
 * THE ARC, in five acts. The earlier version of this cut explained the method
 * beautifully and never told an owner what they would actually receive, which
 * is the difference between "clever" and "worth buying":
 *
 *   1. the feeling      -- you're spending it either way, and you still guess
 *   2. why nobody knows -- everyone reporting to you is graded by themselves,
 *                          and marketing is the last big expense nobody checks
 *   3. what Vero does   -- reads the register, compares against your own quiet
 *                          locations
 *   4. WHAT YOU GET     -- four concrete things, each with the money attached
 *   5. the close        -- what it won't do, and the line
 *
 * Text-heavy beats hold roughly a second past the last word landing. That is
 * deliberate: a line you cannot finish reading may as well not be there.
 *
 * `FILM_TOTAL` must equal the sum.
 */
export const FILM = {
  open: { from: 0, dur: 55 },

  // act 1 -- the feeling
  eitherWay: { from: 55, dur: 115 },
  everyMonth: { from: 170, dur: 120 },
  gut: { from: 290, dur: 125 },

  // act 2 -- why nobody can tell you
  graded: { from: 415, dur: 135 },
  sameSale: { from: 550, dur: 100 },
  lastExpense: { from: 650, dur: 130 },

  // act 3 -- what Vero does
  register: { from: 780, dur: 120 },
  quietOnes: { from: 900, dur: 140 },

  // act 4 -- what you actually get
  whatYouGet: { from: 1040, dur: 55 },
  getLocations: { from: 1095, dur: 110 },
  getNextDollar: { from: 1205, dur: 110 },
  getLeak: { from: 1315, dur: 110 },
  getAsk: { from: 1425, dur: 115 },
  sounds: { from: 1540, dur: 175 },
  tellYouNo: { from: 1715, dur: 130 },

  // act 5 -- the close
  limit: { from: 1845, dur: 95 },
  measure: { from: 1940, dur: 95 },
  cta: { from: 2035, dur: 130 },
} as const;

export const FILM_TOTAL = 2165; // 72.2s
