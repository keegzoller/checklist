import React from 'react';
import { useCurrentFrame } from 'remotion';
import { F, FONT, FONT_UI } from './theme';
import { ramp, useReveal } from './Motion';
import { BrandGlyph, VeroMark } from '../fast/Logos';

/**
 * Designed Vero surfaces, for the moments the screen recording never captured.
 * They sit in the same cut as three real screenshots, so they are built from
 * the product's own light palette and spacing -- white card, #E7EBF0 hairlines,
 * Inter, letter-spaced grey eyebrows, tabular figures. If one of these ever
 * reads as a different app, that is the bug.
 */

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

const Pill: React.FC<{ children: React.ReactNode; tone: 'green' | 'grey' | 'red' | 'amber' | 'brand' }> = ({
  children,
  tone,
}) => {
  const tones = {
    green: [F.greenWash, F.green],
    grey: ['#F0F2F6', '#8A93A0'],
    red: [F.redWash, F.red],
    amber: [F.amberWash, F.amber],
    brand: ['rgba(33,89,176,0.09)', F.brand],
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

/* ================================================================== *
 * the room: three reports, all of them positive
 * ================================================================== */

export const ReportCard: React.FC<{
  brand?: string;
  name: string;
  claim: string;
  detail: string;
  delay: number;
  exit?: number;
  rotate?: number;
}> = ({ brand, name, claim, detail, delay, exit, rotate = 0 }) => {
  const st = useReveal(delay, exit);
  return (
    <div
      style={{
        ...st,
        width: 540,
        padding: '32px 36px',
        borderRadius: 18,
        background: F.panel,
        border: `1px solid ${F.line}`,
        boxShadow: '0 24px 56px rgba(15,23,41,0.11)',
        transform: `${st.transform} rotate(${rotate}deg)`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 20 }}>
        {brand ? (
          <BrandGlyph brand={brand} size={26} />
        ) : (
          <span
            style={{
              width: 26,
              height: 26,
              borderRadius: 7,
              background: '#E9EDF3',
              display: 'inline-block',
            }}
          />
        )}
        <span style={{ fontFamily: FONT_UI, fontSize: 19, fontWeight: 600, color: F.ink }}>{name}</span>
        <span style={{ marginLeft: 'auto' }}>
          <Pill tone="green">reported</Pill>
        </span>
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontSize: 54,
          fontWeight: 800,
          letterSpacing: -1.7,
          color: F.green,
          lineHeight: 1.1,
        }}
      >
        {claim}
      </div>
      <div style={{ fontFamily: FONT_UI, fontSize: 18, color: F.muted, marginTop: 8 }}>{detail}</div>
    </div>
  );
};

/* ================================================================== *
 * one sale, two platforms claiming it
 * ================================================================== */

export const DoubleCount: React.FC<{ delay: number; exit?: number }> = ({ delay, exit }) => {
  const st = useReveal(delay, exit);
  const meta = useReveal(delay + 10, exit);
  const goog = useReveal(delay + 16, exit);
  return (
    <div
      style={{
        ...st,
        width: 800,
        padding: '36px 40px',
        borderRadius: 18,
        background: F.panel,
        border: `1px solid ${F.line}`,
        boxShadow: '0 30px 70px rgba(15,23,41,0.12)',
        textAlign: 'left',
      }}
    >
      <Eyebrow>one order · south tampa · 6:41 pm</Eyebrow>
      <div
        style={{
          fontFamily: FONT,
          fontSize: 56,
          fontWeight: 800,
          letterSpacing: -1.8,
          color: F.ink,
          margin: '10px 0 22px',
        }}
      >
        $84.20
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ ...meta, display: 'flex', alignItems: 'center', gap: 13 }}>
          <BrandGlyph brand="meta" size={26} />
          <span style={{ fontFamily: FONT_UI, fontSize: 21, color: F.ink, flex: 1 }}>
            Meta claimed this sale
          </span>
          <Pill tone="amber">1 of 1</Pill>
        </div>
        <div style={{ ...goog, display: 'flex', alignItems: 'center', gap: 13 }}>
          <BrandGlyph brand="googleads" size={26} />
          <span style={{ fontFamily: FONT_UI, fontSize: 21, color: F.ink, flex: 1 }}>
            Google Ads claimed this sale
          </span>
          <Pill tone="amber">1 of 1</Pill>
        </div>
      </div>
    </div>
  );
};

/* ================================================================== *
 * the method: marketed vs comparable unmarketed
 * ================================================================== */

const BAR_W = 250;

