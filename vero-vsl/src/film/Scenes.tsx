import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { F, FONT, FONT_UI } from './theme';
import {
  Center,
  Chip,
  Eyebrow,
  Line,
  Panel,
  PanelLabel,
  Roll,
  Stage,
  Sub,
  useReveal,
} from './Motion';
import {
  AnswerPanel,
  DoubleCount,
  MethodPanel,
  ProofStat,
  RefusePanel,
  ReportCard,
} from './Panels';
import { VcsLogo, VeroMark } from '../fast/Logos';

/**
 * The argument, in order:
 *
 *   you are the only one who can't check  ->  everyone reporting is paid to
 *   say it worked  ->  two of them counted the same sale  ->  Vero reads the
 *   register instead of the pixel  ->  and asks a different question
 *   (incrementality, not attribution)  ->  by comparing against locations you
 *   don't advertise to  ->  and it refuses to answer when it can't tell  ->
 *   here is the evidence  ->  it argues back  ->  here is what it cannot do
 *   ->  they measure the campaign, we measure the money.
 *
 * Source: "Vero -- what it is and why it exists".
 *
 * SCALE RULE, learned the hard way on the first pass: a statement is at most
 * five words a line and never smaller than ~100px, and a product panel is
 * enormous and bleeds off the frame. Anything smaller reads as a slide, and
 * the whole point of this cut is that it does not.
 */

const REAL = (file: string) => (
  <Img src={staticFile(`screens/${file}`)} style={{ width: '100%', display: 'block' }} />
);

/* ================================================================== *
 * 1. open
 * ================================================================== */

export const SceneOpen: React.FC = () => {
  const mark = useReveal(0, 36);
  const word = useReveal(4, 36);
  return (
    <Stage>
      <Center gap={0}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <div style={mark}>
            <VeroMark size={124} tile={false} />
          </div>
          <div
            style={{
              ...word,
              fontFamily: FONT,
              fontSize: 122,
              fontWeight: 700,
              letterSpacing: -4,
              color: F.ink,
            }}
          >
            Vero
          </div>
        </div>
      </Center>
    </Stage>
  );
};

/* ================================================================== *
 * 2. you are the only one who can't check
 * ================================================================== */

export const SceneOnlyOne: React.FC = () => (
  <Stage>
    <Center gap={2}>
      <Line words={[{ t: "You're" }, { t: 'the' }, { t: 'only' }, { t: 'one' }]} size={116} delay={0} exit={44} />
      <Line words={[{ t: 'with' }, { t: 'money' }, { t: 'at' }, { t: 'risk.' }]} size={116} delay={9} exit={44} />
      <div style={{ position: 'absolute' }}>
        <Line
          words={[{ t: 'And' }, { t: 'the' }, { t: 'only' }, { t: 'one' }]}
          size={116}
          delay={52}
          exit={90}
        />
        <div style={{ marginTop: 4 }}>
          <Line
            words={[{ t: 'who' }, { t: "can't", color: F.brand }, { t: 'check.', color: F.brand }]}
            size={116}
            delay={60}
            exit={90}
          />
        </div>
      </div>
    </Center>
  </Stage>
);

/* ================================================================== *
 * 3. everyone in the room is paid to say it worked
 * ================================================================== */

export const SceneTheRoom: React.FC = () => (
  <Stage flip>
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 66 }}>
      <div style={{ display: 'flex', gap: 34, height: 250 }}>
        <ReportCard
          brand="meta"
          name="Meta"
          claim="+34%"
          detail="attributed revenue, last 30 days"
          delay={0}
          exit={96}
          rotate={-1.3}
        />
        <ReportCard
          brand="googleads"
          name="Google Ads"
          claim="+41%"
          detail="conversions, last 30 days"
          delay={7}
          exit={96}
          rotate={0.7}
        />
        <ReportCard
          name="Your agency"
          claim="Great month."
          detail="written by the party being graded"
          delay={14}
          exit={96}
          rotate={-0.5}
        />
      </div>
      <Line
        words={[{ t: 'All' }, { t: 'three' }, { t: 'are' }, { t: 'paid' }, { t: 'to' }, { t: 'say' }, { t: 'that.' }]}
        size={96}
        delay={30}
        exit={96}
      />
    </AbsoluteFill>
  </Stage>
);

/* ================================================================== *
 * 4. and two of them counted the same sale
 * ================================================================== */

