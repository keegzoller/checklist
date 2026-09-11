import React from 'react';
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from 'remotion';
import { V, FONT_BODY, FONT_HEAD } from './theme';
import {
  Counter,
  DiagonalBand,
  FloatCard,
  IndigoStage,
  LightStage,
  Micro,
  RiseLine,
  Squiggle,
  Stars,
  StatCard,
  useEase,
  usePunch,
} from './Kinetic';
import { BrandGlyph, Constellation, VeroLockup, VeroMark } from './Logos';

/* ------------------------------------------------------------------ *
 * shared bits
 * ------------------------------------------------------------------ */

const Center: React.FC<{ children: React.ReactNode; gap?: number }> = ({ children, gap = 22 }) => (
  <AbsoluteFill
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap,
      padding: '0 130px',
      textAlign: 'center',
    }}
  >
    {children}
  </AbsoluteFill>
);

/**
 * Every invented figure in this video wears one of these. The only real
 * numbers on screen come from the workspace screenshots in the long cut.
 */
const SampleTag: React.FC<{ delay?: number; light?: boolean }> = ({ delay = 0, light = false }) => {
  const s = useEase(delay, 0.5);
  return (
    <div
      style={{
        opacity: s * 0.75,
        fontFamily: FONT_BODY,
        fontSize: 17,
        fontWeight: 600,
        letterSpacing: 4,
        textTransform: 'uppercase',
        color: light ? 'rgba(255,255,255,0.8)' : V.inkSoft,
      }}
    >
      sample view
    </div>
  );
};

/* ================================================================== *
 * 1. hook -- white, the line builds a word at a time
 * ================================================================== */

export const SceneHook: React.FC = () => (
  <LightStage>
    <DiagonalBand delay={10} top="35%" height={215} />
    <Stars count={16} color="rgba(74,68,240,0.30)" seed="hook" />
    <Center gap={10}>
      <RiseLine
        words={[{ t: "you're" }, { t: 'spending' }, { t: 'money.', color: V.blue }]}
        size={152}
        delay={2}
        stagger={9}
      />
      <div style={{ marginTop: -6 }}>
        <Squiggle delay={30} width={470} color={V.blue} />
      </div>
      <div style={{ marginTop: 18 }}>
        <Micro delay={40}>every location · every channel · every month</Micro>
      </div>
    </Center>
  </LightStage>
);

/* ================================================================== *
 * 2. but where -- hard cut to indigo
 * ================================================================== */

export const SceneButWhere: React.FC = () => (
  <IndigoStage>
    <Stars count={30} seed="bw" />
    <Center gap={8}>
      {/* the setup recedes, the payload is the bright one -- tint on indigo
          is not enough contrast to carry the line that matters */}
      <RiseLine words={[{ t: 'but' }, { t: 'you' }, { t: "can't" }, { t: 'tell' }]} size={112} color={V.tint} delay={0} stagger={3} />
      <RiseLine words={[{ t: 'where' }, { t: 'it' }, { t: 'worked.' }]} size={158} color="#fff" delay={9} stagger={3} />
      <Squiggle delay={26} width={600} color={V.tint} thickness={13} />
    </Center>
  </IndigoStage>
);

/* ================================================================== *
 * 3. the spend, then the silence -- the centre of the video
 * ================================================================== */


const SpendBeat: React.FC = () => (
  <LightStage>
    <Center gap={4}>
      <Micro delay={0}>ad spend last quarter</Micro>
      <Counter
        to={248000}
        delay={2}
        duration={46}
        size={300}
        color={V.blue}
        format={(n) => '$' + Math.round(n).toLocaleString('en-US')}
      />
      <div style={{ marginTop: 18 }}>
        <SampleTag delay={30} />
      </div>
    </Center>
    {/* the channels it went out through, scattered around the number */}
    <FloatCard delay={14} x="8%" y="20%" seed={1} padding="0" rotate={-4}>
      <div style={{ padding: '10px 18px' }}>
        <ChipRow brand="meta" amount="$71,400" />
      </div>
    </FloatCard>
    <FloatCard delay={19} x="73%" y="16%" seed={2} padding="0" rotate={3}>
      <div style={{ padding: '10px 18px' }}>
        <ChipRow brand="googleads" amount="$82,900" />
      </div>
    </FloatCard>
    <FloatCard delay={24} x="80%" y="70%" seed={3} padding="0" rotate={-3}>
      <div style={{ padding: '10px 18px' }}>
        <ChipRow brand="tiktok" amount="$24,600" />
      </div>
    </FloatCard>
    <FloatCard delay={29} x="6%" y="68%" seed={4} padding="0" rotate={4}>
      <div style={{ padding: '10px 18px' }}>
        <ChipRow brand="simplifi" amount="$45,300" />
      </div>
    </FloatCard>
    <FloatCard delay={34} x="43%" y="83%" seed={5} padding="0" rotate={-2}>
      <div style={{ padding: '10px 18px' }}>
        <ChipRow brand="gbp" amount="$23,800" />
      </div>
    </FloatCard>
  </LightStage>
);

