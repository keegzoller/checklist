import React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { F, FONT, FONT_UI } from './theme';

/* ------------------------------------------------------------------ *
 * timing
 * ------------------------------------------------------------------ */

/**
 * The house curve. No spring, no overshoot -- a spring that wobbles is what
 * makes motion read as a template rather than as a product.
 */
const OUT = Easing.bezier(0.16, 1, 0.3, 1);

/** 0 -> 1 over `dur` frames starting at `delay`. */
export const ramp = (frame: number, delay: number, dur = 14) =>
  interpolate(frame - delay, [0, dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: OUT,
  });

/**
 * The signature reveal: blur and lift in, hold, then blur and lift back out.
 * `exit` is the frame the element starts leaving; omit it and it stays.
 */
export const useReveal = (delay: number, exit?: number, dur = 11) => {
  const frame = useCurrentFrame();
  const enter = ramp(frame, delay, dur);
  const leave = exit === undefined ? 0 : ramp(frame, exit, 7);
  const t = enter - leave;
  return {
    opacity: t,
    filter: `blur(${(1 - enter) * 9 + leave * 7}px)`,
    transform: `translateY(${(1 - enter) * 16 - leave * 10}px)`,
  } as React.CSSProperties;
};

/* ------------------------------------------------------------------ *
 * stage
 * ------------------------------------------------------------------ */

/**
 * Near-white, with one soft diagonal wash of the brand blue in a corner. It is
 * almost subliminal on a single frame and it is what stops 44 seconds of white
 * from looking like a slide deck.
 */
export const Stage: React.FC<{ children?: React.ReactNode; flip?: boolean }> = ({
  children,
  flip = false,
}) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame * 0.009) * 3;
  return (
    <AbsoluteFill style={{ background: F.page }}>
      <AbsoluteFill
        style={{
          background: flip
            ? `linear-gradient(${196 + drift}deg, rgba(33,89,176,0.10) 0%, rgba(56,189,248,0.05) 26%, rgba(255,255,255,0) 58%)`
            : `linear-gradient(${216 + drift}deg, rgba(33,89,176,0.11) 0%, rgba(56,189,248,0.06) 24%, rgba(255,255,255,0) 56%)`,
          transform: flip ? 'scaleX(-1)' : undefined,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(900px 600px at 50% 118%, rgba(33,89,176,0.05) 0%, rgba(255,255,255,0) 70%)',
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

export const Center: React.FC<{
  children: React.ReactNode;
  gap?: number;
  align?: 'center' | 'flex-start';
  pad?: number;
}> = ({ children, gap = 10, align = 'center', pad = 150 }) => (
  <AbsoluteFill
    style={{
      justifyContent: 'center',
      alignItems: align,
      flexDirection: 'column',
      gap,
      padding: `0 ${pad}px`,
      textAlign: align === 'center' ? 'center' : 'left',
    }}
  >
    {children}
  </AbsoluteFill>
);

/* ------------------------------------------------------------------ *
 * type
 * ------------------------------------------------------------------ */

export type W = { t: string; ghost?: boolean; color?: string };

/**
 * A line whose words blur in one after another. The whole line lands in about
 * 20 frames -- fast enough that the eye reads it as one gesture, which is the
 * difference between "considered" and "slow".
 *
 * Words marked `ghost` stay grey: the sentence is all there, but only the part
 * being said is black. That grey/black split does most of the work in this cut.
 */
export const Line: React.FC<{
  words: W[];
  delay?: number;
  exit?: number;
  size?: number;
  stagger?: number;
  weight?: number;
  color?: string;
  justify?: 'center' | 'flex-start';
  lh?: number;
}> = ({
  words,
  delay = 0,
  exit,
  size = 92,
  stagger = 2.2,
  weight = 800,
  color = F.ink,
  justify = 'center',
  lh = 1.14,
}) => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: justify,
      alignItems: 'baseline',
      columnGap: size * 0.26,
      rowGap: size * (lh - 1),
      fontFamily: FONT,
      fontSize: size,
      fontWeight: weight,
      letterSpacing: -size * 0.028,
      lineHeight: lh,
    }}
  >
    {words.map((w, i) => (
      <Word key={i} w={w} delay={delay + i * stagger} exit={exit} color={color} />
    ))}
  </div>
);

