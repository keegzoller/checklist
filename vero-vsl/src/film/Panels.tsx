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

/* ================================================================== *
 * act 2 -- marketing is the last big expense nobody can check
 * ================================================================== */

const EXPENSES: { name: string; known: string; ok: boolean }[] = [
  { name: 'Rent', known: 'You know exactly what it buys.', ok: true },
  { name: 'Food cost', known: 'You know it to the percentage point.', ok: true },
  { name: 'A bad hire', known: 'You know inside a month.', ok: true },
  { name: 'Marketing', known: 'Good and bad look identical on the report.', ok: false },
];

export const ExpenseCheck: React.FC<{ delay: number; exit?: number }> = ({ delay, exit }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 1080 }}>
    {EXPENSES.map((e, i) => (
      <ExpenseRow key={e.name} e={e} delay={delay + i * 11} exit={exit} />
    ))}
  </div>
);

const ExpenseRow: React.FC<{
  e: { name: string; known: string; ok: boolean };
  delay: number;
  exit?: number;
}> = ({ e, delay, exit }) => {
  const st = useReveal(delay, exit);
  return (
    <div
      style={{
        ...st,
        display: 'flex',
        alignItems: 'center',
        gap: 26,
        padding: '20px 0',
        borderBottom: `1px solid ${F.lineSoft}`,
      }}
    >
      <span
        style={{
          fontFamily: FONT,
          fontSize: 44,
          fontWeight: 800,
          letterSpacing: -1.4,
          color: e.ok ? F.ink : F.brand,
          width: 300,
        }}
      >
        {e.name}
      </span>
      <span style={{ fontFamily: FONT_UI, fontSize: 25, color: F.muted, flex: 1 }}>{e.known}</span>
      {e.ok ? (
        <Tick />
      ) : (
        <span
          style={{
            fontFamily: FONT,
            fontSize: 40,
            fontWeight: 800,
            color: F.brand,
            width: 36,
            textAlign: 'center',
          }}
        >
          ?
        </span>
      )}
    </div>
  );
};

