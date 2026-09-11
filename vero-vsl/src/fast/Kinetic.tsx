import React from 'react';
import { AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND_GRADIENT, STAGE_BRIGHT, STAGE_DARK, V, FONT_BODY, FONT_HEAD } from './theme';

/* ------------------------------------------------------------------ *
 * springs
 * ------------------------------------------------------------------ */

/** Snappy with a little overshoot. The house motion of this cut. */
export const usePunch = (delay: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({
    frame: frame - delay,
    fps,
    config: { damping: 13, mass: 0.55, stiffness: 150 },
  });
};

/** No overshoot. For anything that would look silly wobbling. */
export const useEase = (delay: number, mass = 0.6) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping: 200, mass } });
};

/* ------------------------------------------------------------------ *
 * backgrounds
 * ------------------------------------------------------------------ */

/**
 * Sparkle field. Four-point stars, not dots -- the reference cut uses them as
 * connective tissue so a hard cut between two colours still feels like one
 * film. Seeded so every render is identical.
 */
export const Stars: React.FC<{ count?: number; color?: string; seed?: string; opacity?: number }> = ({
  count = 26,
  color = 'rgba(255,255,255,0.55)',
  seed = 's',
  opacity = 1,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity }}>
      {new Array(count).fill(0).map((_, i) => {
        const x = random(`${seed}x${i}`) * 100;
        const y = random(`${seed}y${i}`) * 100;
        const size = 6 + random(`${seed}s${i}`) * 16;
        const phase = random(`${seed}p${i}`) * Math.PI * 2;
        const speed = 0.045 + random(`${seed}v${i}`) * 0.05;
        const twinkle = 0.25 + 0.75 * Math.abs(Math.sin(phase + frame * speed));
        const drift = Math.sin(phase + frame * 0.012) * 14;
        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              opacity: twinkle,
              transform: `translateY(${drift}px) rotate(${drift * 1.5}deg)`,
            }}
          >
            {/* four-point sparkle: straight in, curved out */}
            <path
              d="M12 0 C12.6 7.2 16.8 11.4 24 12 C16.8 12.6 12.6 16.8 12 24 C11.4 16.8 7.2 12.6 0 12 C7.2 11.4 11.4 7.2 12 0 Z"
              fill={color}
            />
          </svg>
        );
      })}
    </AbsoluteFill>
  );
};

/**
 * Full-bleed VCS blue: navy falling into --vc-accent. The `warm` variant is
 * the brighter one, pushed toward the sky end of the site's signature
 * gradient. Named for what it does, not the old colour.
 */
export const BrandStage: React.FC<{ children?: React.ReactNode; warm?: boolean; dots?: boolean }> = ({
  children,
  warm = false,
  dots = true,
}) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame * 0.01) * 5;
  return (
    <AbsoluteFill
      style={{
        background: warm
          ? STAGE_BRIGHT.replace('135deg', `${135 + drift}deg`)
          : STAGE_DARK.replace('152deg', `${152 + drift}deg`),
      }}
    >
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(1250px 760px at 50% 50%, rgba(96,165,250,0.20) 0%, rgba(96,165,250,0) 68%)',
        }}
      />
      {dots && (
        <AbsoluteFill
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.16) 1.6px, transparent 1.6px)',
            backgroundSize: '52px 52px',
            backgroundPosition: `${drift}px ${-frame * 0.12}px`,
            opacity: 0.55,
          }}
        />
      )}
      {children}
    </AbsoluteFill>
  );
};

/** Full-bleed near-white. Gets a faint Vero wash so it is never flat #FFF. */
export const LightStage: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ background: V.page }}>
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(1500px 900px at 50% 120%, rgba(33,89,176,0.11) 0%, rgba(248,250,252,0) 65%)',
      }}
    />
    {children}
  </AbsoluteFill>
);

/**
 * The lavender diagonal that swipes behind the opening line. Lifted straight
 * from the reference cut -- it is what turns a static title into a beat.
 */
export const DiagonalBand: React.FC<{ delay?: number; height?: number; top?: string }> = ({
  delay = 0,
  height = 190,
  top = '38%',
}) => {
  const s = useEase(delay, 1.3);
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: '-12%',
        width: '124%',
        height,
        transform: `rotate(-7deg) translateX(${(1 - s) * -130}%)`,
        background: `linear-gradient(90deg, rgba(168,205,255,0) 0%, ${V.tint} 22%, #DCEBFF 78%, rgba(220,235,255,0) 100%)`,
        opacity: 0.9,
      }}
    />
  );
};

