import React from 'react';
import { Img, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { V, FONT_BODY, FONT_HEAD } from './theme';
import { BRAND_PATHS } from './brandPaths.generated';
import { LOGO_FILES } from './logoAssets';
import { usePunch, useEase } from './Kinetic';

/* ================================================================== *
 * Vero's own mark
 * ================================================================== *
 *
 * The real mark, cut from the product header in the 2026-09-07 screen
 * recording (public/logos/vero-mark.png, 512px upscaled from a 174px source).
 * Because that is all the resolution we have, it is never drawn above ~150px
 * on a 1080p frame -- past that it softens. It sits on a white tile by
 * default, which is both how the product presents it and how the reference
 * cut presents its hub.
 *
 * Replace it by dropping a proper export in public/logos/ and pointing `vero`
 * at it in logoAssets.ts. Then the size cap can come off.
 */
export const VeroMark: React.FC<{ size?: number; tile?: boolean; radius?: number }> = ({
  size = 120,
  tile = true,
  radius,
}) => {
  const file = LOGO_FILES.vero ?? 'vero-mark.png';
  const img = (
    <Img
      src={staticFile(`logos/${file}`)}
      style={{ width: size, height: size, objectFit: 'contain', display: 'block' }}
    />
  );
  if (!tile) return img;
  return (
    <span
      style={{
        display: 'block',
        width: size,
        height: size,
        borderRadius: radius ?? size * 0.26,
        overflow: 'hidden',
        background: V.surface,
      }}
    >
      {img}
    </span>
  );
};

/** Mark plus wordmark, as it appears in the product header. */
export const VeroLockup: React.FC<{ size?: number; color?: string }> = ({ size = 96, color = V.ink }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: size * 0.10 }}>
    <VeroMark size={size} tile={false} />
    <span
      style={{
        fontFamily: FONT_HEAD,
        fontSize: size * 0.78,
        fontWeight: 800,
        letterSpacing: -size * 0.028,
        color,
      }}
    >
      Vero
    </span>
  </div>
);

/* ================================================================== *
 * third-party brand glyphs
 * ================================================================== */

type Glyph = { node: React.ReactNode; hex: string };

/** Brands whose official path ships in simple-icons. */
const fromSimpleIcons = (slug: keyof typeof BRAND_PATHS, override?: string): Glyph => {
  const b = BRAND_PATHS[slug];
  return {
    hex: override ?? b.hex,
    node: (
      <svg viewBox="0 0 24 24" width="100%" height="100%">
        <path d={b.path} fill={override ?? b.hex} />
      </svg>
    ),
  };
};

/**
 * Brands whose logo is a custom wordmark rather than drawable geometry get a
 * monogram tile in the brand's own colour. It reads as a lockup at pill scale
 * and is honestly a stand-in rather than a bad trace of someone's trademark.
 * Drop an official SVG/PNG into public/logos/ to replace any of them.
 */
const monogram = (letter: string, hex: string, fg = '#FFFFFF'): Glyph => ({
  hex,
  node: (
    <svg viewBox="0 0 24 24" width="100%" height="100%">
      <rect width="24" height="24" rx="6.5" fill={hex} />
      <text
        x="12"
        y="12"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily={FONT_HEAD}
        fontSize="14"
        fontWeight="800"
        fill={fg}
      >
        {letter}
      </text>
    </svg>
  ),
});

/**
 * Official glyph knocked out of a brand-coloured tile, for marks whose own
 * colour disappears against a white pill.
 */
const tiled = (slug: keyof typeof BRAND_PATHS, bg: string, fg: string): Glyph => {
  const b = BRAND_PATHS[slug];
  return {
    hex: bg,
    node: (
      <svg viewBox="0 0 24 24" width="100%" height="100%">
        <rect width="24" height="24" rx="6.5" fill={bg} />
        <g transform="translate(3.6 3.6) scale(0.7)">
          <path d={b.path} fill={fg} />
        </g>
      </svg>
    ),
  };
};

/** Clover: the mark really is a four-leaf clover, so it is drawable. */
const cloverGlyph: Glyph = {
  hex: '#31A24C',
  node: (
    <svg viewBox="0 0 24 24" width="100%" height="100%">
      <g fill="#31A24C">
        <circle cx="12" cy="6.6" r="4.1" />
        <circle cx="17.4" cy="12" r="4.1" />
        <circle cx="12" cy="17.4" r="4.1" />
        <circle cx="6.6" cy="12" r="4.1" />
      </g>
      <circle cx="12" cy="12" r="2.6" fill="#FFFFFF" opacity="0.95" />
    </svg>
  ),
};