const Tick: React.FC = () => (
  <span
    style={{
      width: 36,
      height: 36,
      borderRadius: 99,
      background: F.greenWash,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <svg viewBox="0 0 24 24" width={19} height={19}>
      <path
        d="M4 12.5l5.2 5.2L20 7"
        fill="none"
        stroke={F.green}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

/* ================================================================== *
 * act 4 -- the four things an owner actually gets
 * ================================================================== */

/** Shared shell so the four value panels read as one product. */
const ValuePanel: React.FC<{
  children: React.ReactNode;
  delay: number;
  exit?: number;
  width?: number;
  eyebrow: string;
}> = ({ children, delay, exit, width = 980, eyebrow }) => {
  const st = useReveal(delay, exit);
  return (
    <div
      style={{
        ...st,
        width,
        padding: '34px 40px',
        borderRadius: 18,
        background: F.panel,
        border: `1px solid ${F.line}`,
        boxShadow: '0 34px 76px rgba(15,23,41,0.12)',
        textAlign: 'left',
      }}
    >
      <div style={{ marginBottom: 22 }}>
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      {children}
    </div>
  );
};

/** 1. Which locations it is working at -- and what that is worth. */
export const LocationValue: React.FC<{ delay: number; exit?: number }> = ({ delay, exit }) => {
  const rows: [string, string, boolean][] = [
    ['West Palm Beach', '+$2,600 / wk', true],
    ['Destin', '+$2,100 / wk', true],
    ['Clearwater', '+$1,900 / wk', true],
    ['Sarasota', '+$900 / wk', true],
    ['Brandon', 'genuinely down', false],
  ];
  const head = useReveal(delay + 6, exit);
  return (
    <ValuePanel delay={delay} exit={exit} eyebrow="marketing is working at">
      <div style={{ ...head, display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 26 }}>
        <span style={{ fontFamily: FONT, fontSize: 62, fontWeight: 800, letterSpacing: -2.2, color: F.ink }}>
          4 of 12
        </span>
        <span style={{ fontFamily: FONT_UI, fontSize: 25, color: F.muted }}>locations · worth about</span>
        <span style={{ fontFamily: FONT, fontSize: 62, fontWeight: 800, letterSpacing: -2.2, color: F.green }}>
          $7,500
        </span>
        <span style={{ fontFamily: FONT_UI, fontSize: 25, color: F.muted }}>a week</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {rows.map(([name, val, good], i) => (
          <ValueRow key={name} name={name} val={val} good={good} delay={delay + 14 + i * 5} exit={exit} last={i === rows.length - 1} />
        ))}
      </div>
    </ValuePanel>
  );
};

const ValueRow: React.FC<{
  name: string;
  val: string;
  good: boolean;
  delay: number;
  exit?: number;
  last: boolean;
}> = ({ name, val, good, delay, exit, last }) => {
  const st = useReveal(delay, exit);
  return (
    <div
      style={{
        ...st,
        display: 'flex',
        alignItems: 'center',
        padding: '13px 0',
        borderBottom: last ? 'none' : `1px solid ${F.lineSoft}`,
      }}
    >
      <span style={{ fontFamily: FONT_UI, fontSize: 23, color: F.ink, flex: 1 }}>{name}</span>
      <span
        style={{
          fontFamily: FONT_UI,
          fontSize: 23,
          fontWeight: 600,
          color: good ? F.green : F.muted,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {val}
      </span>
    </div>
  );
};

/** 2. Where the next dollar should go. */
export const NextDollar: React.FC<{ delay: number; exit?: number }> = ({ delay, exit }) => {
  const rows: [string, number, string, string][] = [
    ['Geofencing', 6.85, '$6.85', '32% of budget'],
    ['Meta', 2.9, '$2.90', '48% of budget'],
    ['Google Search', 2.15, '$2.15', '14% of budget'],
  ];
  const foot = useReveal(delay + 30, exit);
  return (
    <ValuePanel delay={delay} exit={exit} eyebrow="returned at the register, per $1 spent">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {rows.map(([name, v, label, share], i) => (
          <ReturnBar
            key={name}
            name={name}
            value={v}
            label={label}
            share={share}
            top={i === 0}
            delay={delay + 10 + i * 6}
            exit={exit}
          />
        ))}
      </div>
      <div
        style={{
          ...foot,
          marginTop: 26,
          paddingTop: 22,
          borderTop: `1px solid ${F.lineSoft}`,
          fontFamily: FONT_UI,
          fontSize: 24,
          color: F.ink,
        }}
      >
        Geofencing is returning more than twice what Meta is, on a third of the budget.{' '}
        <b style={{ color: F.brand }}>Move the money the other way.</b>
      </div>
    </ValuePanel>
  );
};

const ReturnBar: React.FC<{
  name: string;
  value: number;
  label: string;
  share: string;
  top: boolean;
  delay: number;
  exit?: number;
}> = ({ name, value, label, share, top, delay, exit }) => {
  const frame = useCurrentFrame();
  const grow = ramp(frame, delay, 24);
  const st = useReveal(delay, exit);
  return (
    <div style={{ ...st, display: 'flex', alignItems: 'center', gap: 20 }}>
      <span style={{ fontFamily: FONT_UI, fontSize: 23, color: F.ink, width: 200 }}>{name}</span>
      <div style={{ flex: 1, height: 18, borderRadius: 99, background: '#F0F2F6' }}>
        <div
          style={{
            width: `${(value / 7.4) * 100 * grow}%`,
            height: '100%',
            borderRadius: 99,
            background: top ? F.green : '#C6CCD6',
          }}
        />
      </div>
      <span
        style={{
          fontFamily: FONT,
          fontSize: 34,
          fontWeight: 800,
          letterSpacing: -1,
          color: top ? F.green : F.muted,
          width: 96,
          textAlign: 'right',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {label}
      </span>
      <span style={{ fontFamily: FONT_UI, fontSize: 19, color: F.faint, width: 130, textAlign: 'right' }}>
        {share}
      </span>
    </div>
  );
};

/** 3. Money that is leaking, the week it starts. */
export const LeakPanel: React.FC<{ delay: number; exit?: number }> = ({ delay, exit }) => {
  const frame = useCurrentFrame();
  const draw = ramp(frame, delay + 10, 30);
  const foot = useReveal(delay + 26, exit);
  // clicks holding steady, then falling off a cliff on the 4th
  const pts = [46, 41, 48, 44, 50, 45, 47, 43, 49, 46, 14, 12, 15, 11, 13, 12];
  const W = 880;
  const H = 150;
  const step = W / (pts.length - 1);
  const path = pts
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${H - (v / 55) * H}`)
    .join(' ');
  const LEN = 1400;
  return (
    <ValuePanel delay={delay} exit={exit} eyebrow="google search · schenectady" width={1000}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 26 }}>
        <span style={{ fontFamily: FONT, fontSize: 50, fontWeight: 800, letterSpacing: -1.8, color: F.ink }}>
          Stopped delivering
        </span>
        <span style={{ fontFamily: FONT, fontSize: 50, fontWeight: 800, letterSpacing: -1.8, color: F.red }}>
          May 4
        </span>
      </div>
      <svg width={W} height={H} style={{ overflow: 'visible', display: 'block' }}>
        <line x1="0" y1={H} x2={W} y2={H} stroke={F.lineSoft} strokeWidth="1" />
        <path
          d={path}
          fill="none"
          stroke={F.red}
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={LEN}
          strokeDashoffset={LEN * (1 - draw)}
        />
      </svg>
      <div style={{ ...foot, display: 'flex', gap: 40, marginTop: 28, alignItems: 'flex-end' }}>
        <LeakStat value="−70%" label="clicks" tone="red" />
        <LeakStat value="unchanged" label="spend going out" tone="ink" />
        <LeakStat value="$3,200" label="burned since" tone="red" />
        <span style={{ marginLeft: 'auto', fontFamily: FONT_UI, fontSize: 22, color: F.muted, maxWidth: 300 }}>
          Nobody noticed. Vero flagged it that week.
        </span>
      </div>
    </ValuePanel>
  );
};

const LeakStat: React.FC<{ value: string; label: string; tone: 'red' | 'ink' }> = ({
  value,
  label,
  tone,
}) => (
  <div>
    <div
      style={{
        fontFamily: FONT,
        fontSize: 40,
        fontWeight: 800,
        letterSpacing: -1.3,
        color: tone === 'red' ? F.red : F.ink,
        lineHeight: 1.1,
      }}
    >
      {value}
    </div>
    <div style={{ fontFamily: FONT_UI, fontSize: 19, color: F.muted, marginTop: 4 }}>{label}</div>
  </div>
);

/* ================================================================== *
 * what it sounds like -- the exchanges
 * ================================================================== */

export const Exchange: React.FC<{
  q: string;
  a: React.ReactNode;
  delay: number;
  exit?: number;
  width?: number;
}> = ({ q, a, delay, exit, width = 1020 }) => {
  const st = useReveal(delay, exit);
  const ans = useReveal(delay + 9, exit);
  return (
    <div
      style={{
        ...st,
        width,
        padding: '28px 34px',
        borderRadius: 18,
        background: F.panel,
        border: `1px solid ${F.line}`,
        boxShadow: '0 30px 68px rgba(15,23,41,0.11)',
        textAlign: 'left',
      }}
    >
      <div style={{ fontFamily: FONT_UI, fontSize: 26, fontWeight: 600, color: F.ink }}>{q}</div>
      <div
        style={{
          ...ans,
          marginTop: 20,
          paddingTop: 20,
          borderTop: `1px solid ${F.lineSoft}`,
          display: 'flex',
          gap: 16,
        }}
      >
        <VeroMark size={34} tile={false} />
        <div style={{ fontFamily: FONT_UI, fontSize: 24, color: F.ink, lineHeight: 1.5, flex: 1 }}>{a}</div>
      </div>
    </div>
  );
};
