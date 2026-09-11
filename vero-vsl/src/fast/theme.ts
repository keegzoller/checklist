/**
 * VERO -- fast-cut VSL
 * --------------------
 * A second composition alongside the original 1:20 `VeroVSL`. Same product,
 * different register: kinetic typography, hard cuts, full-bleed colour flips.
 *
 * PALETTE SOURCE: vc-solutions.net, not invented and not borrowed from the
 * reference video. The named values below are the site's own CSS custom
 * properties, read straight off the homepage:
 *
 *   --vc-accent: #2159B0   --vc-navy: #0f172a   --vc-blue: #007bff
 *   --vc-text-dark: #1E212D   --text-slate: #475569   --bg-off-white: #f8fafc
 *
 * The site's signature gradient is `linear-gradient(135deg,#2159B0,#38BDF8)`,
 * which is where `brand` and `sky` come from. Vero is VCS's product, so the
 * video speaks in VCS's voice; the product's own light UI shows up inside
 * cards and screenshots unchanged.
 */

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const V = {
  /** --vc-accent. The primary. Buttons, accent words on light, spoke pulses. */
  brand: '#2159B0',
  brandDeep: '#16418F',
  /** --vc-blue. */
  brandBright: '#007BFF',

  /** The far end of the site's signature gradient. Accent word on dark. */
  sky: '#38BDF8',
  skySoft: '#8AC4FF',
  tint: '#A8CDFF',

  /** --vc-navy, and a deeper one for the top of the stage gradient. */
  navy: '#0F172A',
  navyDeep: '#080E1C',

  /** --vc-text-dark and --text-slate. */
  ink: '#1E212D',
  inkSoft: '#475569',
  inkMuted: '#6B7A99',

  /** --bg-off-white. */
  page: '#F8FAFC',
  surface: '#FFFFFF',
  border: '#E4E8F0',

  /**
   * Green is not decoration here. It means "this went the right way":
   * connected, paid, positive, resolved. Sky carries everything else.
   */
  green: '#34D399',
  greenDeep: '#1F9D57',

  red: '#FF5A5F',
  redDeep: '#D93A3A',
  amber: '#FFB547',
} as const;

/** The site's signature gradient, for squiggles and accent rules. */
export const BRAND_GRADIENT = [V.brand, V.sky] as const;

/**
 * Dark stage: --vc-navy in the corner, falling into --vc-accent across the
 * middle. The stops are pushed early on purpose -- with navy at 46% the centre
 * of a 1920x1080 frame lands in the dark half and struck-through copy stops
 * being readable. The centre of the frame wants to be brand blue.
 */
export const STAGE_DARK = `linear-gradient(152deg, ${V.navy} 0%, ${V.brandDeep} 34%, ${V.brand} 74%, #2B6FCB 100%)`;
/** The brighter variant, for the constellations and the payoff. */
export const STAGE_BRIGHT = `linear-gradient(135deg, #123B86 0%, ${V.brand} 50%, #2F8FD4 100%)`;

/**
 * Anton is vc-solutions.net's heading font (--heading-font-font-family), so
 * it carries the video's voice. It is a single weight (400), condensed, and
 * already tightly spaced -- do not pile negative letter-spacing on it the way
 * you would with a grotesque.
 *
 * Inter is the body face on the site's custom blocks and reads as the product
 * UI font inside cards, which is the distinction we want: VCS speaks, Vero
 * shows itself.
 */
export const FONT_HEAD = 'Anton, Inter Variable, system-ui, sans-serif';
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
  whereTheyAre: { from: 1195, dur: 115 },
  payoff: { from: 1310, dur: 125 },
  cta: { from: 1435, dur: 155 },
} as const;

export const FAST_TOTAL = 1590; // 53s