/** Google Business Profile: the map pin is the recognisable part. */
const gbpGlyph: Glyph = {
  hex: '#4285F4',
  node: (
    <svg viewBox="0 0 24 24" width="100%" height="100%">
      <path
        d="M12 1.6c-4.1 0-7.4 3.3-7.4 7.4 0 5.5 7.4 13.4 7.4 13.4s7.4-7.9 7.4-13.4c0-4.1-3.3-7.4-7.4-7.4z"
        fill="#4285F4"
      />
      <path d="M12 1.6c-4.1 0-7.4 3.3-7.4 7.4h14.8c0-4.1-3.3-7.4-7.4-7.4z" fill="#EA4335" />
      <path d="M4.6 9c0 2.2 1.2 4.7 2.6 6.9L12 9H4.6z" fill="#FBBC04" />
      <path d="M19.4 9c0 2.2-1.2 4.7-2.6 6.9L12 9h7.4z" fill="#34A853" />
      <circle cx="12" cy="9" r="3" fill="#FFFFFF" />
    </svg>
  ),
};

export const BRANDS: Record<string, Glyph & { name: string }> = {
  // --- point of sale -------------------------------------------------
  toast: { ...monogram('T', '#FF4C00'), name: 'Toast' },
  square: { ...fromSimpleIcons('square', '#1A1A1A'), name: 'Square' },
  clover: { ...cloverGlyph, name: 'Clover' },
  lightspeed: { ...monogram('L', '#F5333F'), name: 'Lightspeed' },
  shopify: { ...fromSimpleIcons('shopify'), name: 'Shopify POS' },
  aloha: { ...monogram('A', '#00713C'), name: 'NCR Aloha' },

  // --- marketing -----------------------------------------------------
  meta: { ...fromSimpleIcons('meta'), name: 'Meta' },
  googleads: { ...fromSimpleIcons('googleads'), name: 'Google Ads' },
  tiktok: { ...fromSimpleIcons('tiktok', '#111111'), name: 'TikTok' },
  ga4: { ...fromSimpleIcons('googleanalytics'), name: 'Google Analytics' },
  gbp: { ...gbpGlyph, name: 'Business Profile' },
  simplifi: { ...monogram('S', '#0B2C6B'), name: 'Simpli.fi' },
  yelp: { ...fromSimpleIcons('yelp'), name: 'Yelp' },
  // the ghost is brand-yellow, which vanishes on a white pill -- tile it
  snapchat: { ...tiled('snapchat', '#FFFC00', '#111111'), name: 'Snapchat' },
  // simple-icons ships Nextdoor as a wordmark, which turns to mush at 32px
  nextdoor: { ...monogram('N', '#8ED500', '#12240A'), name: 'Nextdoor' },
  klaviyo: { ...monogram('K', '#1F8A5B'), name: 'Klaviyo' },
};

export type BrandKey = keyof typeof BRANDS;

/** One brand glyph, from a dropped-in file if there is one. */
export const BrandGlyph: React.FC<{ brand: string; size?: number }> = ({ brand, size = 34 }) => {
  const file = LOGO_FILES[brand];
  if (file) {
    return (
      <Img src={staticFile(`logos/${file}`)} style={{ width: size, height: size, objectFit: 'contain' }} />
    );
  }
  const b = BRANDS[brand];
  if (!b) return null;
  return <span style={{ width: size, height: size, display: 'block', flexShrink: 0 }}>{b.node}</span>;
};