const MethodBar: React.FC<{
  label: string;
  value: number;
  max: number;
  color: string;
  delay: number;
  exit?: number;
  money: string;
}> = ({ label, value, max, color, delay, exit, money }) => {
  const frame = useCurrentFrame();
  const grow = ramp(frame, delay, 22);
  const st = useReveal(delay, exit);
  return (
    <div style={{ ...st, display: 'flex', alignItems: 'center', gap: 16 }}>
      <span
        style={{
          fontFamily: FONT_UI,
          fontSize: 18,
          color: F.muted,
          width: 126,
          textAlign: 'right',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
      <div style={{ width: BAR_W, height: 14, borderRadius: 99, background: '#F0F2F6' }}>
        <div
          style={{
            width: `${(value / max) * 100 * grow}%`,
            height: '100%',
            borderRadius: 99,
            background: color,
          }}
        />
      </div>
      <span
        style={{
          fontFamily: FONT_UI,
          fontSize: 18,
          fontWeight: 600,
          color: F.ink,
          fontVariantNumeric: 'tabular-nums',
          width: 74,
          textAlign: 'right',
        }}
      >
        {money}
      </span>
    </div>
  );
};

export const MethodPanel: React.FC<{ delay: number; exit?: number }> = ({ delay, exit }) => {
  const st = useReveal(delay, exit);
  const gap = useReveal(delay + 40, exit);
  return (
    <div
      style={{
        ...st,
        width: 1340,
        padding: '42px 48px',
        borderRadius: 18,
        background: F.panel,
        border: `1px solid ${F.line}`,
        boxShadow: '0 34px 76px rgba(15,23,41,0.12)',
        textAlign: 'left',
      }}
    >
      <div style={{ display: 'flex', gap: 54 }}>
        <div style={{ flex: 1 }}>
          <Eyebrow color={F.brand}>marketed · 12 locations</Eyebrow>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 17, marginTop: 20 }}>
            <MethodBar label="South Tampa" value={455} max={470} color={F.brand} delay={delay + 8} exit={exit} money="$455K" />
            <MethodBar label="Brandon" value={430} max={470} color={F.brand} delay={delay + 12} exit={exit} money="$430K" />
            <MethodBar label="Clearwater" value={441} max={470} color={F.brand} delay={delay + 16} exit={exit} money="$441K" />
          </div>
        </div>
        <div style={{ width: 1, background: F.lineSoft }} />
        <div style={{ flex: 1 }}>
          <Eyebrow>not marketed · 4 locations</Eyebrow>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 17, marginTop: 20 }}>
            <MethodBar label="Ocala" value={388} max={470} color="#C6CCD6" delay={delay + 10} exit={exit} money="$388K" />
            <MethodBar label="Palatka" value={371} max={470} color="#C6CCD6" delay={delay + 14} exit={exit} money="$371K" />
            <MethodBar label="Lake City" value={379} max={470} color="#C6CCD6" delay={delay + 18} exit={exit} money="$379K" />
          </div>
        </div>
      </div>
      <div
        style={{
          ...gap,
          marginTop: 26,
          paddingTop: 22,
          borderTop: `1px solid ${F.lineSoft}`,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <span style={{ fontFamily: FONT_UI, fontSize: 19, color: F.muted }}>
          Same brand. Same menu. Same weather. Same economy.
        </span>
        <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={{ fontFamily: FONT_UI, fontSize: 17, color: F.muted }}>the gap</span>
          <span
            style={{
              fontFamily: FONT,
              fontSize: 40,
              fontWeight: 800,
              letterSpacing: -1.2,
              color: F.green,
            }}
          >
            +$61K
          </span>
        </span>
      </div>
    </div>
  );
};

/* ================================================================== *
 * the refusal -- the one screen no competitor will show
 * ================================================================== */

type Row = {
  name: string;
  lift: string;
  readable: boolean;
  note: string;
};

const REFUSE_ROWS: Row[] = [
  { name: 'Destin', lift: '+8.4%', readable: false, note: 'Not readable · below this brand’s noise floor' },
  { name: 'Schenectady', lift: '+8.2%', readable: true, note: 'Measured · 94% confidence' },
  { name: 'Clearwater', lift: '+5.1%', readable: false, note: 'Not readable · needs 3 more weeks' },
  { name: 'West Palm Beach', lift: '+11.6%', readable: true, note: 'Measured · 97% confidence' },
];