/* ------------------------------------------------------------------ *
 * type
 * ------------------------------------------------------------------ */

export type Word = { t: string; color?: string; strike?: boolean };

/**
 * A headline line whose words rise out of a mask one after another. `stagger`
 * of 3 frames is the reference's pace -- fast enough to read as one gesture.
 */
export const RiseLine: React.FC<{
  words: Word[];
  delay?: number;
  size?: number;
  color?: string;
  stagger?: number;
  weight?: number;
  gap?: number;
  justify?: 'center' | 'flex-start';
}> = ({
  words,
  delay = 0,
  size = 118,
  color = V.ink,
  stagger = 3,
  weight = 400,
  gap = 0.26,
  justify = 'center',
}) => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: justify,
      alignItems: 'baseline',
      columnGap: size * gap,
      fontFamily: FONT_HEAD,
      fontSize: size,
      fontWeight: weight,
      // Anton ships one weight and is already condensed -- negative tracking
      // welds the letters together. A hair of positive spacing opens it up.
      letterSpacing: size * 0.004,
      lineHeight: 1.04,
    }}
  >
    {words.map((w, i) => (
      <MaskedWord key={i} word={w} delay={delay + i * stagger} color={color} size={size} />
    ))}
  </div>
);

const MaskedWord: React.FC<{ word: Word; delay: number; color: string; size: number }> = ({
  word,
  delay,
  color,
  size,
}) => {
  const s = usePunch(delay);
  return (
    // padding gives descenders and the overshoot somewhere to live; the
    // negative margin takes the same space back out of the layout.
    <span
      style={{
        display: 'inline-block',
        overflow: 'hidden',
        padding: `${size * 0.12}px 0 ${size * 0.18}px`,
        margin: `${-size * 0.12}px 0 ${-size * 0.18}px`,
      }}
    >
      <span
        style={{
          display: 'inline-block',
          transform: `translateY(${(1 - s) * 118}%)`,
          color: word.color ?? color,
          position: 'relative',
          whiteSpace: 'pre',
        }}
      >
        {word.t}
        {word.strike && <StrikeThrough delay={delay + 6} color={word.color ?? color} />}
      </span>
    </span>
  );
};

/** Line that draws itself through a word, left to right. */
export const StrikeThrough: React.FC<{ delay?: number; color?: string; thickness?: number }> = ({
  delay = 0,
  color = V.ink,
  thickness = 0.07,
}) => {
  const s = useEase(delay, 0.5);
  return (
    <span
      style={{
        position: 'absolute',
        left: '-2%',
        top: '52%',
        width: `${104 * s}%`,
        height: `${thickness}em`,
        background: color,
        borderRadius: 99,
      }}
    />
  );
};

/**
 * Hand-drawn wavy underline. Drawn with stroke-dashoffset so it writes on.
 * The reference puts one of these under the payload word of almost every line.
 */
export const Squiggle: React.FC<{
  delay?: number;
  width?: number;
  /** A solid colour, or omit it to use the site's #2159B0 -> #38BDF8 gradient. */
  color?: string;
  thickness?: number;
}> = ({ delay = 0, width = 520, color, thickness = 11 }) => {
  const s = useEase(delay, 0.9);
  const LEN = 1080; // rough arclength of the path below
  const id = React.useId();
  return (
    <svg width={width} height={width * 0.075} viewBox="0 0 1000 76" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={BRAND_GRADIENT[0]} />
          <stop offset="100%" stopColor={BRAND_GRADIENT[1]} />
        </linearGradient>
      </defs>
      <path
        d="M8 50 C 120 12, 200 12, 300 44 S 470 78, 570 44 S 760 8, 870 40 S 960 60, 992 50"
        fill="none"
        stroke={color ?? `url(#${id})`}
        strokeWidth={thickness}
        strokeLinecap="round"
        strokeDasharray={LEN}
        strokeDashoffset={LEN * (1 - s)}
      />
    </svg>
  );
};