const Word: React.FC<{ w: W; delay: number; exit?: number; color: string }> = ({
  w,
  delay,
  exit,
  color,
}) => {
  const st = useReveal(delay, exit);
  return (
    <span
      style={{
        ...st,
        display: 'inline-block',
        whiteSpace: 'pre',
        color: w.color ?? (w.ghost ? F.ghost : color),
      }}
    >
      {w.t}
    </span>
  );
};

/** Small all-caps label. The quiet second voice above or below a line. */
export const Eyebrow: React.FC<{
  children: React.ReactNode;
  delay?: number;
  exit?: number;
  color?: string;
  size?: number;
}> = ({ children, delay = 0, exit, color = F.muted, size = 19 }) => {
  const st = useReveal(delay, exit);
  return (
    <div
      style={{
        ...st,
        fontFamily: FONT_UI,
        fontSize: size,
        fontWeight: 600,
        letterSpacing: size * 0.22,
        textTransform: 'uppercase',
        color,
      }}
    >
      {children}
    </div>
  );
};

/** Body copy under a line. */
export const Sub: React.FC<{
  children: React.ReactNode;
  delay?: number;
  exit?: number;
  size?: number;
  color?: string;
  width?: number;
  /** Centred body copy under a centred headline. Left-aligned by default,
   *  which is right beside a panel and wrong underneath one. */
  center?: boolean;
}> = ({ children, delay = 0, exit, size = 31, color = F.muted, width = 1050, center = false }) => {
  const st = useReveal(delay, exit);
  return (
    <div
      style={{
        ...st,
        fontFamily: FONT_UI,
        fontSize: size,
        fontWeight: 400,
        lineHeight: 1.5,
        color,
        maxWidth: width,
        textAlign: center ? 'center' : 'left',
      }}
    >
      {children}
    </div>
  );
};

/* ------------------------------------------------------------------ *
 * chips
 * ------------------------------------------------------------------ */