/** White pill: glyph + name. The reference cut's integration chip. */
export const LogoPill: React.FC<{
  brand: string;
  delay?: number;
  scale?: number;
  checked?: boolean;
  checkDelay?: number;
}> = ({ brand, delay = 0, scale = 1, checked = true, checkDelay = 0 }) => {
  const frame = useCurrentFrame();
  const s = usePunch(delay);
  const check = useEase(checkDelay || delay + 16, 0.45);
  const bob = Math.sin((frame + delay * 3) * 0.03) * 4;
  const b = BRANDS[brand];
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 13 * scale,
        padding: `${13 * scale}px ${24 * scale}px`,
        borderRadius: 99,
        background: V.surface,
        boxShadow: '0 16px 40px rgba(5,8,40,0.28), 0 1px 3px rgba(5,8,40,0.10)',
        opacity: Math.min(1, s * 1.6),
        transform: `translateY(${(1 - s) * 26 + bob}px) scale(${0.86 + s * 0.14})`,
        whiteSpace: 'nowrap',
      }}
    >
      <BrandGlyph brand={brand} size={32 * scale} />
      <span
        style={{
          fontFamily: FONT_HEAD,
          fontSize: 27 * scale,
          fontWeight: 800,
          letterSpacing: -0.4,
          color: V.ink,
        }}
      >
        {b?.name ?? brand}
      </span>
      {checked && (
        <span
          style={{
            position: 'absolute',
            top: -5 * scale,
            right: -3 * scale,
            width: 23 * scale,
            height: 23 * scale,
            borderRadius: 99,
            background: V.green,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${check})`,
            boxShadow: '0 3px 10px rgba(18,201,126,0.5)',
          }}
        >
          <svg viewBox="0 0 24 24" width={13 * scale} height={13 * scale}>
            <path d="M4 12.5l5.2 5.2L20 7" fill="none" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </div>
  );
};

/* ================================================================== *
 * the constellation
 * ================================================================== */

type Node = { brand: string; x: number; y: number };

/**
 * Hub-and-spoke: brand pills around the Vero mark with curves drawing inward.
 * Mirrors the Connections page in the real product, which is already laid out
 * exactly this way -- so the video is showing the actual mental model, not a
 * marketing metaphor.
 *
 * `x`/`y` are percentages of the 1920x1080 frame.
 */
export const Constellation: React.FC<{
  nodes: Node[];
  delay?: number;
  hubDelay?: number;
  pillScale?: number;
  hubSize?: number;
  centerY?: number;
  spoke?: string;
}> = ({
  nodes,
  delay = 0,
  hubDelay = 0,
  pillScale = 1,
  hubSize = 150,
  centerY = 56,
  spoke = 'rgba(255,255,255,0.42)',
}) => {
  const CX = 50;
  const CY = centerY;
  const hub = usePunch(hubDelay);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // spring() is a plain function, not a hook -- safe to call per node inside
  // the map below, which useEase would not be.
  const draw = (delayFrames: number) =>
    spring({ frame: frame - delayFrames, fps, config: { damping: 200, mass: 1.1 } });

  return (
    <>
      {/* spokes, drawn under everything */}
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{ position: 'absolute', inset: 0 }}
      >
        {nodes.map((n, i) => {
          const x1 = (n.x / 100) * 1920;
          const y1 = (n.y / 100) * 1080;
          const x2 = (CX / 100) * 1920;
          const y2 = (CY / 100) * 1080;
          // control point pulled toward the hub's horizontal, which gives the
          // lazy S-curve the reference uses instead of straight radials
          const cx = x1 + (x2 - x1) * 0.62;
          const cy = y1 + (y2 - y1) * 0.08;
          const s = draw(delay + 6 + i * 4);
          const LEN = 900;
          return (
            <path
              key={i}
              d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
              fill="none"
              stroke={spoke}
              strokeWidth="2.4"
              strokeDasharray={LEN}
              strokeDashoffset={LEN * (1 - s)}
            />
          );
        })}
        {/* a pulse of light running each spoke into the hub */}
        {nodes.map((n, i) => {
          const x1 = (n.x / 100) * 1920;
          const y1 = (n.y / 100) * 1080;
          const x2 = (CX / 100) * 1920;
          const y2 = (CY / 100) * 1080;
          const cx = x1 + (x2 - x1) * 0.62;
          const cy = y1 + (y2 - y1) * 0.08;
          const p = ((frame * 0.014 + i * 0.17) % 1);
          return (
            <path
              key={`p${i}`}
              d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
              fill="none"
              stroke={V.green}
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeDasharray="26 874"
              strokeDashoffset={900 - p * 900}
              opacity={0.5}
            />
          );
        })}
      </svg>

      {/* hub */}
      <div
        style={{
          position: 'absolute',
          left: `${CX}%`,
          top: `${CY}%`,
          transform: `translate(-50%,-50%) scale(${0.8 + hub * 0.2})`,
          opacity: Math.min(1, hub * 1.6),
          width: hubSize,
          height: hubSize,
          borderRadius: hubSize * 0.28,
          background: V.surface,
          overflow: 'hidden',
          boxShadow: '0 22px 60px rgba(5,8,40,0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <VeroMark size={hubSize * 0.88} tile={false} />
      </div>

      {/* pills */}
      {nodes.map((n, i) => (
        <div
          key={n.brand}
          style={{
            position: 'absolute',
            left: `${n.x}%`,
            top: `${n.y}%`,
            transform: 'translate(-50%,-50%)',
          }}
        >
          <LogoPill brand={n.brand} delay={delay + i * 4} scale={pillScale} checkDelay={delay + 26 + i * 4} />
        </div>
      ))}
    </>
  );
};