export const SceneSameSale: React.FC = () => (
  <Stage>
    <AbsoluteFill
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 96,
        padding: '0 120px',
      }}
    >
      <div style={{ width: 640, flexShrink: 0 }}>
        <Line words={[{ t: 'Two' }, { t: 'of' }, { t: 'them' }]} size={100} delay={0} exit={66} justify="flex-start" />
        <Line words={[{ t: 'counted' }, { t: 'the' }]} size={100} delay={6} exit={66} justify="flex-start" />
        <Line words={[{ t: 'same' }, { t: 'sale.' }]} size={100} delay={11} exit={66} justify="flex-start" />
      </div>
      <DoubleCount delay={6} exit={66} />
    </AbsoluteFill>
  </Stage>
);

/* ================================================================== *
 * 5. introducing
 * ================================================================== */

export const SceneIntro: React.FC = () => {
  const mark = useReveal(0, 52);
  const word = useReveal(2, 52);
  return (
    <Stage>
      <Center gap={34}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={mark}>
            <VeroMark size={78} tile={false} />
          </div>
          <div
            style={{
              ...word,
              fontFamily: FONT,
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: -2.6,
              color: F.ink,
            }}
          >
            Vero
          </div>
        </div>
        <Line
          words={[{ t: 'The' }, { t: 'only' }, { t: 'honest' }, { t: 'number' }]}
          size={104}
          delay={8}
          exit={52}
        />
        <div style={{ marginTop: -18 }}>
          <Line words={[{ t: 'in' }, { t: 'the' }, { t: 'room.' }]} size={104} delay={14} exit={52} />
        </div>
      </Center>
    </Stage>
  );
};

/* ================================================================== *
 * 6. it reads the register, not the pixel -- REAL SCREEN
 * ================================================================== */

export const SceneRegister: React.FC = () => (
  <Stage>
    <Panel delay={4} exit={82} x={700} y={196} width={1760}>
      {REAL('screen-connections.png')}
    </Panel>
    <AbsoluteFill style={{ justifyContent: 'center', paddingLeft: 112 }}>
      <div style={{ width: 520 }}>
        <PanelLabel top="It reads the" bottom="register." delay={0} exit={82} size={78} />
        <div style={{ marginTop: 30 }}>
          <Sub delay={16} exit={82} size={30} width={480}>
            Spend from the platforms. Revenue from your own point of sale. Not a modelled
            conversion — the till.
          </Sub>
        </div>
      </div>
    </AbsoluteFill>
  </Stage>
);

/* ================================================================== *
 * 7. attribution vs incrementality
 * ================================================================== */

const QuestionBlock: React.FC<{
  kicker: string;
  q: string;
  a: string;
  delay: number;
  exit?: number;
  dim?: boolean;
}> = ({ kicker, q, a, delay, exit, dim = false }) => {
  const st = useReveal(delay, exit);
  return (
    <div style={{ ...st, flex: 1, opacity: (st.opacity as number) * (dim ? 0.4 : 1) }}>
      <Eyebrow delay={delay} exit={exit} color={dim ? F.faint : F.brand} size={20}>
        {kicker}
      </Eyebrow>
      <div
        style={{
          fontFamily: FONT,
          fontSize: 58,
          fontWeight: 800,
          letterSpacing: -2,
          color: F.ink,
          lineHeight: 1.18,
          margin: '22px 0 20px',
        }}
      >
        {q}
      </div>
      <div style={{ fontFamily: FONT_UI, fontSize: 27, color: F.muted, lineHeight: 1.5 }}>{a}</div>
    </div>
  );
};

export const SceneTwoQuestions: React.FC = () => (
  <Stage flip>
    <AbsoluteFill style={{ justifyContent: 'center', padding: '0 130px' }}>
      <div style={{ marginBottom: 64 }}>
        <Line
          words={[{ t: 'Everyone' }, { t: 'else' }, { t: 'answers' }, { t: 'the' }, { t: 'first' }, { t: 'one.' }]}
          size={82}
          delay={0}
          exit={92}
          justify="flex-start"
        />
      </div>
      <div style={{ display: 'flex', gap: 96, alignItems: 'flex-start' }}>
        <QuestionBlock
          kicker="attribution"
          q="Which ad gets the credit?"
          a="Every platform answers. Every platform claims the same sale."
          delay={10}
          exit={92}
          dim
        />
        <div style={{ width: 1, alignSelf: 'stretch', background: F.line }} />
        <QuestionBlock
          kicker="incrementality"
          q="Would it have happened anyway?"
          a="Only one party can answer that — the one holding the register, and the locations you aren’t advertising to."
          delay={26}
          exit={92}
        />
      </div>
    </AbsoluteFill>
  </Stage>
);

