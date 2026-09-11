import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { C, FONT_BODY, FONT_HEAD, SCENES } from '../theme';
import { Accent, Headline, Kicker, Stage, Sub, useRise, usePop } from '../components/Base';
import { ScreenFrame, RealScreenshot } from '../components/Screen';
import { MockAnswer } from '../components/Mocks';
import { SCREENS } from '../screens';

/* ---------------------------------------------------------------- 1. HOOK */

const PINS = ['Westshore', 'South Tampa', 'Brandon', 'Wesley Chapel', 'West Palm'];

export const SceneHook: React.FC = () => (
  <Stage>
    <Kicker delay={4}>For operators with 3 to 5 locations</Kicker>
    <Headline delay={14}>
      You researched every location
      <br />
      before you opened it.
    </Headline>
    <Sub delay={40}>
      Demographics. Traffic patterns. Competitors. Where those customers already went.
    </Sub>
    <div style={{ display: 'flex', gap: 16, marginTop: 18 }}>
      {PINS.map((p, i) => (
        <Chip key={p} label={p} delay={62 + i * 7} />
      ))}
    </div>
  </Stage>
);

const Chip: React.FC<{ label: string; delay: number; muted?: boolean }> = ({
  label,
  delay,
  muted,
}) => {
  const st = useRise(delay, 16);
  return (
    <div
      style={{
        ...st,
        fontFamily: FONT_BODY,
        fontSize: 22,
        color: muted ? C.dim : C.white,
        border: `1px solid ${C.line}`,
        background: 'rgba(15,30,51,0.66)',
        borderRadius: 10,
        padding: '13px 22px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          background: muted ? C.dim : C.blueLight,
        }}
      />
      {label}
    </div>
  );
};

/* ------------------------------------------------------- 2. ONE CAMPAIGN */