export const Chip: React.FC<{
  children: React.ReactNode;
  delay?: number;
  exit?: number;
  size?: number;
  tone?: 'grey' | 'brand' | 'green' | 'red' | 'amber';
}> = ({ children, delay = 0, exit, size = 40, tone = 'grey' }) => {
  const st = useReveal(delay, exit);
  const tones = {
    grey: [F.chip, F.chipInk],
    brand: ['rgba(33,89,176,0.10)', F.brand],
    green: [F.greenWash, F.green],
    red: [F.redWash, F.red],
    amber: [F.amberWash, F.amber],
  } as const;
  const [bg, fg] = tones[tone];
  return (
    <span
      style={{
        ...st,
        display: 'inline-block',
        padding: `${size * 0.26}px ${size * 0.62}px`,
        borderRadius: 999,
        background: bg,
        color: fg,
        fontFamily: FONT,
        fontSize: size,
        fontWeight: 700,
        letterSpacing: -size * 0.016,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
};

/**
 * One chip whose label swaps. Sideshift's "Built for [startups / brands /
 * agencies]" move: the word cross-fades and the pill resizes under it.
 */
export const SwapChip: React.FC<{
  values: string[];
  start?: number;
  hold?: number;
  size?: number;
  exit?: number;
}> = ({ values, start = 0, hold = 26, size = 40, exit }) => {
  const frame = useCurrentFrame();
  const i = Math.min(values.length - 1, Math.max(0, Math.floor((frame - start) / hold)));
  const local = frame - start - i * hold;
  const inT = interpolate(local, [0, 7], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const out = exit === undefined ? 0 : ramp(frame, exit, 10);
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${size * 0.26}px ${size * 0.62}px`,
        borderRadius: 999,
        background: F.chip,
        opacity: 1 - out,
        filter: `blur(${out * 7}px)`,
      }}
    >
      <span
        style={{
          fontFamily: FONT,
          fontSize: size,
          fontWeight: 700,
          letterSpacing: -size * 0.016,
          color: F.chipInk,
          whiteSpace: 'nowrap',
          opacity: inT,
          filter: `blur(${(1 - inT) * 6}px)`,
          transform: `translateY(${(1 - inT) * 8}px)`,
        }}
      >
        {values[i]}
      </span>
    </span>
  );
};

/* ------------------------------------------------------------------ *
 * product panels
 * ------------------------------------------------------------------ */

/**
 * The frame a product screen sits in. Sideshift's move, and the reason its
 * video reads as "we have a real product": the panel is enormous, its top-left
 * corner is visible, and it bleeds off the right and bottom edges. Cropping it
 * is what makes it feel like a window onto something bigger than the frame.
 */
export const Panel: React.FC<{
  children: React.ReactNode;
  delay?: number;
  exit?: number;
  x?: number | string;
  y?: number | string;
  width?: number;
  /** slow push-in across the beat, in scale units */
  zoom?: number;
  dur?: number;
}> = ({ children, delay = 0, exit, x = 620, y = 110, width = 1460, zoom = 0.03, dur = 16 }) => {
  const frame = useCurrentFrame();
  const enter = ramp(frame, delay, dur);
  const leave = exit === undefined ? 0 : ramp(frame, exit, 8);
  const drift = interpolate(frame - delay, [0, 150], [0, zoom], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        borderRadius: 20,
        overflow: 'hidden',
        background: F.panel,
        border: `1px solid ${F.line}`,
        boxShadow: '0 42px 90px rgba(15,23,41,0.13), 0 6px 18px rgba(15,23,41,0.05)',
        opacity: enter - leave,
        filter: `blur(${(1 - enter) * 10 + leave * 8}px)`,
        transform: `translate(${(1 - enter) * 56 + leave * 26}px, 0) scale(${1 + drift})`,
        transformOrigin: 'top left',
      }}
    >
      {children}
    </div>
  );
};

/** The left-hand caption beside a panel: icon, black word, grey word. */
export const PanelLabel: React.FC<{
  icon?: React.ReactNode;
  top: string;
  bottom: string;
  delay?: number;
  exit?: number;
  size?: number;
}> = ({ icon, top, bottom, delay = 0, exit, size = 84 }) => {
  const a = useReveal(delay, exit);
  const b = useReveal(delay + 4, exit);
  const c = useReveal(delay + 8, exit);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: size * 0.12 }}>
      {icon && <div style={{ ...a, marginBottom: size * 0.16 }}>{icon}</div>}
      <div
        style={{
          ...b,
          fontFamily: FONT,
          fontSize: size,
          fontWeight: 800,
          letterSpacing: -size * 0.032,
          lineHeight: 1,
          color: F.ink,
        }}
      >
        {top}
      </div>
      <div
        style={{
          ...c,
          fontFamily: FONT,
          fontSize: size,
          fontWeight: 800,
          letterSpacing: -size * 0.032,
          lineHeight: 1,
          color: F.ghost,
        }}
      >
        {bottom}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ *
 * numbers
 * ------------------------------------------------------------------ */

/** Counts up on the house curve, with a touch of blur while it is moving. */
export const Roll: React.FC<{
  to: number;
  delay?: number;
  dur?: number;
  exit?: number;
  format?: (n: number) => string;
  size?: number;
  color?: string;
  weight?: number;
}> = ({
  to,
  delay = 0,
  dur = 34,
  exit,
  format = (n) => Math.round(n).toLocaleString('en-US'),
  size = 120,
  color = F.ink,
  weight = 800,
}) => {
  const frame = useCurrentFrame();
  const t = ramp(frame, delay, dur);
  const appear = ramp(frame, delay, 10);
  const out = exit === undefined ? 0 : ramp(frame, exit, 10);
  const moving = t > 0.01 && t < 0.995;
  return (
    <span
      style={{
        fontFamily: FONT,
        fontSize: size,
        fontWeight: weight,
        letterSpacing: -size * 0.03,
        lineHeight: 1.05,
        color,
        fontVariantNumeric: 'tabular-nums',
        opacity: appear - out,
        filter: `blur(${(1 - appear) * 8 + (moving ? 0.7 : 0) + out * 7}px)`,
        display: 'inline-block',
      }}
    >
      {format(to * t)}
    </span>
  );
};