export const RefusePanel: React.FC<{ delay: number; exit?: number }> = ({ delay, exit }) => {
  const st = useReveal(delay, exit);
  const foot = useReveal(delay + 34, exit);
  return (
    <div
      style={{
        ...st,
        width: 1300,
        padding: '36px 44px 32px',
        borderRadius: 18,
        background: F.panel,
        border: `1px solid ${F.line}`,
        boxShadow: '0 34px 76px rgba(15,23,41,0.13)',
        textAlign: 'left',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
        <Eyebrow>measured lift · last 26 weeks</Eyebrow>
        <span style={{ marginLeft: 'auto' }}>
          <Pill tone="brand">noise floor ±7.9%</Pill>
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {REFUSE_ROWS.map((r, i) => (
          <RefuseRow key={r.name} row={r} delay={delay + 12 + i * 6} exit={exit} last={i === REFUSE_ROWS.length - 1} />
        ))}
      </div>
      <div
        style={{
          ...foot,
          marginTop: 18,
          paddingTop: 18,
          borderTop: `1px solid ${F.lineSoft}`,
          fontFamily: FONT_UI,
          fontSize: 18,
          color: F.muted,
        }}
      >
        The floor is derived from this brand’s own unmarketed locations — not a setting.
      </div>
    </div>
  );
};

const RefuseRow: React.FC<{ row: Row; delay: number; exit?: number; last: boolean }> = ({
  row,
  delay,
  exit,
  last,
}) => {
  const st = useReveal(delay, exit);
  return (
    <div
      style={{
        ...st,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        padding: '15px 0',
        borderBottom: last ? 'none' : `1px solid ${F.lineSoft}`,
        // a refused row is visibly held back, not hidden
        opacity: (st.opacity as number) * (row.readable ? 1 : 0.55),
      }}
    >
      <span style={{ fontFamily: FONT_UI, fontSize: 21, fontWeight: 500, color: F.ink, width: 250 }}>
        {row.name}
      </span>
      <span
        style={{
          fontFamily: FONT,
          fontSize: 34,
          fontWeight: 800,
          letterSpacing: -1,
          width: 130,
          color: row.readable ? F.green : F.faint,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {row.lift}
      </span>
      <span
        style={{
          fontFamily: FONT_UI,
          fontSize: 18,
          color: row.readable ? F.muted : F.faint,
          flex: 1,
        }}
      >
        {row.note}
      </span>
      <Pill tone={row.readable ? 'green' : 'grey'}>{row.readable ? 'reported' : 'withheld'}</Pill>
    </div>
  );
};

/* ================================================================== *
 * the answer -- a thought partner that argues back
 * ================================================================== */

export const AnswerPanel: React.FC<{ delay: number; exit?: number }> = ({ delay, exit }) => {
  const st = useReveal(delay, exit);
  const ask = useReveal(delay + 2, exit);
  const ans = useReveal(delay + 11, exit);
  return (
    <div
      style={{
        ...st,
        width: 880,
        padding: '30px 34px',
        borderRadius: 18,
        background: F.panel,
        border: `1px solid ${F.line}`,
        boxShadow: '0 34px 76px rgba(15,23,41,0.12)',
        textAlign: 'left',
      }}
    >
      <div style={{ ...ask }}>
        <Eyebrow>you asked</Eyebrow>
        <div style={{ fontFamily: FONT_UI, fontSize: 25, color: F.ink, marginTop: 8 }}>
          “Destin is declining. Cut the budget there, right?”
        </div>
      </div>
      <div
        style={{
          ...ans,
          marginTop: 22,
          paddingTop: 22,
          borderTop: `1px solid ${F.lineSoft}`,
          display: 'flex',
          gap: 16,
        }}
      >
        <VeroMark size={38} tile={false} />
        <div style={{ fontFamily: FONT_UI, fontSize: 23, color: F.ink, lineHeight: 1.5 }}>
          Destin is the <b>strongest location you have</b>. Revenue is down 4% chain-wide this
          quarter; Destin is down 1%. Against its unmarketed comparables it is{' '}
          <b style={{ color: F.green }}>+9.1%</b>. The budget is not the problem.
        </div>
      </div>
    </div>
  );
};

/* ================================================================== *
 * validation stats
 * ================================================================== */

export const ProofStat: React.FC<{
  value: React.ReactNode;
  label: string;
  delay: number;
  exit?: number;
}> = ({ value, label, delay, exit }) => {
  const st = useReveal(delay, exit);
  return (
    <div style={{ ...st, flex: 1, textAlign: 'left' }}>
      <div
        style={{
          fontFamily: FONT,
          fontSize: 104,
          fontWeight: 800,
          letterSpacing: -3.4,
          color: F.ink,
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: FONT_UI,
          fontSize: 20,
          color: F.muted,
          marginTop: 16,
          lineHeight: 1.45,
          maxWidth: 340,
        }}
      >
        {label}
      </div>
    </div>
  );
};
