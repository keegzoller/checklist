import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { C, FONT_BODY, FONT_HEAD } from '../theme';

/* ---------- background ---------- */

export const Backdrop: React.FC<{ intensity?: number }> = ({ intensity = 1 }) => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 2400], [0, -80]);
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(1200px 800px at ${50 + drift * 0.05}% 8%, rgba(33,89,176,${0.42 * intensity}) 0%, rgba(6,14,26,0) 62%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(900px 700px at 88% 96%, rgba(95,168,255,${0.14 * intensity}) 0%, rgba(6,14,26,0) 60%)`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(rgba(95,168,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(95,168,255,0.055) 1px, transparent 1px)`,
          backgroundSize: '96px 96px',
          backgroundPosition: `0px ${drift}px`,
          maskImage: 'radial-gradient(1400px 900px at 50% 45%, black 0%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(1400px 900px at 50% 45%, black 0%, transparent 78%)',
        }}
      />
      <AbsoluteFill
        style={{
          boxShadow: 'inset 0 0 400px rgba(0,0,0,0.75)',
        }}
      />
    </AbsoluteFill>
  );
};

/* ---------- scene wrapper: fade in / fade out ---------- */

export const Scene: React.FC<{
  durationInFrames: number;
  fadeOut?: boolean;
  children: React.ReactNode;
}> = ({ durationInFrames, fadeOut = true, children }) => {
  const frame = useCurrentFrame();
  const opacity = fadeOut
    ? interpolate(frame, [0, 12, durationInFrames - 14, durationInFrames - 1], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : interpolate(frame, [0, 12], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.018]);
  return (
    <AbsoluteFill style={{ opacity, transform: `scale(${scale})` }}>{children}</AbsoluteFill>
  );
};

/* ---------- motion helpers ---------- */

export const useRise = (delay: number, distance = 34) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 200, mass: 0.7 } });
  return {
    opacity: s,
    transform: `translateY(${(1 - s) * distance}px)`,
  } as React.CSSProperties;
};

export const usePop = (delay: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 14, mass: 0.6, stiffness: 120 } });
  return { opacity: Math.min(1, s * 1.6), transform: `scale(${0.9 + s * 0.1})` } as React.CSSProperties;
};

/* ---------- type ---------- */

export const Kicker: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => {
  const st = useRise(delay, 18);
  return (
    <div
      style={{
        ...st,
        fontFamily: FONT_BODY,
        fontSize: 24,
        fontWeight: 600,
        letterSpacing: 4.5,
        textTransform: 'uppercase',
        color: C.blueLight,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <span style={{ width: 44, height: 2, background: C.blueLight, opacity: 0.7 }} />
      {children}
    </div>
  );
};

export const Headline: React.FC<{
  children: React.ReactNode;
  delay?: number;
  size?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, size = 92, style }) => {
  const st = useRise(delay);
  return (
    <div
      style={{
        ...st,
        ...style,
        fontFamily: FONT_HEAD,
        fontSize: size,
        fontWeight: 800,
        letterSpacing: -2.2,
        lineHeight: 1.08,
        color: C.white,
        maxWidth: 1450,
      }}
    >
      {children}
    </div>
  );
};

export const Sub: React.FC<{ children: React.ReactNode; delay?: number; size?: number }> = ({
  children,
  delay = 0,
  size = 38,
}) => {
  const st = useRise(delay, 24);
  return (
    <div
      style={{
        ...st,
        fontFamily: FONT_BODY,
        fontSize: size,
        fontWeight: 400,
        lineHeight: 1.42,
        color: C.muted,
        maxWidth: 1180,
      }}
    >
      {children}
    </div>
  );
};

export const Accent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    style={{
      color: 'transparent',
      backgroundImage: `linear-gradient(96deg, ${C.blueLight} 0%, #A8D0FF 100%)`,
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
    }}
  >
    {children}
  </span>
);

/* ---------- layout ---------- */

export const Stage: React.FC<{
  children: React.ReactNode;
  align?: 'center' | 'left';
  gap?: number;
}> = ({ children, align = 'left', gap = 34 }) => (
  <AbsoluteFill
    style={{
      padding: '0 150px',
      justifyContent: 'center',
      alignItems: align === 'center' ? 'center' : 'flex-start',
      textAlign: align === 'center' ? 'center' : 'left',
      display: 'flex',
      flexDirection: 'column',
      gap,
    }}
  >
    {children}
  </AbsoluteFill>
);