const ChipRow: React.FC<{ brand: string; amount: string }> = ({ brand, amount }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <BrandGlyph brand={brand} size={26} />
    <span style={{ fontFamily: FONT_HEAD, fontSize: 25, fontWeight: 800, color: V.ink }}>{amount}</span>
  </div>
);

const SilenceBeat: React.FC = () => {
  const ring = useEase(16, 1.1);
  const q = usePunch(2);
  return (
    <LightStage>
      <Center gap={4}>
        <Micro delay={0} color={V.redDeep} size={26}>revenue you can trace back to it</Micro>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width={620} height={620} viewBox="0 0 200 200" style={{ position: 'absolute' }}>
            <circle
              cx="100"
              cy="100"
              r="84"
              fill="none"
              stroke={V.red}
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeDasharray={528}
              strokeDashoffset={528 * (1 - ring)}
              transform="rotate(-96 100 100)"
              opacity={0.9}
            />
          </svg>
          <div
            style={{
              fontFamily: FONT_HEAD,
              fontSize: 470,
              fontWeight: 800,
              color: V.ink,
              lineHeight: 1.18,
              transform: `scale(${0.8 + q * 0.2})`,
            }}
          >
            ?
          </div>
        </div>
        <div style={{ marginTop: 34 }}>
          <Micro delay={40} size={25}>not your agency · not your ad platforms · not your dashboard</Micro>
        </div>
      </Center>
    </LightStage>
  );
};

export const SceneSpendVsProof: React.FC = () => (
  <AbsoluteFill>
    <Sequence durationInFrames={80}>
      <SpendBeat />
    </Sequence>
    <Sequence from={80}>
      <SilenceBeat />
    </Sequence>
  </AbsoluteFill>
);

/* ================================================================== *
 * 4. they bought
 * ================================================================== */

export const SceneTheyBought: React.FC = () => (
  <IndigoStage warm>
    <Stars count={24} seed="tb" />
    <Center gap={6}>
      <RiseLine words={[{ t: 'they' }, { t: 'walked' }, { t: 'in.' }]} size={112} color="#fff" delay={0} stagger={3} />
      <RiseLine words={[{ t: 'they' }, { t: 'bought.', color: V.green }]} size={150} color="#fff" delay={9} stagger={3} />
      <Squiggle delay={26} width={430} color={V.green} />
      <div style={{ marginTop: 20 }}>
        <Micro delay={46} color="rgba(255,255,255,0.88)" size={25}>
          and not one platform saw the receipt
        </Micro>
      </div>
    </Center>
    <FloatCard delay={20} x="5%" y="22%" seed={6} rotate={-5} width={250}>
      <Receipt store="South Tampa" amount="$84.20" time="6:41 PM" />
    </FloatCard>
    <FloatCard delay={27} x="76%" y="24%" seed={7} rotate={4} width={250}>
      <Receipt store="West Palm Beach" amount="$126.75" time="6:44 PM" />
    </FloatCard>
    <FloatCard delay={34} x="79%" y="70%" seed={8} rotate={-3} width={250}>
      <Receipt store="Brandon" amount="$52.10" time="6:52 PM" />
    </FloatCard>
    <FloatCard delay={41} x="7%" y="68%" seed={9} rotate={5} width={250}>
      <Receipt store="Sarasota" amount="$203.40" time="7:03 PM" />
    </FloatCard>
  </IndigoStage>
);