export const SceneOneCampaign: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [46, 92], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <Stage>
      <Headline delay={6} size={86}>
        Then you market all of them
        <br />
        like they are <Accent>one</Accent>.
      </Headline>
      <Sub delay={34}>
        One campaign. One budget. One report that averages every store together.
      </Sub>

      <div style={{ marginTop: 26, position: 'relative', width: 1420, height: 210 }}>
        <svg width={1420} height={210} style={{ position: 'absolute', inset: 0 }}>
          {PINS.map((_, i) => {
            const x = 214 + i * 280;
            const d = `M 93,58 C 93,112 ${x},108 ${x},164`;
            return (
              <path
                key={i}
                d={d}
                fill="none"
                stroke={C.blueLight}
                strokeWidth={2}
                opacity={0.45}
                strokeDasharray={2600}
                strokeDashoffset={2600 * (1 - draw)}
              />
            );
          })}
        </svg>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 8,
            fontFamily: FONT_BODY,
            fontSize: 21,
            color: C.white,
            border: `1px solid ${C.blueLight}`,
            borderRadius: 10,
            padding: '10px 20px',
            background: 'rgba(33,89,176,0.22)',
          }}
        >
          One campaign
        </div>
        <div style={{ position: 'absolute', top: 172, left: 96, display: 'flex', gap: 44 }}>
          {PINS.map((p, i) => (
            <div
              key={p}
              style={{
                width: 236,
                textAlign: 'center',
                fontFamily: FONT_BODY,
                fontSize: 20,
                color: C.dim,
                opacity: interpolate(frame, [84 + i * 5, 100 + i * 5], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              }}
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
};

/* --------------------------------------------------------- 3. BLIND SPOT */

export const SceneBlindSpot: React.FC = () => {
  const frame = useCurrentFrame();
  const q = usePop(96);
  return (
    <Stage align="center" gap={44}>
      <Headline delay={6} size={84} style={{ textAlign: 'center' }}>
        So when one store is down
        <br />
        and another is up
      </Headline>

      <div style={{ display: 'flex', gap: 56, alignItems: 'center' }}>
        <StatCard
          label="South Tampa"
          value="-18%"
          note="sales vs. last month"
          color={C.red}
          delay={40}
        />
        <div
          style={{
            ...q,
            fontFamily: FONT_HEAD,
            fontSize: 90,
            fontWeight: 800,
            color: C.blueLight,
          }}
        >
          ?
        </div>
        <StatCard
          label="West Palm Beach"
          value="+31%"
          note="sales vs. last month"
          color={C.green}
          delay={56}
        />
      </div>

      <div
        style={{
          opacity: interpolate(frame, [120, 146], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          fontFamily: FONT_HEAD,
          fontSize: 48,
          fontWeight: 700,
          color: C.white,
          letterSpacing: -1,
        }}
      >
        nobody can tell you why.
      </div>
    </Stage>
  );
};

const StatCard: React.FC<{
  label: string;
  value: string;
  note: string;
  color: string;
  delay: number;
}> = ({ label, value, note, color, delay }) => {
  const st = useRise(delay, 28);
  return (
    <div
      style={{
        ...st,
        width: 430,
        padding: '34px 38px',
        borderRadius: 16,
        background: 'rgba(15,30,51,0.8)',
        border: `1px solid ${C.line}`,
        fontFamily: FONT_BODY,
      }}
    >
      <div style={{ fontSize: 22, color: C.muted, letterSpacing: 0.4 }}>{label}</div>
      <div
        style={{
          fontFamily: FONT_HEAD,
          fontSize: 76,
          fontWeight: 800,
          color,
          letterSpacing: -2,
          margin: '10px 0 6px',
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 19, color: C.dim }}>{note}</div>
    </div>
  );
};

/* ------------------------------------------------------------- 4. CLICKS */

const VANITY = ['Impressions', 'Clicks', 'Cost per lead', 'Engagement rate'];

export const SceneClicks: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage>
      <Kicker delay={4}>What your reports show you</Kicker>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', maxWidth: 1500 }}>
        {VANITY.map((v, i) => {
          const d = 18 + i * 9;
          const st = useRiseSafe(frame, d);
          const strike = interpolate(frame, [92 + i * 6, 112 + i * 6], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <div
              key={v}
              style={{
                ...st,
                position: 'relative',
                fontFamily: FONT_HEAD,
                fontSize: 54,
                fontWeight: 700,
                letterSpacing: -1.2,
                color: `rgba(242,246,252,${1 - strike * 0.62})`,
                padding: '10px 6px',
              }}
            >
              {v}
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '54%',
                  height: 3,
                  width: `${strike * 100}%`,
                  background: C.red,
                  borderRadius: 2,
                }}
              />
            </div>
          );
        })}
      </div>
      <Headline delay={130} size={78} style={{ marginTop: 10 }}>
        None of it tells you whether
        <br />
        the <Accent>register moved</Accent>.
      </Headline>
    </Stage>
  );
};

const useRiseSafe = (frame: number, delay: number) => {
  const a = interpolate(frame, [delay, delay + 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return { opacity: a, transform: `translateY(${(1 - a) * 20}px)` } as React.CSSProperties;
};

/* --------------------------------------------- 5 to 7. PRODUCT SCENES */

const ProductScene: React.FC<{
  kicker: string;
  headline: React.ReactNode;
  sub: string;
  screen: React.ReactNode;
  duration: number;
}> = ({ kicker, headline, sub, screen, duration }) => {
  const frame = useCurrentFrame();
  const slide = interpolate(frame, [10, 42], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });
  const drift = interpolate(frame, [0, duration], [0, -24]);
  return (
    <AbsoluteFill
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0 86px 0 90px',
        gap: 44,
      }}
    >
      <div style={{ width: 500, display: 'flex', flexDirection: 'column', gap: 26 }}>
        <Kicker delay={6}>{kicker}</Kicker>
        <Headline delay={16} size={52} style={{ maxWidth: 500, letterSpacing: -1.4 }}>
          {headline}
        </Headline>
        <Sub delay={44} size={27}>
          {sub}
        </Sub>
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          opacity: slide,
          transform: `translateX(${(1 - slide) * 80}px) translateY(${drift}px)`,
        }}
      >
        {screen}
      </div>
    </AbsoluteFill>
  );
};

/* 5. Connections: the real product screen. */

export const SceneConnect: React.FC = () => (
  <ProductScene
    duration={SCENES.connect.dur}
    kicker="This is Vero"
    headline={
      <>
        Your register and
        <br />
        your ad accounts,
        <br />
        <Accent>reconciled</Accent>.
      </>
    }
    sub="Sources are reconciled before anything is measured, so four platforms cannot each claim the same sale."
    screen={
      <ScreenFrame>
        {SCREENS.connections ? <RealScreenshot file={SCREENS.connections} /> : null}
      </ScreenFrame>
    }
  />
);