/* ================================================================== *
 * 8. the method
 * ================================================================== */

export const SceneMethod: React.FC = () => (
  <Stage>
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 46 }}>
      <div style={{ textAlign: 'center' }}>
        <Line
          words={[{ t: 'Your' }, { t: 'marketed' }, { t: 'locations,' }]}
          size={76}
          delay={0}
          exit={106}
        />
        <Line
          words={[{ t: 'against' }, { t: 'the' }, { t: 'ones' }, { t: 'we' }, { t: "don't.", color: F.brand }]}
          size={76}
          delay={6}
          exit={106}
        />
      </div>
      <MethodPanel delay={14} exit={106} />
      <Chip delay={66} exit={106} size={36} tone="brand">
        the gap is the answer
      </Chip>
    </AbsoluteFill>
  </Stage>
);

/* ================================================================== *
 * 9. built to refuse -- the payoff shot
 * ================================================================== */

export const SceneRefuse: React.FC = () => (
  <Stage flip>
    {/* the setup line owns the frame alone, then hands it to the panel */}
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Line
        words={[{ t: 'Any' }, { t: 'tool' }, { t: 'can' }, { t: 'produce' }, { t: 'a' }, { t: 'number.' }]}
        size={92}
        delay={0}
        exit={24}
        color={F.ghost}
      />
    </AbsoluteFill>
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 44 }}>
      <Line
        words={[{ t: 'Vero' }, { t: 'is' }, { t: 'built' }, { t: 'to' }, { t: 'refuse.', color: F.brand }]}
        size={86}
        delay={28}
        exit={112}
      />
      <RefusePanel delay={42} exit={112} />
      <Sub delay={84} exit={112} size={28} width={1180}>
        <b style={{ color: F.ink }}>+8.4% is withheld. +8.2% is reported.</b> The smaller number
        counts, because significance depends on how noisy a location is — not on how big the
        number looks.
      </Sub>
    </AbsoluteFill>
  </Stage>
);

/* ================================================================== *
 * 10. the evidence
 * ================================================================== */

export const SceneProof: React.FC = () => (
  <Stage>
    <AbsoluteFill style={{ justifyContent: 'center', padding: '0 130px', gap: 64 }}>
      <Line
        words={[{ t: 'Tested' }, { t: 'the' }, { t: 'way' }, { t: "you'd" }, { t: 'test' }, { t: 'a' }, { t: 'claim.' }]}
        size={80}
        delay={0}
        exit={82}
        justify="flex-start"
      />
      <div style={{ display: 'flex', gap: 52 }}>
        <ProofStat
          delay={12}
          exit={82}
          value={<Roll to={4.6} delay={14} dur={26} size={104} format={(n) => n.toFixed(1) + '%'} />}
          label="How often it claims an effect when there is genuinely none. It targets 5%."
        />
        <ProofStat delay={18} exit={82} value="0" label="Times it reported an effect in the wrong direction, at any effect size." />
        <ProofStat
          delay={24}
          exit={82}
          value="4 of 4"
          label="Deliberate traps refused — a seasonal spike, a mid-window closure, budget chasing weak weeks, a brand twice as volatile as normal."
        />
        <ProofStat delay={30} exit={82} value="0 of 360" label="Spurious relationships claimed when fed pure noise." />
      </div>
      <Sub delay={46} exit={82} size={30} width={1400}>
        It fails by going <b style={{ color: F.ink }}>quiet</b> — never by getting the sign wrong.
      </Sub>
    </AbsoluteFill>
  </Stage>
);

/* ================================================================== *
 * 11. not a dashboard -- REAL SCREEN
 * ================================================================== */

export const ScenePartner: React.FC = () => (
  <Stage>
    <Panel delay={0} exit={92} x={880} y={74} width={1500} zoom={0.045}>
      {REAL('screen-ask.png')}
    </Panel>
    <AbsoluteFill style={{ paddingLeft: 112, paddingTop: 138 }}>
      <div style={{ width: 660 }}>
        <PanelLabel top="Not a" bottom="dashboard." delay={0} exit={92} size={76} />
        <div style={{ marginTop: 26 }}>
          <Sub delay={12} exit={92} size={28} width={600}>
            Something you ask, whenever the question occurs to you — and it answers like
            someone on your side rather than the campaign’s.
          </Sub>
        </div>
      </div>
    </AbsoluteFill>
    <div style={{ position: 'absolute', left: 112, bottom: 78 }}>
      <AnswerPanel delay={44} exit={92} />
    </div>
  </Stage>
);