const Receipt: React.FC<{ store: string; amount: string; time: string }> = ({ store, amount, time }) => (
  <>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: V.inkSoft, letterSpacing: 0.4 }}>{store}</span>
      <span style={{ fontSize: 13, color: V.inkSoft, opacity: 0.7 }}>{time}</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 6 }}>
      <span style={{ fontFamily: FONT_HEAD, fontSize: 30, fontWeight: 800, color: V.ink }}>{amount}</span>
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: V.greenDeep,
          background: 'rgba(31,157,87,0.12)',
          padding: '3px 8px',
          borderRadius: 99,
        }}
      >
        PAID
      </span>
    </div>
  </>
);

/* ================================================================== *
 * 5. connect the register
 * ================================================================== */

export const SceneConnect: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: V.page }}>
      {/* soft sky wash, the reference's palette-cleanser between indigo beats */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(168deg, #C3CCFF 0%, #E4E8FF 46%, ${V.page} 100%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(900px 520px at ${30 + Math.sin(frame * 0.02) * 6}% 24%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0) 58%),
                       radial-gradient(860px 500px at 78% 80%, rgba(154,166,255,0.60) 0%, rgba(154,166,255,0) 62%)`,
        }}
      />
      <Stars count={14} color="rgba(74,68,240,0.28)" seed="cn" />
      <Center gap={6}>
        <RiseLine words={[{ t: 'so' }, { t: 'connect' }, { t: 'the' }]} size={104} delay={0} stagger={3} />
        <RiseLine words={[{ t: 'register.', color: V.blue }]} size={168} delay={9} />
        <Squiggle delay={24} width={520} color={V.blue} />
      </Center>
      <FloatCard delay={16} x="5%" y="24%" seed={11} rotate={-4} width={280}>
        <StatCard label="Point of sale" value="Square" badge="CONNECTED" />
      </FloatCard>
      <FloatCard delay={23} x="74%" y="20%" seed={12} rotate={3} width={280}>
        <StatCard label="Ad accounts" value="4 linked" badge="AUTHORIZED" />
      </FloatCard>
      <FloatCard delay={30} x="77%" y="72%" seed={13} rotate={-3} width={280}>
        <StatCard label="Locations in view" value="16" badge="MAPPED" />
      </FloatCard>
      <FloatCard delay={37} x="6%" y="70%" seed={14} rotate={4} width={280}>
        <StatCard label="Window" value="26 weeks" badge="READY" />
      </FloatCard>
    </AbsoluteFill>
  );
};

/* ================================================================== *
 * 6. the no-more stack -- lines strike themselves out
 * ================================================================== */

const NO_MORE = [
  'no more averaging every store together',
  'no more reports that stop at the click',
  'no more guessing which location it helped',
  'no more budget set by gut feel',
];

export const SceneNoMore: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <IndigoStage>
      <Stars count={26} seed="nm" />
      <Center gap={16}>
        {NO_MORE.map((line, i) => {
          const enter = i * 20 + 2;
          const strike = enter + 15;
          // once a line has been struck it recedes, so the eye always lands on
          // the newest one
          const faded = frame > strike + 10;
          return (
            <div
              key={line}
              style={{
                position: 'relative',
                opacity: faded ? 0.42 : 1,
                transition: 'none',
              }}
            >
              <RiseLine
                words={[{ t: line }]}
                size={62}
                color="#fff"
                delay={enter}
                stagger={0}
                weight={700}
              />
              <StrikeBar delay={strike} />
            </div>
          );
        })}
        <div style={{ marginTop: 26 }}>
          <RiseLine words={[{ t: 'it' }, { t: 'all' }, { t: 'ties' }, { t: 'to' }, { t: 'the' }, { t: 'register.', color: V.green }]} size={92} color="#fff" delay={88} stagger={3} />
        </div>
      </Center>
    </IndigoStage>
  );
};

const StrikeBar: React.FC<{ delay: number }> = ({ delay }) => {
  const s = useEase(delay, 0.55);
  return (
    <div
      style={{
        position: 'absolute',
        left: '-1%',
        top: '52%',
        width: `${102 * s}%`,
        height: 5,
        borderRadius: 99,
        background: 'rgba(255,255,255,0.9)',
      }}
    />
  );
};

/* ================================================================== *
 * 7. the four steps -- the reference's done./asked./tapped. rhythm
 * ================================================================== */

type Step = {
  n: string;
  word: string;
  micro: string;
  dark: boolean;
  card: React.ReactNode;
};

const Tick: React.FC = () => (
  <span
    style={{
      width: 20,
      height: 20,
      borderRadius: 99,
      background: V.green,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <svg viewBox="0 0 24 24" width={11} height={11}>
      <path d="M4 12.5l5.2 5.2L20 7" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

const STEPS: Step[] = [
  {
    n: '01',
    word: 'connected.',
    micro: 'register and ad accounts, one workspace',
    dark: false,
    card: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
        {(['square', 'meta', 'googleads', 'ga4'] as const).map((b) => (
          <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <BrandGlyph brand={b} size={34} />
            <span style={{ fontSize: 24, fontWeight: 600, color: V.ink, flex: 1 }}>
              {b === 'ga4' ? 'Google Analytics' : b === 'googleads' ? 'Google Ads' : b === 'meta' ? 'Meta' : 'Square'}
            </span>
            <Tick />
          </div>
        ))}
      </div>
    ),
  },
  {
    n: '02',
    word: 'reconciled.',
    micro: 'one sale, counted once',
    dark: true,
    card: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 18, fontWeight: 600, color: V.inkSoft }}>Order #4471 · South Tampa</div>
        {[
          ['Meta claimed it', true],
          ['Google Ads claimed it', true],
          ['Counted by Vero', false],
        ].map(([t, dup], i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: dup ? V.inkSoft : V.ink,
                textDecoration: dup ? 'line-through' : 'none',
              }}
            >
              {t as string}
            </span>
            {!dup && <span style={{ fontFamily: FONT_HEAD, fontWeight: 800, color: V.greenDeep, fontSize: 24 }}>1x</span>}
          </div>
        ))}
      </div>
    ),
  },
  {
    n: '03',
    word: 'ranked.',
    micro: 'store by store, against expectation',
    dark: false,
    card: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
        {[
          ['West Palm Beach', 31, V.greenDeep],
          ['Sarasota', 12, V.greenDeep],
          ['Brandon', -6, V.redDeep],
          ['South Tampa', -18, V.redDeep],
        ].map(([name, pct, col]) => (
          <div key={name as string} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 23, fontWeight: 600, color: V.ink, width: 240 }}>{name as string}</span>
            <div style={{ flex: 1, height: 11, borderRadius: 99, background: '#EDEFF6', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${Math.min(100, Math.abs(pct as number) * 2.6)}%`,
                  height: '100%',
                  borderRadius: 99,
                  background: col as string,
                }}
              />
            </div>
            <span style={{ fontFamily: FONT_HEAD, fontSize: 24, fontWeight: 800, color: col as string, width: 72, textAlign: 'right' }}>
              {(pct as number) > 0 ? '+' : ''}
              {pct as number}%
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    n: '04',
    word: 'answered.',
    micro: 'in plain english, not a pivot table',
    dark: true,
    card: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: V.ink,
            background: '#F1F2F9',
            padding: '15px 19px',
            borderRadius: 12,
          }}
        >
          "Where should we move next month's budget?"
        </div>
        <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
          <VeroMark size={40} tile={false} />
          <span style={{ fontSize: 23, color: V.ink, lineHeight: 1.45 }}>
            Shift <b>$18K</b> from Brandon display into West Palm Beach search. It returned{' '}
            <b style={{ color: V.greenDeep }}>4.2x</b> at the register.
          </span>
        </div>
      </div>
    ),
  },
];