/* 6. Workspace home: the real product screen. */

export const SceneAsk: React.FC = () => (
  <ProductScene
    duration={SCENES.ask.dur}
    kicker="Ask, do not dig"
    headline={
      <>
        Ask it in
        <br />
        <Accent>plain English</Accent>.
      </>
    }
    sub="Which locations are performing best. Is the marketing actually working. Where should we invest next."
    screen={
      <ScreenFrame>{SCREENS.ask ? <RealScreenshot file={SCREENS.ask} /> : null}</ScreenFrame>
    }
  />
);

/* 7. The answer: real investigating state, then the answer itself. */

const HANDOFF = 118;

const AnswerStack: React.FC = () => {
  const frame = useCurrentFrame();
  const out = interpolate(frame, [HANDOFF, HANDOFF + 20], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const into = interpolate(frame, [HANDOFF + 6, HANDOFF + 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        position: 'relative',
        width: 1200,
        height: 620,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {SCREENS.investigating ? (
        <div style={{ position: 'absolute', width: '100%', opacity: out }}>
          <ScreenFrame>
            <RealScreenshot file={SCREENS.investigating} />
          </ScreenFrame>
        </div>
      ) : null}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          opacity: into,
          transform: `translateY(${(1 - into) * 14}px)`,
        }}
      >
        <ScreenFrame>
          {SCREENS.answer ? <RealScreenshot file={SCREENS.answer} /> : <MockAnswer />}
        </ScreenFrame>
      </div>
    </div>
  );
};

export const SceneAnswer: React.FC = () => (
  <ProductScene
    duration={SCENES.answer.dur}
    kicker="Location level truth"
    headline={
      <>
        It reads <Accent>every location</Accent>
        <br />
        in the register.
      </>
    }
    sub="Ad exposure matched against point of sale, store by store, so you can see which locations are actually paying you back."
    screen={<AnswerStack />}
  />
);

/* ----------------------------------------------------- 8. DIFFERENTIATOR */

export const SceneDifferentiator: React.FC = () => (
  <Stage align="center" gap={30}>
    <Headline delay={6} size={76} style={{ textAlign: 'center', maxWidth: 1500 }}>
      Every platform knows
      <br />
      <span style={{ color: C.dim }}>who your customers are.</span>
    </Headline>
    <Headline delay={44} size={76} style={{ textAlign: 'center', maxWidth: 1500 }}>
      Vero shows you <Accent>where they came from</Accent>.
    </Headline>
  </Stage>
);

/* ----------------------------------------------------------------- 9. CTA */

export const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const line = interpolate(frame, [56, 96], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const st = useRise(112, 20);
  return (
    <Stage align="center" gap={30}>
      <Headline delay={6} size={82} style={{ textAlign: 'center' }}>
        Connect your accounts.
        <br />
        Look at <Accent>your own numbers</Accent>.
      </Headline>
      <Sub delay={34} size={34}>
        <span style={{ display: 'block', textAlign: 'center' }}>
          Fifteen minutes, on your locations, not a slide deck of someone else's.
        </span>
      </Sub>
      <div
        style={{
          height: 2,
          width: 620 * line,
          background: `linear-gradient(90deg, rgba(95,168,255,0), ${C.blueLight}, rgba(95,168,255,0))`,
          margin: '10px 0 4px',
        }}
      />
      <div
        style={{
          ...st,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 18,
          fontFamily: FONT_BODY,
        }}
      >
        <div
          style={{
            fontFamily: FONT_HEAD,
            fontSize: 40,
            fontWeight: 800,
            letterSpacing: 8,
            color: C.white,
          }}
        >
          VCS
        </div>
        <div style={{ fontSize: 28, color: C.blueLight, letterSpacing: 0.6 }}>
          www.vc-solutions.net
        </div>
        <div style={{ fontSize: 24, color: C.muted, letterSpacing: 0.6 }}>
          Keegan Zoller, Founder &nbsp;·&nbsp; (813) 219-0955
        </div>
      </div>
    </Stage>
  );
};
