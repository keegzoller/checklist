/**
 * VERO -- fast-cut VSL
 * --------------------
 * A second composition alongside the original 1:20 `VeroVSL`. Same product,
 * different register: kinetic typography, hard cuts, full-bleed colour flips.
 *
 * The palette is Vero's own, sampled from the product UI (see HANDOFF.md §3),
 * not invented. `blue` is the exact button fill from the Connections page.
 */

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const V = {
  /** Vero primary. Sampled from the "Manage connections" button fill. */
  blue: '#0006C1',
  blueDeep: '#00068E',

  /**
   * Full-bleed stage gradient. Same hue as `blue` (238deg) with the luminance
   * lifted, because #0006C1 across 1920x1080 eats white type alive. Keep the
   * hue locked if you retune these -- that is what makes the flips read as one
   * brand rather than two.
   */
  stageA: '#1A1FD6',
  stageB: '#4A44F0',
  stageC: '#6A5CFF',

  /** Tint sampled from the product's soft-blue link text. */
  tint: '#BDC4FF',
  tintSoft: '#E2E5F6',

  /** Near-black with a navy cast, for type on white. */
  ink: '#0A0D2B',
  inkSoft: '#5A5F8A',

  page: '#FBFAFD',
  surface: '#FFFFFF',
  border: '#E5E8F0',

  green: '#12C97E',
  greenDeep: '#1F9D57',
  red: '#FF5A5F',
  redDeep: '#D93A3A',
  amber: '#FFB547',
} as const;

export const FONT_HEAD = 'Manrope Variable, Inter Variable, system-ui, sans-serif';
export const FONT_BODY = 'Inter Variable, system-ui, sans-serif';

/**
 * Scene boundaries in frames @30fps. Unlike the original video these are hard
 * cuts -- no cross-fade overlap -- so `from` values butt up exactly against the
 * previous scene's end. Changing a `dur` means pushing every later `from`.
 * `FAST_TOTAL` must equal the sum.
 */
export const FAST = {
  hook: { from: 0, dur: 105 },
  butWhere: { from: 105, dur: 90 },
  spendVsProof: { from: 195, dur: 165 },
  theyBought: { from: 360, dur: 105 },
  connect: { from: 465, dur: 120 },
  noMore: { from: 585, dur: 150 },
  steps: { from: 735, dur: 240 },
  posLogos: { from: 975, dur: 110 },
  channelLogos: { from: 1085, dur: 110 },
  payoff: { from: 1195, dur: 125 },
  cta: { from: 1320, dur: 150 },
} as const;

export const FAST_TOTAL = 1470; // 49s
