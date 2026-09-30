import React from 'react';
import { Img, staticFile, useCurrentFrame } from 'remotion';
import { F, FONT } from './theme';
import { ramp } from './Motion';

/**
 * The Vero brand moment, used at the introduction and again at the close.
 *
 * The mark is a raster droplet with a definite "up", so spinning it outright
 * looks broken. What reads as motion instead: a glow that blooms out of it,
 * two orbital rings that draw on and keep turning (the logo art already has
 * rings, so this is the mark's own idea extended), a short turn-to-face on
 * entry, and the wordmark uncovering from behind it.
 *
 * Restraint still applies. Everything here resolves inside a second and then
 * only breathes -- the rest of the film is calm and a bouncing logo would
 * undo that.
 */
export const VeroSignature: React.FC<{
  size?: number;
  wordSize?: number;
  delay?: number;
  exit?: number;
  showWord?: boolean;
}> = ({ size = 150, wordSize, delay = 0, exit, showWord = true }) => {
  const frame = useCurrentFrame();
  const t = frame - delay;

  const bloom = ramp(frame, delay, 26);
  const markIn = ramp(frame, delay + 2, 20);
  const ringA = ramp(frame, delay + 6, 30);
  const ringB = ramp(frame, delay + 12, 30);
  const wordIn = ramp(frame, delay + 16, 18);
  const leave = exit === undefined ? 0 : ramp(frame, exit, 8);

  const float = Math.sin(t * 0.045) * 4;
  const breathe = 1 + Math.sin(t * 0.05) * 0.012;
  const spinA = t * 0.9;
  const spinB = -t * 0.62;

  const box = size * 2.1;
  const ws = wordSize ?? size * 1.02;
  const alive = 1 - leave;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        opacity: alive,
        filter: `blur(${leave * 7}px)`,
      }}
    >
      {/* mark, rings and glow share one square so the rings stay centred on it */}
      <div
        style={{
          position: 'relative',
          width: box,
          height: box,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(56,189,248,0.34) 0%, rgba(56,189,248,0.10) 30%, rgba(255,255,255,0) 54%)',
            transform: `scale(${0.5 + bloom * 0.5})`,
            opacity: bloom * (0.62 + Math.sin(t * 0.05) * 0.10),
          }}
        />

        <Ring size={box} spin={spinA} draw={ringA} tilt={14} ry={0.17} color="rgba(56,189,248,0.50)" w={1.8} />
        <Ring size={box} spin={spinB} draw={ringB} tilt={-19} ry={0.11} color="rgba(33,89,176,0.26)" w={1.4} />

        <Img
          src={staticFile('logos/vero-mark.png')}
          style={{
            position: 'relative',
            width: size,
            height: size,
            objectFit: 'contain',
            opacity: markIn,
            // turns to face the viewer rather than spinning, which a droplet
            // with a fixed "up" cannot do without looking wrong
            transform: `translateY(${float}px) perspective(900px) rotateY(${(1 - markIn) * -38}deg) scale(${(0.82 + markIn * 0.18) * breathe})`,
          }}
        />
      </div>

      {showWord && (
        // the wordmark uncovers from behind the mark rather than fading in
        <span
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            marginLeft: -size * 0.16,
            clipPath: `inset(0 ${(1 - wordIn) * 100}% 0 0)`,
          }}
        >
          <span
            style={{
              display: 'inline-block',
              fontFamily: FONT,
              fontSize: ws,
              fontWeight: 700,
              letterSpacing: -ws * 0.035,
              color: F.ink,
              transform: `translateX(${(1 - wordIn) * -18}px)`,
              paddingRight: ws * 0.06,
            }}
          >
            Vero
          </span>
        </span>
      )}
    </div>
  );
};

const Ring: React.FC<{
  size: number;
  spin: number;
  draw: number;
  tilt: number;
  ry: number;
  color: string;
  w: number;
}> = ({ size, spin, draw, tilt, ry, color, w }) => {
  const r = size * 0.53;
  const rry = r * ry;
  const LEN = Math.PI * 2 * Math.sqrt((r * r + rry * rry) / 2);
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{
        position: 'absolute',
        inset: 0,
        transform: `rotate(${tilt + spin}deg)`,
        overflow: 'visible',
      }}
    >
      <ellipse
        cx={size / 2}
        cy={size / 2}
        rx={r}
        ry={rry}
        fill="none"
        stroke={color}
        strokeWidth={w}
        strokeLinecap="round"
        strokeDasharray={LEN}
        strokeDashoffset={LEN * (1 - draw)}
      />
    </svg>
  );
};