/** Small all-caps label. Sits under headlines as the quiet second voice. */
export const Micro: React.FC<{
  children: React.ReactNode;
  delay?: number;
  color?: string;
  size?: number;
}> = ({ children, delay = 0, color = V.inkSoft, size = 21 }) => {
  const s = useEase(delay, 0.5);
  return (
    <div
      style={{
        opacity: s,
        transform: `translateY(${(1 - s) * 14}px)`,
        fontFamily: FONT_BODY,
        fontSize: size,
        fontWeight: 600,
        letterSpacing: size * 0.28,
        textTransform: 'uppercase',
        color,
      }}
    >
      {children}
    </div>
  );
};

/* ------------------------------------------------------------------ *
 * numbers
 * ------------------------------------------------------------------ */

/**
 * Counts up on a spring so it decelerates into the final value instead of
 * ticking linearly. `format` receives the in-between value each frame.
 */
export const Counter: React.FC<{
  to: number;
  delay?: number;
  duration?: number;
  format?: (n: number) => string;
  size?: number;
  color?: string;
}> = ({ to, delay = 0, duration = 42, format = (n) => Math.round(n).toLocaleString('en-US'), size = 260, color = V.brand }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const eased = 1 - Math.pow(1 - t, 3);
  const pop = usePunch(delay);
  return (
    <div
      style={{
        fontFamily: FONT_HEAD,
        fontSize: size,
        fontWeight: 400,
        letterSpacing: size * 0.006,
        color,
        lineHeight: 1,
        transform: `scale(${0.82 + pop * 0.18})`,
        // tabular figures stop the number jittering sideways as digits change
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {format(to * eased)}
    </div>
  );
};

/* ------------------------------------------------------------------ *
 * cards
 * ------------------------------------------------------------------ */

/**
 * A white card that pops in and then breathes. These are the confetti of the
 * reference cut -- scattered around the type, never in a grid.
 */
export const FloatCard: React.FC<{
  children: React.ReactNode;
  delay?: number;
  x: number | string;
  y: number | string;
  rotate?: number;
  width?: number;
  seed?: number;
  padding?: string;
  dark?: boolean;
}> = ({ children, delay = 0, x, y, rotate = 0, width, seed = 1, padding = '16px 20px', dark = false }) => {
  const frame = useCurrentFrame();
  const s = usePunch(delay);
  const bobY = Math.sin((frame + seed * 37) * 0.031) * 7;
  const bobR = Math.sin((frame + seed * 53) * 0.024) * 1.1;
  return (
    <div
      style={{
        position: 'absolute',
        left: typeof x === 'number' ? x : x,
        top: typeof y === 'number' ? y : y,
        width,
        padding,
        borderRadius: 16,
        background: dark ? 'rgba(10,13,43,0.92)' : V.surface,
        border: dark ? '1px solid rgba(255,255,255,0.10)' : `1px solid ${V.border}`,
        boxShadow: dark
          ? '0 26px 60px rgba(8,14,28,0.44)'
          : '0 18px 44px rgba(15,23,41,0.14), 0 2px 6px rgba(33,89,176,0.10)',
        fontFamily: FONT_BODY,
        color: dark ? V.surface : V.ink,
        opacity: Math.min(1, s * 1.5),
        transform: `translateY(${(1 - s) * 40 + bobY}px) rotate(${rotate + bobR}deg) scale(${0.88 + s * 0.12})`,
        transformOrigin: 'center',
      }}
    >
      {children}
    </div>
  );
};

/** Two-line stat card: a label above, a value below. */
export const StatCard: React.FC<{
  label: string;
  value: React.ReactNode;
  badge?: string;
  badgeColor?: string;
}> = ({ label, value, badge, badgeColor = V.greenDeep }) => (
  <>
    <div style={{ fontSize: 18, fontWeight: 600, color: V.inkSoft, letterSpacing: 0.3 }}>{label}</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
      <div style={{ fontFamily: FONT_HEAD, fontSize: 46, fontWeight: 400, color: V.ink, lineHeight: 1.15 }}>
        {value}
      </div>
      {badge && (
        <span
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: badgeColor,
            background: `${badgeColor}1A`,
            padding: '3px 9px',
            borderRadius: 99,
          }}
        >
          {badge}
        </span>
      )}
    </div>
  </>
);
