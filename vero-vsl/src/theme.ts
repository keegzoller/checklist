export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const C = {
  bg: '#060E1A',
  bgAlt: '#0B1729',
  panel: '#0F1E33',
  panelAlt: '#132844',
  line: 'rgba(95,168,255,0.16)',
  blue: '#2159B0',
  blueLight: '#5FA8FF',
  white: '#F2F6FC',
  muted: '#8CA2BF',
  dim: '#5C748F',
  green: '#3FD08A',
  amber: '#FFB547',
  red: '#FF6B6B',
};

// Vero's own UI palette, sampled from the product. The mock screen has to sit
// next to real screenshots without looking like a different app.
export const L = {
  page: '#F4F5F9',
  surface: '#FFFFFF',
  border: '#E5E8F0',
  text: '#0C0E14',
  muted: '#6B7280',
  dim: '#9AA1AE',
  primary: '#2126B7',
  green: '#1F9D57',
  red: '#D93A3A',
};

export const FONT_HEAD = 'Manrope Variable, Inter Variable, system-ui, sans-serif';
export const FONT_BODY = 'Inter Variable, system-ui, sans-serif';

// Scene boundaries in frames @30fps. Total 2400 = 80s.
export const SCENES = {
  hook: { from: 0, dur: 180 },
  oneCampaign: { from: 180, dur: 210 },
  blindSpot: { from: 390, dur: 270 },
  clicks: { from: 660, dur: 210 },
  connect: { from: 870, dur: 300 },
  ask: { from: 1170, dur: 300 },
  answer: { from: 1470, dur: 390 },
  differentiator: { from: 1860, dur: 180 },
  cta: { from: 2040, dur: 360 },
};

export const TOTAL = 2400;