const StepBeat: React.FC<{ step: Step }> = ({ step }) => {
  const numberIn = useEase(0, 0.5);
  const body = (
    <>
      <Stars count={step.dark ? 18 : 12} color={step.dark ? 'rgba(255,255,255,0.5)' : 'rgba(74,68,240,0.26)'} seed={step.n} />
      <AbsoluteFill style={{ padding: '0 128px', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 56 }}>
          <div style={{ flex: '0 0 auto' }}>
            <div
              style={{
                fontFamily: FONT_BODY,
                fontSize: 30,
                fontWeight: 700,
                letterSpacing: 7,
                color: step.dark ? V.tint : V.blue,
                marginBottom: 6,
                opacity: numberIn,
              }}
            >
              {step.n}
            </div>
            <RiseLine
              words={[{ t: step.word }]}
              size={120}
              color={step.dark ? '#fff' : V.ink}
              delay={2}
              justify="flex-start"
            />
            <div style={{ marginTop: 14 }}>
              <Micro delay={16} color={step.dark ? V.tint : V.inkSoft}>
                {step.micro}
              </Micro>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <StepCard delay={12}>{step.card}</StepCard>
          </div>
        </div>
      </AbsoluteFill>
    </>
  );
  return step.dark ? <IndigoStage>{body}</IndigoStage> : <LightStage>{body}</LightStage>;
};

