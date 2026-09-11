import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { L, FONT_BODY, FONT_HEAD } from '../theme';

/**
 * Designed stand-in for Vero's answer view. Built at 1200px to sit at the same
 * apparent scale as the real screenshots, and styled from Vero's own palette so
 * the cut between real and mock does not read as two different products.
 *
 * Replace it by putting a real capture in SCREENS.answer.
 */

const useCountUp = (target: number, delay: number, dur = 40) => {
  const frame = useCurrentFrame();
  return Math.round(
    interpolate(frame, [delay, delay + dur], [0, target], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: (t) => 1 - Math.pow(1 - t, 3),
    }),
  );
};

const money = (n: number) => '$' + n.toLocaleString('en-US');

type Row = {
  name: string;
  revenue: number;
  vs: string;
  tone: 'up' | 'down' | 'flat';
  bar: number;
};

const ROWS: Row[] = [
  { name: 'West Palm Beach', revenue: 25940, vs: '+31% vs expectation', tone: 'up', bar: 100 },
  { name: 'Westshore', revenue: 21480, vs: '+18% vs expectation', tone: 'up', bar: 83 },
  { name: 'Brandon', revenue: 14730, vs: 'On expectation', tone: 'flat', bar: 57 },
  { name: 'Wesley Chapel', revenue: 12010, vs: 'On expectation', tone: 'flat', bar: 46 },
  { name: 'South Tampa', revenue: 9260, vs: '-18% vs expectation', tone: 'down', bar: 36 },
];

const tone = (t: Row['tone']) => (t === 'up' ? L.green : t === 'down' ? L.red : L.muted);

const Nav: React.FC = () => (
  <div
    style={{
      height: 46,
      background: L.surface,
      borderBottom: `1px solid ${L.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      fontFamily: FONT_BODY,
      fontSize: 13,
      color: L.text,
    }}
  >
    <div style={{ display: 'flex', gap: 26 }}>
      <span>All locations</span>
      <span>Last 26 weeks</span>
      <span>All channels</span>
    </div>
    <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
      <span>Setup</span>
      <span>Connections</span>
      <span
        style={{ background: '#E8EAFB', color: L.text, padding: '4px 10px', borderRadius: 6 }}
      >
        Workspace
      </span>
      <span
        style={{
          border: `1px solid ${L.border}`,
          color: L.dim,
          padding: '3px 9px',
          borderRadius: 5,
          fontSize: 10,
          letterSpacing: 1.4,
        }}
      >
        DEMO
      </span>
    </div>
  </div>
);

export const MockAnswer: React.FC = () => {
  const frame = useCurrentFrame();
  const head = interpolate(frame, [4, 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div style={{ background: L.page, fontFamily: FONT_BODY }}>
      <Nav />
      <div style={{ padding: '26px 74px 30px' }}>
        <div
          style={{
            fontSize: 11,
            letterSpacing: 1.8,
            textTransform: 'uppercase',
            color: L.dim,
            marginBottom: 8,
          }}
        >
          You asked
        </div>
        <div style={{ fontSize: 17, color: L.text, marginBottom: 20 }}>
          Which locations are performing best?
        </div>

        <div
          style={{
            background: L.surface,
            border: `1px solid ${L.border}`,
            borderRadius: 12,
            padding: '24px 28px 26px',
            opacity: head,
            transform: `translateY(${(1 - head) * 10}px)`,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 22,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: 1.8,
                  textTransform: 'uppercase',
                  color: L.primary,
                  marginBottom: 7,
                }}
              >
                Answer
              </div>
              <div
                style={{
                  fontFamily: FONT_HEAD,
                  fontSize: 20,
                  fontWeight: 700,
                  color: L.text,
                  letterSpacing: -0.3,
                }}
              >
                Two locations are carrying the period.
              </div>
              <div style={{ fontSize: 13.5, color: L.muted, marginTop: 7 }}>
                Revenue matched to ad exposure, compared with each location's own expectation.
              </div>
            </div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: L.dim,
                border: `1px solid ${L.border}`,
                borderRadius: 5,
                padding: '4px 9px',
                whiteSpace: 'nowrap',
              }}
            >
              Sample view
            </div>
          </div>

          {ROWS.map((r, i) => (
            <AnswerRow key={r.name} row={r} delay={26 + i * 8} />
          ))}
        </div>

        <div style={{ fontSize: 12.5, color: L.dim, textAlign: 'center', marginTop: 18 }}>
          Every answer is computed from the register and ad delivery, with the rows behind it.
        </div>
      </div>
    </div>
  );
};

const AnswerRow: React.FC<{ row: Row; delay: number }> = ({ row: r, delay }) => {
  const frame = useCurrentFrame();
  const appear = interpolate(frame, [delay, delay + 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const grow = interpolate(frame, [delay + 6, delay + 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });
  const rev = useCountUp(r.revenue, delay + 6, 40);
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '190px 1fr 130px 175px',
        alignItems: 'center',
        gap: 18,
        padding: '13px 0',
        borderTop: `1px solid ${L.border}`,
        opacity: appear,
        transform: `translateY(${(1 - appear) * 8}px)`,
      }}
    >
      <div style={{ fontSize: 14.5, color: L.text, fontWeight: 600 }}>{r.name}</div>
      <div style={{ height: 8, borderRadius: 4, background: '#EDEFF5' }}>
        <div
          style={{
            width: `${r.bar * grow}%`,
            height: '100%',
            borderRadius: 4,
            background: r.tone === 'down' ? '#C9CDDA' : L.primary,
          }}
        />
      </div>
      <div style={{ fontSize: 15, color: L.text, fontWeight: 700, textAlign: 'right' }}>
        {money(rev)}
      </div>
      <div style={{ fontSize: 13, color: tone(r.tone), textAlign: 'right' }}>{r.vs}</div>
    </div>
  );
};