/* ================================================================== *
 * 12. what it cannot do
 * ================================================================== */

export const SceneLimit: React.FC = () => (
  <Stage flip>
    <Center gap={10}>
      <div style={{ marginBottom: 22 }}>
        <Eyebrow delay={0} exit={72} color={F.faint}>
          say this before anyone asks
        </Eyebrow>
      </div>
      <Line
        words={[{ t: 'It' }, { t: "can't" }, { t: 'tell' }, { t: 'you' }, { t: 'which' }, { t: 'creative' }, { t: 'won.' }]}
        size={72}
        delay={6}
        exit={72}
        color={F.ghost}
      />
      <Line
        words={[{ t: 'It' }, { t: "can't" }, { t: 'tell' }, { t: 'you' }, { t: 'about' }, { t: 'yesterday.' }]}
        size={72}
        delay={14}
        exit={72}
        color={F.ghost}
      />
      <div style={{ marginTop: 34, display: 'flex', gap: 16, alignItems: 'center' }}>
        <Chip delay={28} exit={72} size={38}>
          it needs weeks
        </Chip>
        <Chip delay={34} exit={72} size={38}>
          and more than one location
        </Chip>
      </div>
      <div style={{ marginTop: 28 }}>
        <Sub delay={44} exit={72} size={29} width={1100}>
          Leading with that limit is what makes everything else credible.
        </Sub>
      </div>
    </Center>
  </Stage>
);

/* ================================================================== *
 * 13. the line
 * ================================================================== */

export const SceneMeasure: React.FC = () => (
  <Stage>
    <Center gap={14}>
      <Line
        words={[{ t: 'They' }, { t: 'measure' }, { t: 'the' }, { t: 'campaign.' }]}
        size={84}
        delay={0}
        exit={66}
        color={F.ghost}
      />
      <Line
        words={[{ t: 'We' }, { t: 'measure' }, { t: 'the' }, { t: 'money.', color: F.brand }]}
        size={132}
        delay={14}
        exit={66}
      />
    </Center>
  </Stage>
);

/* ================================================================== *
 * 14. close
 * ================================================================== */

export const SceneCTA: React.FC = () => {
  const mark = useReveal(0);
  const word = useReveal(3);
  const contact = useReveal(32);
  const vcs = useReveal(42);
  return (
    <Stage>
      <Center gap={28}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={mark}>
            <VeroMark size={96} tile={false} />
          </div>
          <div
            style={{
              ...word,
              fontFamily: FONT,
              fontSize: 94,
              fontWeight: 700,
              letterSpacing: -3.2,
              color: F.ink,
            }}
          >
            Vero
          </div>
        </div>
        <Line
          words={[{ t: 'Bring' }, { t: 'us' }, { t: 'a' }, { t: 'month' }]}
          size={72}
          delay={10}
        />
        <div style={{ marginTop: -12 }}>
          <Line words={[{ t: 'you' }, { t: 'already' }, { t: 'argued' }, { t: 'about.' }]} size={72} delay={16} />
        </div>
        <div style={{ marginTop: 12 }}>
          <Sub delay={26} size={29} width={960}>
            Fifteen minutes, on your own locations — including the parts we can’t read yet.
          </Sub>
        </div>
        <div
          style={{
            ...contact,
            marginTop: 30,
            display: 'flex',
            alignItems: 'center',
            gap: 26,
            fontFamily: FONT_UI,
            fontSize: 28,
            color: F.ink,
          }}
        >
          <span style={{ fontWeight: 700, color: F.brand }}>vc-solutions.net</span>
          <Sep />
          <span>Keegan Zoller, Founder</span>
          <Sep />
          <span>(813) 219-0955</span>
        </div>
        <div style={{ ...vcs, marginTop: 36, display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{ width: 52, height: 1, background: F.line }} />
          <Tiny>a</Tiny>
          <VcsLogo height={68} />
          <Tiny>product</Tiny>
          <span style={{ width: 52, height: 1, background: F.line }} />
        </div>
      </Center>
    </Stage>
  );
};

const Sep: React.FC = () => (
  <span style={{ width: 5, height: 5, borderRadius: 99, background: F.faint, display: 'block' }} />
);

const Tiny: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    style={{
      fontFamily: FONT_UI,
      fontSize: 16,
      fontWeight: 600,
      letterSpacing: 3.2,
      textTransform: 'uppercase',
      color: F.faint,
    }}
  >
    {children}
  </span>
);