const StepCard: React.FC<{ children: React.ReactNode; delay: number }> = ({ children, delay }) => {
  const frame = useCurrentFrame();
  const s = usePunch(delay);
  const bob = Math.sin(frame * 0.03) * 6;
  return (
    <div
      style={{
        width: 700,
        padding: '38px 42px',
        borderRadius: 22,
        background: V.surface,
        border: `1px solid ${V.border}`,
        boxShadow: '0 36px 80px rgba(5,8,40,0.22)',
        fontFamily: FONT_BODY,
        opacity: Math.min(1, s * 1.5),
        transform: `translateY(${(1 - s) * 46 + bob}px) scale(${0.93 + s * 0.07})`,
      }}
    >
      {children}
    </div>
  );
};

export const SceneSteps: React.FC = () => (
  <AbsoluteFill>
    {STEPS.map((step, i) => (
      <Sequence key={step.n} from={i * 60} durationInFrames={60}>
        <StepBeat step={step} />
      </Sequence>
    ))}
  </AbsoluteFill>
);

/* ================================================================== *
 * 8 + 9. the two constellations
 * ================================================================== */

const ConstellationScene: React.FC<{
  words: React.ComponentProps<typeof RiseLine>['words'];
  nodes: { brand: string; x: number; y: number }[];
  pillScale?: number;
  centerY?: number;
}> = ({ words, nodes, pillScale = 1, centerY = 58 }) => (
  <IndigoStage warm>
    <Stars count={20} seed="cs" opacity={0.7} />
    <div style={{ position: 'absolute', top: 92, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
      <RiseLine words={words} size={86} color="#fff" delay={0} stagger={2} />
    </div>
    <Constellation nodes={nodes} delay={6} hubDelay={2} pillScale={pillScale} hubSize={212} centerY={centerY} />
  </IndigoStage>
);

export const ScenePosLogos: React.FC = () => (
  <ConstellationScene
    words={[{ t: 'it' }, { t: 'plugs' }, { t: 'into' }, { t: 'your' }, { t: 'register', color: V.green }]}
    nodes={[
      { brand: 'toast', x: 19, y: 36 },
      { brand: 'square', x: 14, y: 59 },
      { brand: 'clover', x: 21, y: 81 },
      { brand: 'lightspeed', x: 81, y: 36 },
      { brand: 'shopify', x: 86, y: 59 },
      { brand: 'aloha', x: 79, y: 81 },
    ]}
  />
);

export const SceneChannelLogos: React.FC = () => (
  <ConstellationScene
    words={[{ t: 'and' }, { t: 'every' }, { t: 'channel' }, { t: 'you' }, { t: 'buy', color: V.green }]}
    pillScale={0.9}
    nodes={[
      { brand: 'meta', x: 17, y: 31 },
      { brand: 'googleads', x: 12, y: 50 },
      { brand: 'tiktok', x: 16, y: 69 },
      { brand: 'ga4', x: 25, y: 87 },
      { brand: 'gbp', x: 44, y: 93 },
      { brand: 'simplifi', x: 84, y: 31 },
      { brand: 'yelp', x: 88, y: 50 },
      { brand: 'snapchat', x: 85, y: 69 },
      { brand: 'nextdoor', x: 76, y: 87 },
      { brand: 'klaviyo', x: 58, y: 93 },
    ]}
  />
);

/* ================================================================== *
 * 10. payoff
 * ================================================================== */

export const ScenePayoff: React.FC = () => (
  <IndigoStage warm>
    <Stars count={28} seed="po" />
    <Center gap={6}>
      <RiseLine
        words={[{ t: 'marketing' }, { t: 'that' }, { t: 'pays' }, { t: 'for' }, { t: 'itself.', color: V.green }]}
        size={106}
        color="#fff"
        delay={0}
        stagger={3}
      />
      <Squiggle delay={22} width={600} color={V.green} />
      <div style={{ marginTop: 22 }}>
        <SampleTag delay={54} light />
      </div>
    </Center>
    <FloatCard delay={18} x="4%" y="18%" seed={21} rotate={-4} width={380}>
      <StatCard
        label="Revenue traced to spend"
        value={<Counter to={1_240_000} delay={22} duration={40} size={46} color={V.ink} format={(n) => '$' + (n / 1_000_000).toFixed(2) + 'M'} />}
        badge="MATCHED"
      />
    </FloatCard>
    <FloatCard delay={25} x="69%" y="16%" seed={22} rotate={3} width={380}>
      <StatCard
        label="Spend with no register lift"
        value={<Counter to={38_400} delay={29} duration={40} size={46} color={V.ink} format={(n) => '$' + Math.round(n).toLocaleString('en-US')} />}
        badge="REDEPLOY"
        badgeColor={V.amber}
      />
    </FloatCard>
    <FloatCard delay={32} x="69%" y="70%" seed={23} rotate={-3} width={440}>
      <StatCard
        label="Best performing location"
        value={<span style={{ fontSize: 36, whiteSpace: 'nowrap' }}>West Palm Beach</span>}
        badge="+31%"
      />
    </FloatCard>
    <FloatCard delay={39} x="5%" y="68%" seed={24} rotate={4} width={380}>
      <StatCard
        label="Return at the register"
        value={<Counter to={4.2} delay={43} duration={40} size={46} color={V.ink} format={(n) => n.toFixed(1) + 'x'} />}
        badge="BLENDED"
      />
    </FloatCard>
  </IndigoStage>
);

/* ================================================================== *
 * 11. close
 * ================================================================== */

export const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const ring = interpolate(frame, [0, 150], [0, 360]);
  const lock = usePunch(0);
  return (
    <LightStage>
      <Stars count={18} color="rgba(74,68,240,0.28)" seed="cta" />
      {/* dotted orbit behind the lockup, as the reference closes on its logo */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{
            width: 860,
            height: 860,
            borderRadius: 999,
            border: `2px dashed rgba(74,68,240,0.20)`,
            transform: `rotate(${ring}deg) scale(${0.92 + lock * 0.08})`,
            marginTop: -40,
          }}
        />
      </AbsoluteFill>
      <Center gap={18}>
        <div style={{ transform: `scale(${0.9 + lock * 0.1})`, opacity: Math.min(1, lock * 1.6) }}>
          <VeroLockup size={150} />
        </div>
        <div style={{ marginTop: 10 }}>
          <RiseLine
            words={[{ t: 'see' }, { t: 'it' }, { t: 'on' }, { t: 'your' }, { t: 'own' }, { t: 'numbers.', color: V.blue }]}
            size={100}
            delay={12}
            stagger={3}
          />
        </div>
        <Micro delay={34} size={24}>15 minutes · your locations · not a slide deck</Micro>
        <ContactBlock delay={46} />
      </Center>
    </LightStage>
  );
};

const ContactBlock: React.FC<{ delay: number }> = ({ delay }) => {
  const s = useEase(delay, 0.6);
  return (
    <div
      style={{
        opacity: s,
        transform: `translateY(${(1 - s) * 18}px)`,
        marginTop: 26,
        display: 'flex',
        alignItems: 'center',
        gap: 26,
        fontFamily: FONT_BODY,
        fontSize: 29,
        color: V.ink,
      }}
    >
      <span style={{ fontWeight: 700, color: V.blue }}>vc-solutions.net</span>
      <Dot />
      <span>Keegan Zoller, Founder</span>
      <Dot />
      <span>(813) 219-0955</span>
    </div>
  );
};

const Dot: React.FC = () => (
  <span style={{ width: 6, height: 6, borderRadius: 99, background: V.inkSoft, opacity: 0.45, display: 'block' }} />
);
