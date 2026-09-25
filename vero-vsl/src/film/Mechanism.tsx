import React from 'react';
import { useCurrentFrame } from 'remotion';
import { F, FONT, FONT_UI } from './theme';
import { ramp, useReveal } from './Motion';
import { BrandGlyph, VeroMark } from '../fast/Logos';

/**
 * The panels behind the three claims in act 5 -- deterministic reasoning, the
 * no-marketing floor, and forecasting a change. These are the parts that
 * separate Vero from "an AI that reads your dashboard", so each one has to
 * show a mechanism rather than assert a benefit.
 */

const Card: React.FC<{
  children: React.ReactNode;
  delay: number;
  exit?: number;
  width?: number;
  pad?: string;
}> = ({ children, delay, exit, width = 1120, pad = '34px 40px' }) => {
  const st = useReveal(delay, exit);
  return (
    <div
      style={{
        ...st,
        width,
        padding: pad,
        borderRadius: 18,
        background: F.panel,
        border: `1px solid ${F.line}`,
        boxShadow: '0 34px 76px rgba(15,23,41,0.12)',
        textAlign: 'left',
      }}
    >
      {children}
    </div>
  );
};

const Eyebrow: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = F.faint,
}) => (
  <div
    style={{
      fontFamily: FONT_UI,
      fontSize: 15,
      fontWeight: 600,
      letterSpacing: 2.6,
      textTransform: 'uppercase',
      color,
    }}
  >
    {children}
  </div>
);

/* ================================================================== *
 * what we are NOT -- the generic AI summary, struck out
 * ================================================================== */

export const NotThisCard: React.FC<{ delay: number; exit?: number }> = ({ delay, exit }) => {
  const st = useReveal(delay, exit);
  const strike = ramp(useCurrentFrame(), delay + 26, 16);
  return (
    <div
      style={{
        ...st,
        width: 980,
        padding: '30px 36px',
        borderRadius: 18,
        background: F.panelAlt,
        border: `1px dashed ${F.line}`,
        textAlign: 'left',
        position: 'relative',
      }}
    >
      <Eyebrow>a chatbot on top of your dashboards</Eyebrow>
      <div
        style={{
          fontFamily: FONT_UI,
          fontSize: 27,
          color: F.muted,
          lineHeight: 1.5,
          marginTop: 14,
        }}
      >
        “Great news — engagement is up 18% month over month and your top-performing campaign
        was <i>Summer Promo v2</i>. Consider increasing budget to capitalise on momentum.”
      </div>
      {/* the same numbers, restated with more confidence. struck out. */}
      <div
        style={{
          position: 'absolute',
          left: 34,
          right: `${34 + (1 - strike) * 900}px`,
          top: '62%',
          height: 3,
          background: F.red,
          borderRadius: 99,
          opacity: 0.9,
        }}
      />
    </div>
  );
};

/* ================================================================== *
 * 1. deterministic reasoning
 * ================================================================== */

