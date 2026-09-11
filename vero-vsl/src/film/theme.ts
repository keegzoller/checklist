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
 * background from frame 0. Most beats carry two or three sub-reveals inside
 * them, which is where the density comes from; stretching a beat to give a
 * line more room is almost always the wrong fix.
 *
 * `FILM_TOTAL` must equal the sum.
 */
export const FILM = {
  open: { from: 0, dur: 50 },
  onlyOne: { from: 50, dur: 100 },
  theRoom: { from: 150, dur: 110 },
  sameSale: { from: 260, dur: 80 },
  intro: { from: 340, dur: 65 },
  register: { from: 405, dur: 95 },
  twoQuestions: { from: 500, dur: 105 },
  method: { from: 605, dur: 120 },
  refuse: { from: 725, dur: 125 },
  proof: { from: 850, dur: 95 },
  partner: { from: 945, dur: 105 },
  limit: { from: 1050, dur: 85 },
  measure: { from: 1135, dur: 80 },
  cta: { from: 1215, dur: 115 },
} as const;

export const FILM_TOTAL = 1330; // 44.3s
