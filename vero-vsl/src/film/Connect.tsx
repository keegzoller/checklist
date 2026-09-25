import React from 'react';
import { useCurrentFrame } from 'remotion';
import { F, FONT, FONT_UI } from './theme';
import { ramp, useReveal } from './Motion';
import { BrandGlyph, VeroMark } from '../fast/Logos';

/**
 * The connection beats: point of sale, then every marketing channel.
 *
 * The poster cut drew these as a hub-and-spoke constellation on a saturated
 * stage. That does not belong here -- in a near-white film the same idea reads
 * better as a calm grid of tiles that check in one by one and feed a single
 * line down into the Vero mark. Restraint is the whole register of this cut.
 */

export type Tile = { brand: string; label: string };

export const POS_TILES: Tile[] = [
  { brand: 'toast', label: 'Toast' },
  { brand: 'square', label: 'Square' },
  { brand: 'clover', label: 'Clover' },
  { brand: 'lightspeed', label: 'Lightspeed' },
  { brand: 'shopify', label: 'Shopify POS' },
  { brand: 'aloha', label: 'NCR Aloha' },
];

export const CHANNEL_TILES: Tile[] = [
  { brand: 'meta', label: 'Meta' },
  { brand: 'googleads', label: 'Google Ads' },
  { brand: 'tiktok', label: 'TikTok' },
  { brand: 'ga4', label: 'Analytics' },
  { brand: 'gbp', label: 'Business Profile' },
  { brand: 'simplifi', label: 'Simpli.fi' },
  { brand: 'yelp', label: 'Yelp' },
  { brand: 'snapchat', label: 'Snapchat' },
  { brand: 'nextdoor', label: 'Nextdoor' },
  { brand: 'klaviyo', label: 'Klaviyo' },
];

const LogoTile: React.FC<{ tile: Tile; delay: number; exit?: number; w: number }> = ({
  tile,
  delay,
  exit,
  w,
}) => {
  const st = useReveal(delay, exit);
  const check = useReveal(delay + 14, exit);
  return (
    <div
      style={{
        ...st,
        width: w,
        padding: '20px 18px',
        borderRadius: 16,
        background: F.panel,
        border: `1px solid ${F.line}`,
        boxShadow: '0 14px 34px rgba(15,23,41,0.07)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        position: 'relative',
      }}
    >
      <BrandGlyph brand={tile.brand} size={42} />
      <span
        style={{
          fontFamily: FONT_UI,
          fontSize: 17,
          fontWeight: 600,
          color: F.ink,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '100%',
        }}
      >
        {tile.label}
      </span>
      <span
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          width: 20,
          height: 20,
          borderRadius: 99,
          background: F.greenWash,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: check.opacity,
          transform: `scale(${0.7 + (check.opacity as number) * 0.3})`,
        }}
      >
        <svg viewBox="0 0 24 24" width={11} height={11}>
          <path
            d="M4 12.5l5.2 5.2L20 7"
            fill="none"
            stroke={F.green}
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
};

/**
 * A grid of source tiles above the Vero mark, with a hairline from each tile
 * down into it. `cols` sets the wrap; the rail is drawn to fit whatever grid
 * the tiles end up in.
 */
export const ConnectGrid: React.FC<{
  tiles: Tile[];
  delay: number;
  exit?: number;
  cols: number;
  tileW?: number;
  gap?: number;
}> = ({ tiles, delay, exit, cols, tileW = 186, gap = 18 }) => {
  const frame = useCurrentFrame();
  const rows = Math.ceil(tiles.length / cols);
  const gridW = cols * tileW + (cols - 1) * gap;
  const railTop = 28;
  const railH = 92;
  const hub = useReveal(delay + tiles.length * 4 + 6, exit);
  const draw = ramp(frame, delay + tiles.length * 4, 22);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, ${tileW}px)`,
          gap,
          justifyContent: 'center',
        }}
      >
        {tiles.map((t, i) => (
          <LogoTile key={t.brand} tile={t} delay={delay + i * 4} exit={exit} w={tileW} />
        ))}
      </div>

      {/* one hairline per column, collapsing into the mark */}
      <svg width={gridW} height={railH + railTop} style={{ display: 'block', overflow: 'visible' }}>
        {new Array(cols).fill(0).map((_, c) => {
          const x = c * (tileW + gap) + tileW / 2;
          const mid = gridW / 2;
          const d = `M ${x} 0 L ${x} ${railTop} Q ${x} ${railTop + 34} ${mid} ${railTop + 44} L ${mid} ${railH + railTop}`;
          const LEN = 420;
          return (
            <path
              key={c}
              d={d}
              fill="none"
              stroke={F.line}
              strokeWidth="1.6"
              strokeDasharray={LEN}
              strokeDashoffset={LEN * (1 - draw)}
            />
          );
        })}
      </svg>

      <div
        style={{
          ...hub,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '16px 28px 16px 20px',
          borderRadius: 999,
          background: F.panel,
          border: `1px solid ${F.line}`,
          boxShadow: '0 20px 48px rgba(15,23,41,0.10)',
          marginTop: -6,
        }}
      >
        <VeroMark size={44} tile={false} />
        <span
          style={{
            fontFamily: FONT,
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: -0.9,
            color: F.ink,
          }}
        >
          Vero
        </span>
        <span style={{ width: 1, height: 26, background: F.line }} />
        <span style={{ fontFamily: FONT_UI, fontSize: 20, color: F.muted }}>
          reconciled before anything is measured
        </span>
      </div>
    </div>
  );
};