const RunRow: React.FC<{
  n: string;
  when: string;
  answer: string;
  delay: number;
  exit?: number;
  last?: boolean;
}> = ({ n, when, answer, delay, exit, last }) => {
  const st = useReveal(delay, exit);
  return (
    <div
      style={{
        ...st,
        display: 'flex',
        alignItems: 'center',
        gap: 22,
        padding: '15px 0',
        borderBottom: last ? 'none' : `1px solid ${F.lineSoft}`,
      }}
    >
      <span style={{ fontFamily: FONT_UI, fontSize: 18, color: F.faint, width: 90 }}>{n}</span>
      <span style={{ fontFamily: FONT_UI, fontSize: 20, color: F.muted, width: 230 }}>{when}</span>
      <span
        style={{
          fontFamily: FONT,
          fontSize: 32,
          fontWeight: 800,
          letterSpacing: -1,
          color: F.ink,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {answer}
      </span>
      <span style={{ marginLeft: 'auto' }}>
        <Chip tone="green">identical</Chip>
      </span>
    </div>
  );
};

const Chip: React.FC<{ children: React.ReactNode; tone: 'green' | 'grey' | 'brand' | 'amber' }> = ({
  children,
  tone,
}) => {
  const tones = {
    green: [F.greenWash, F.green],
    grey: ['#F0F2F6', '#8A93A0'],
    brand: ['rgba(33,89,176,0.09)', F.brand],
    amber: [F.amberWash, F.amber],
  } as const;
  const [bg, fg] = tones[tone];
  return (
    <span
      style={{
        background: bg,
        color: fg,
        fontFamily: FONT_UI,
        fontSize: 15,
        fontWeight: 600,
        padding: '4px 11px',
        borderRadius: 999,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
};

export const DeterministicPanel: React.FC<{ delay: number; exit?: number }> = ({ delay, exit }) => {
  const q = useReveal(delay + 4, exit);
  const foot = useReveal(delay + 46, exit);
  return (
    <Card delay={delay} exit={exit} width={1180}>
      <div style={{ ...q, marginBottom: 8 }}>
        <Eyebrow>the same question, asked three times</Eyebrow>
        <div style={{ fontFamily: FONT_UI, fontSize: 25, color: F.ink, marginTop: 10 }}>
          “What did geofencing return at Destin last quarter?”
        </div>
      </div>
      <div style={{ marginTop: 16 }}>
        <RunRow n="Run 1" when="Tuesday, 9:14am" answer="$6.85 per $1" delay={delay + 14} exit={exit} />
        <RunRow n="Run 2" when="Thursday, 4:02pm" answer="$6.85 per $1" delay={delay + 22} exit={exit} />
        <RunRow n="Run 3" when="Monday, 8:31am" answer="$6.85 per $1" delay={delay + 30} exit={exit} last />
      </div>
      <div
        style={{
          ...foot,
          marginTop: 22,
          paddingTop: 20,
          borderTop: `1px solid ${F.lineSoft}`,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <span style={{ fontFamily: FONT_UI, fontSize: 21, color: F.muted, flex: 1 }}>
          Every figure traces back to the register rows it came from.
        </span>
        <Chip tone="brand">show the 4,412 rows</Chip>
      </div>
    </Card>
  );
};

/* ================================================================== *
 * 2. the floor -- what happens without marketing
 * ================================================================== */

export const BaselinePanel: React.FC<{ delay: number; exit?: number }> = ({ delay, exit }) => {
  const frame = useCurrentFrame();
  const drawBase = ramp(frame, delay + 10, 26);
  const drawReal = ramp(frame, delay + 30, 26);
  const fill = ramp(frame, delay + 52, 20);
  const foot = useReveal(delay + 58, exit);

  const W = 1020;
  const H = 260;
  // the floor: what the unmarketed locations did, week by week
  const base = [52, 50, 54, 51, 53, 52, 55, 53, 54, 52, 55, 54];
  // what the marketed locations actually did
  const real = [53, 52, 57, 58, 62, 64, 67, 66, 70, 72, 74, 76];
  // a tight domain around the data, with a little headroom -- plotting against
  // an absolute max wastes the bottom half of the chart
  const LO = 44;
  const HI = 80;
  const step = W / (base.length - 1);
  const yOf = (v: number) => H - ((v - LO) / (HI - LO)) * H;
  const line = (arr: number[]) =>
    arr.map((v, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${yOf(v)}`).join(' ');
  const area = `${line(real)} L ${W} ${yOf(base[base.length - 1])} ${base
    .slice()
    .reverse()
    .map((v, i) => `L ${W - i * step} ${yOf(v)}`)
    .join(' ')} Z`;
  const LEN = 1600;

  return (
    <Card delay={delay} exit={exit} width={1180}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 22 }}>
        <Eyebrow>revenue · 12 weeks</Eyebrow>
        <span style={{ marginLeft: 'auto', display: 'flex', gap: 22, alignItems: 'center' }}>
          <Legend color={F.ink} label="Your marketed locations" />
          <Legend color={F.faint} label="The floor — no marketing" dashed />
        </span>
      </div>
      <svg width={W} height={H} style={{ display: 'block', overflow: 'visible' }}>
        <path d={area} fill={F.brand} opacity={0.1 * fill} />
        <path
          d={line(base)}
          fill="none"
          stroke={F.faint}
          strokeWidth="2.6"
          strokeDasharray="8 7"
          strokeLinecap="round"
          opacity={drawBase}
        />
        <path
          d={line(real)}
          fill="none"
          stroke={F.ink}
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={LEN}
          strokeDashoffset={LEN * (1 - drawReal)}
        />
      </svg>
      <div
        style={{
          ...foot,
          marginTop: 24,
          paddingTop: 20,
          borderTop: `1px solid ${F.lineSoft}`,
          display: 'flex',
          alignItems: 'center',
          gap: 18,
        }}
      >
        <span style={{ fontFamily: FONT_UI, fontSize: 21, color: F.muted, flex: 1 }}>
          The floor is built from your own locations that aren’t being marketed — not a model,
          not an industry benchmark.
        </span>
        <span style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={{ fontFamily: FONT_UI, fontSize: 18, color: F.muted }}>the gap</span>
          <span style={{ fontFamily: FONT, fontSize: 40, fontWeight: 800, letterSpacing: -1.3, color: F.green }}>
            +$61K
          </span>
        </span>
      </div>
    </Card>
  );
};

const Legend: React.FC<{ color: string; label: string; dashed?: boolean }> = ({
  color,
  label,
  dashed,
}) => (
  <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
    <svg width={26} height={4}>
      <line
        x1="0"
        y1="2"
        x2="26"
        y2="2"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={dashed ? '6 5' : undefined}
      />
    </svg>
    <span style={{ fontFamily: FONT_UI, fontSize: 18, color: F.muted }}>{label}</span>
  </span>
);

/* ================================================================== *
 * 3. forecast -- what happens if you change something
 * ================================================================== */

export const ForecastPanel: React.FC<{ delay: number; exit?: number }> = ({ delay, exit }) => {
  const frame = useCurrentFrame();
  const move = ramp(frame, delay + 16, 26);
  const drawProj = ramp(frame, delay + 34, 28);
  const foot = useReveal(delay + 56, exit);

  const W = 1020;
  const H = 230;
  const hist = [58, 61, 60, 63, 62, 65, 64];
  const proj = [64, 67, 71, 74, 78, 81];
  const LO = 52;
  const HI = 88;
  const stepX = W / (hist.length + proj.length - 2);
  const yOf = (v: number) => H - ((v - LO) / (HI - LO)) * H;
  const histPath = hist.map((v, i) => `${i === 0 ? 'M' : 'L'} ${i * stepX} ${yOf(v)}`).join(' ');
  const projPath = proj
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${(hist.length - 1 + i) * stepX} ${yOf(v)}`)
    .join(' ');
  // the confidence band widens the further out it projects
  const band = `${proj
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${(hist.length - 1 + i) * stepX} ${yOf(v + i * 1.9)}`)
    .join(' ')} ${proj
    .slice()
    .reverse()
    .map((v, i) => {
      const idx = proj.length - 1 - i;
      return `L ${(hist.length - 1 + idx) * stepX} ${yOf(v - idx * 1.9)}`;
    })
    .join(' ')} Z`;
  const LEN = 1400;

  return (
    <Card delay={delay} exit={exit} width={1180}>
      <div style={{ marginBottom: 20 }}>
        <Eyebrow>if you make this change</Eyebrow>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 26 }}>
        <BrandGlyph brand="meta" size={30} />
        <span style={{ fontFamily: FONT_UI, fontSize: 23, color: F.muted }}>Meta</span>
        <div style={{ flex: 1, height: 10, borderRadius: 99, background: '#F0F2F6', position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: `${48 - move * 16}%`,
              borderRadius: 99,
              background: '#C6CCD6',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: `${32 + move * 16}%`,
              borderRadius: 99,
              background: F.brand,
            }}
          />
        </div>
        <span style={{ fontFamily: FONT_UI, fontSize: 23, color: F.muted }}>Geofencing</span>
        <span
          style={{
            fontFamily: FONT,
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: -0.9,
            color: F.brand,
            width: 200,
            textAlign: 'right',
            whiteSpace: 'nowrap',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          move ${Math.round(move * 18)}K
        </span>
      </div>
      <svg width={W} height={H} style={{ display: 'block', overflow: 'visible' }}>
        <path d={band} fill={F.brand} opacity={0.12 * drawProj} />
        <path d={histPath} fill="none" stroke={F.ink} strokeWidth="3.2" strokeLinecap="round" />
        <path
          d={projPath}
          fill="none"
          stroke={F.brand}
          strokeWidth="3.2"
          strokeDasharray={LEN}
          strokeDashoffset={LEN * (1 - drawProj)}
          strokeLinecap="round"
        />
        <line x1={(hist.length - 1) * stepX} y1="0" x2={(hist.length - 1) * stepX} y2={H} stroke={F.line} strokeWidth="1.5" strokeDasharray="5 5" />
      </svg>
      <div
        style={{
          ...foot,
          marginTop: 24,
          paddingTop: 20,
          borderTop: `1px solid ${F.lineSoft}`,
          display: 'flex',
          alignItems: 'center',
          gap: 18,
        }}
      >
        <span style={{ fontFamily: FONT_UI, fontSize: 21, color: F.ink, flex: 1 }}>
          Projected: <b style={{ color: F.green }}>+$14,800</b> a month at the register, six weeks
          to read.
        </span>
        <Chip tone="amber">range: $9.2K – $20.4K</Chip>
      </div>
    </Card>
  );
};

/* ================================================================== *
 * attribution -- where they came from, and what they came for
 * ================================================================== */

const SOURCES: [string, number, string][] = [
  ['Geofencing', 34, F.brand],
  ['Walk-by / local', 26, '#9AA3AE'],
  ['Meta', 22, '#5B8FD4'],
  ['Google Search', 18, '#8FB4E0'],
];

const PRODUCTS: [string, string, string][] = [
  ['Family bundles', '$41,200', '+18%'],
  ['Catering orders', '$28,600', '+31%'],
  ['Lunch combos', '$19,400', '−4%'],
  ['Weekend brunch', '$14,900', '+9%'],
];

export const AttributionPanel: React.FC<{ delay: number; exit?: number }> = ({ delay, exit }) => {
  const frame = useCurrentFrame();
  const grow = ramp(frame, delay + 12, 26);
  const left = useReveal(delay + 6, exit);
  const right = useReveal(delay + 22, exit);
  return (
    <Card delay={delay} exit={exit} width={1320} pad="36px 44px">
      <div style={{ display: 'flex', gap: 56 }}>
        <div style={{ ...left, flex: 1 }}>
          <Eyebrow color={F.brand}>where they came from</Eyebrow>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 22 }}>
            {SOURCES.map(([name, pct, color], i) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontFamily: FONT_UI, fontSize: 20, color: F.ink, width: 160 }}>{name}</span>
                <div style={{ flex: 1, height: 14, borderRadius: 99, background: '#F0F2F6' }}>
                  <div
                    style={{
                      width: `${(pct / 36) * 100 * grow}%`,
                      height: '100%',
                      borderRadius: 99,
                      background: color,
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: FONT_UI,
                    fontSize: 20,
                    fontWeight: 600,
                    color: F.ink,
                    width: 58,
                    textAlign: 'right',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {pct}%
                </span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ width: 1, background: F.lineSoft }} />
        <div style={{ ...right, flex: 1 }}>
          <Eyebrow color={F.brand}>and what they came for</Eyebrow>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 16 }}>
            {PRODUCTS.map(([name, money, delta], i) => (
              <div
                key={name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '13px 0',
                  borderBottom: i === PRODUCTS.length - 1 ? 'none' : `1px solid ${F.lineSoft}`,
                }}
              >
                <span style={{ fontFamily: FONT_UI, fontSize: 20, color: F.ink, flex: 1 }}>{name}</span>
                <span
                  style={{
                    fontFamily: FONT_UI,
                    fontSize: 20,
                    fontWeight: 600,
                    color: F.ink,
                    width: 100,
                    textAlign: 'right',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {money}
                </span>
                <span
                  style={{
                    fontFamily: FONT_UI,
                    fontSize: 18,
                    fontWeight: 600,
                    color: delta.startsWith('−') ? F.red : F.green,
                    width: 68,
                    textAlign: 'right',
                  }}
                >
                  {delta}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

/* ================================================================== *
 * outcomes
 * ================================================================== */

export const OutcomeCard: React.FC<{
  n: string;
  title: string;
  body: string;
  delay: number;
  exit?: number;
}> = ({ n, title, body, delay, exit }) => {
  const st = useReveal(delay, exit);
  return (
    <div
      style={{
        ...st,
        flex: 1,
        padding: '36px 34px',
        borderRadius: 18,
        background: F.panel,
        border: `1px solid ${F.line}`,
        boxShadow: '0 26px 60px rgba(15,23,41,0.09)',
        textAlign: 'left',
      }}
    >
      <div
        style={{
          fontFamily: FONT_UI,
          fontSize: 17,
          fontWeight: 700,
          letterSpacing: 3.4,
          color: F.brand,
          marginBottom: 20,
        }}
      >
        {n}
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontSize: 44,
          fontWeight: 800,
          letterSpacing: -1.5,
          lineHeight: 1.16,
          color: F.ink,
        }}
      >
        {title}
      </div>
      <div style={{ fontFamily: FONT_UI, fontSize: 21, color: F.muted, lineHeight: 1.5, marginTop: 16 }}>
        {body}
      </div>
    </div>
  );
};
