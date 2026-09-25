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
  Stage,
  Sub,
  useReveal,
} from './Motion';
import { Exchange, ExpenseCheck, RefusePanel, ReportCard } from './Panels';
import { CHANNEL_TILES, ConnectGrid, POS_TILES } from './Connect';
import {
  AttributionPanel,
  BaselinePanel,
  DeterministicPanel,
  ForecastPanel,
  NotThisCard,
  OutcomeCard,
} from './Mechanism';
import { VcsLogo, VeroMark } from '../fast/Logos';

/**
 * Five acts. Source: "Vero -- positioning and narrative".
 *
 *   1. the feeling      you're spending it either way, and you still guess
 *   2. why nobody knows everyone reporting to you is graded by themselves,
 *                       and marketing is the last big expense nobody checks
 *   3. what Vero does   reads the register, compares your loud locations
 *                       against your own quiet ones
 *   4. what you get     four concrete things, each with the money attached
 *   5. the close        what it won't do, and the line
 *
 * Act 4 is the one the earlier version of this cut was missing. Explaining the
 * method without ever saying what lands on an owner's desk is the difference
 * between clever and worth buying.
 *
 * SCALE RULE: a statement is at most five words a line and never below ~100px;
 * a product panel is enormous and bleeds off the frame. Anything smaller reads
 * as a slide.
 *
 * HOLD RULE: a beat's `exit` sits far enough past the last word landing that
 * the whole line can be read twice. Every `dur` in theme.ts already accounts
 * for that -- shortening one without pulling its `exit` back will cut a line
 * off mid-sentence.
 */

const REAL = (file: string) => (
  <Img src={staticFile(`screens/${file}`)} style={{ width: '100%', display: 'block' }} />
);

/* ================================================================== *
 * 1. open
 * ================================================================== */

export const SceneOpen: React.FC = () => {
  const mark = useReveal(0, 40);
  const word = useReveal(4, 40);
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
 * ACT 1 -- THE FEELING
 * ================================================================== */

/** 2. the hook, straight off the front of the doc */
export const SceneEitherWay: React.FC = () => (
  <Stage>
    <Center gap={4}>
      <Line words={[{ t: "You're" }, { t: 'spending' }, { t: 'the' }, { t: 'money' }]} size={112} delay={0} exit={100} />
      <Line words={[{ t: 'either' }, { t: 'way.' }]} size={112} delay={10} exit={100} />
      <div style={{ marginTop: 42 }}>
        <Line
          words={[{ t: 'You' }, { t: 'should' }, { t: 'get' }, { t: 'to' }, { t: 'know.', color: F.brand }]}
          size={94}
          delay={40}
          exit={100}
        />
      </div>
    </Center>
  </Stage>
);


/** 4. so you go with your gut -- the emotional centre */
export const SceneGut: React.FC = () => (
  <Stage>
    <Center gap={6}>
      <Line words={[{ t: 'So' }, { t: 'you' }, { t: 'go' }, { t: 'with' }, { t: 'your' }, { t: 'gut.' }]} size={104} delay={0} exit={110} />
      <div style={{ marginTop: 2 }}>
        <Line words={[{ t: 'Again.' }]} size={104} delay={14} exit={110} color={F.brand} />
      </div>
      <div style={{ marginTop: 52 }}>
        <Line
          words={[{ t: "You've" }, { t: 'been' }, { t: 'doing' }, { t: 'that' }, { t: 'for' }, { t: 'years.' }]}
          size={50}
          delay={44}
          exit={110}
          color={F.ghost}
        />
        <div style={{ marginTop: 8 }}>
          <Line
            words={[{ t: 'And' }, { t: 'it' }, { t: 'still' }, { t: 'bothers' }, { t: 'you' }, { t: 'every' }, { t: 'single' }, { t: 'month.' }]}
            size={50}
            delay={64}
            exit={110}
          />
        </div>
      </div>
    </Center>
  </Stage>
);

/* ================================================================== *
 * ACT 2 -- WHY NOBODY CAN TELL YOU
 * ================================================================== */

/** 5. everyone reporting to you is being graded by themselves */
export const SceneGraded: React.FC = () => (
  <Stage flip>
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 60 }}>
      <div style={{ display: 'flex', gap: 34, height: 250 }}>
        <ReportCard
          brand="meta"
          name="Meta"
          claim="+34%"
          detail="how Facebook says Facebook did"
          delay={0}
          exit={120}
          rotate={-1.3}
        />
        <ReportCard
          brand="googleads"
          name="Google Ads"
          claim="+41%"
          detail="how Google says Google did"
          delay={7}
          exit={120}
          rotate={0.7}
        />
        <ReportCard
          name="Your agency"
          claim="Great month."
          detail="written by the people being graded"
          delay={14}
          exit={120}
          rotate={-0.5}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <Line
          words={[{ t: 'None' }, { t: 'of' }, { t: 'them' }, { t: 'are' }, { t: 'lying.' }]}
          size={78}
          delay={34}
          exit={120}
          color={F.ghost}
        />
        <div style={{ marginTop: 10 }}>
          <Line
            words={[{ t: 'They' }, { t: 'just' }, { t: "can't" }, { t: 'afford' }, { t: 'to' }, { t: 'tell' }, { t: 'you' }, { t: 'it' }, { t: "didn't." }]}
            size={62}
            delay={54}
            exit={120}
          />
        </div>
      </div>
    </AbsoluteFill>
  </Stage>
);


/** 7. marketing is the last big expense nobody can check */
export const SceneLastExpense: React.FC = () => (
  <Stage>
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 52 }}>
      <Line
        words={[{ t: 'Every' }, { t: 'other' }, { t: 'line' }, { t: 'on' }, { t: 'your' }, { t: 'P&L,' }, { t: 'you' }, { t: 'can' }, { t: 'check.' }]}
        size={62}
        delay={0}
        exit={116}
      />
      <ExpenseCheck delay={12} exit={116} />
    </AbsoluteFill>
  </Stage>
);

/* ================================================================== *
 * ACT 1 (cont.) -- the three things you don't know
 * ================================================================== */

const UNKNOWNS = [
  'Is my marketing working?',
  'Which channels should I spend on?',
  'How much should I spend?',
];

/** Three questions, each landing with nothing in the answer slot. */
export const SceneThreeUnknowns: React.FC = () => (
  <Stage>
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 34 }}>
      {UNKNOWNS.map((q, i) => (
        <UnknownRow key={q} q={q} delay={i * 30} exit={158} />
      ))}
      <div style={{ marginTop: 26 }}>
        <Line
          words={[{ t: 'Three' }, { t: 'questions.' }, { t: 'No' }, { t: 'answers.', color: F.brand }]}
          size={62}
          delay={116}
          exit={158}
        />
      </div>
    </AbsoluteFill>
  </Stage>
);

const UnknownRow: React.FC<{ q: string; delay: number; exit: number }> = ({ q, delay, exit }) => {
  const st = useReveal(delay, exit);
  const blank = useReveal(delay + 14, exit);
  return (
    <div style={{ ...st, display: 'flex', alignItems: 'center', gap: 36, width: 1280 }}>
      <span
        style={{
          fontFamily: FONT,
          fontSize: 58,
          fontWeight: 800,
          letterSpacing: -1.9,
          color: F.ink,
          flex: 1,
        }}
      >
        “{q}”
      </span>
      {/* the answer slot stays empty on purpose */}
      <span
        style={{
          ...blank,
          width: 220,
          height: 54,
          borderRadius: 12,
          background: F.panelAlt,
          border: `1px dashed ${F.line}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: FONT_UI,
          fontSize: 20,
          color: F.faint,
        }}
      >
        no answer
      </span>
    </div>
  );
};

/* ================================================================== *
 * ACT 3 -- introducing Vero, and what it connects to
 * ================================================================== */

export const SceneIntro: React.FC = () => {
  const mark = useReveal(0, 56);
  const word = useReveal(3, 56);
  return (
    <Stage>
      <Center gap={30}>
        <Eyebrow delay={0} exit={56} color={F.faint}>
          introducing
        </Eyebrow>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <div style={mark}>
            <VeroMark size={104} tile={false} />
          </div>
          <div
            style={{
              ...word,
              fontFamily: FONT,
              fontSize: 104,
              fontWeight: 700,
              letterSpacing: -3.6,
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

/** It starts at the register. */
export const SceneConnectPos: React.FC = () => (
  <Stage>
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 42 }}>
      <div style={{ textAlign: 'center' }}>
        <Line words={[{ t: 'It' }, { t: 'starts' }, { t: 'at' }, { t: 'your' }]} size={66} delay={0} exit={156} />
        <Line words={[{ t: 'point' }, { t: 'of' }, { t: 'sale.', color: F.brand }]} size={66} delay={5} exit={156} />
      </div>
      <ConnectGrid tiles={POS_TILES} delay={14} exit={156} cols={6} tileW={182} />
      <Sub delay={78} exit={156} size={27} width={1100} center>
        Not clicks. Not impressions. The actual money that came through your tills.
      </Sub>
    </AbsoluteFill>
  </Stage>
);

/** Then every channel you buy. */
export const SceneConnectChannels: React.FC = () => (
  <Stage flip>
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 42 }}>
      <div style={{ textAlign: 'center' }}>
        <Line words={[{ t: 'Then' }, { t: 'every' }, { t: 'channel' }]} size={66} delay={0} exit={151} />
        <Line words={[{ t: 'you' }, { t: 'buy.', color: F.brand }]} size={66} delay={5} exit={151} />
      </div>
      <ConnectGrid tiles={CHANNEL_TILES} delay={12} exit={151} cols={5} tileW={186} />
    </AbsoluteFill>
  </Stage>
);

/** Where they came from, and what they came for. */
export const SceneAttribute: React.FC = () => (
  <Stage>
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 44 }}>
      <div style={{ textAlign: 'center' }}>
        <Line
          words={[{ t: 'So' }, { t: 'you' }, { t: 'can' }, { t: 'see' }, { t: 'where' }, { t: 'they' }, { t: 'came' }, { t: 'from' }]}
          size={58}
          delay={0}
          exit={171}
        />
        <Line
          words={[{ t: 'and' }, { t: 'what' }, { t: 'they' }, { t: 'came' }, { t: 'for.', color: F.brand }]}
          size={58}
          delay={7}
          exit={171}
        />
      </div>
      <AttributionPanel delay={16} exit={171} />
      <Sub delay={86} exit={171} size={27} width={1240} center>
        Not just which ad they clicked — which locations, which channels, and which items
        actually rang up.
      </Sub>
    </AbsoluteFill>
  </Stage>
);

/* ================================================================== *
 * ACT 4 -- what we are not
 * ================================================================== */

export const SceneNotAnAI: React.FC = () => (
  <Stage flip>
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 40 }}>
      <div style={{ textAlign: 'center' }}>
        <Line
          words={[{ t: 'This' }, { t: 'is' }, { t: 'not' }, { t: 'an' }, { t: 'AI' }]}
          size={82}
          delay={0}
          exit={151}
        />
        <Line
          words={[{ t: 'that' }, { t: 'reads' }, { t: 'your' }, { t: 'dashboards.' }]}
          size={82}
          delay={6}
          exit={151}
        />
      </div>
      <NotThisCard delay={26} exit={151} />
      <Sub delay={76} exit={151} size={29} width={1100} color={F.ink} center>
        Restating numbers you already couldn’t trust, with more confidence, is not an answer.
      </Sub>
    </AbsoluteFill>
  </Stage>
);

/* ================================================================== *
 * ACT 5 -- how it actually works
 * ================================================================== */

const Mech: React.FC<{
  n: string;
  top: string;
  bottom: string;
  children: React.ReactNode;
  sub: React.ReactNode;
  exit: number;
  subDelay: number;
}> = ({ n, top, bottom, children, sub, exit, subDelay }) => (
  <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 38 }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: 16 }}>
        <NumRule n={n} exit={exit} />
      </div>
      <Line words={[{ t: top }]} size={62} delay={3} exit={exit} />
      <Line words={[{ t: bottom, color: F.brand }]} size={62} delay={7} exit={exit} />
    </div>
    {children}
    <Sub delay={subDelay} exit={exit} size={27} width={1180} center>
      {sub}
    </Sub>
  </AbsoluteFill>
);

export const SceneDeterministic: React.FC = () => (
  <Stage>
    <Mech
      n="01"
      top="It reasons"
      bottom="deterministically."
      exit={186}
      subDelay={92}
      sub={
        <>
          Same question, same data, <b style={{ color: F.ink }}>same answer</b> — every time. Not a
          model guessing differently on a Tuesday.
        </>
      }
    >
      <DeterministicPanel delay={14} exit={186} />
    </Mech>
  </Stage>
);

export const SceneBaseline: React.FC = () => (
  <Stage flip>
    <Mech
      n="02"
      top="It builds the floor —"
      bottom="what happens without you."
      exit={186}
      subDelay={96}
      sub={
        <>
          Your own unmarketed locations show what demand did on its own.{' '}
          <b style={{ color: F.ink }}>Everything above that line is yours.</b>
        </>
      }
    >
      <BaselinePanel delay={14} exit={186} />
    </Mech>
  </Stage>
);

export const SceneForecast: React.FC = () => (
  <Stage>
    <Mech
      n="03"
      top="And it forecasts"
      bottom="the change before you make it."
      exit={186}
      subDelay={98}
      sub={
        <>
          Move the money on screen and see what it’s expected to do at the register —{' '}
          <b style={{ color: F.ink }}>with the range, not just the number.</b>
        </>
      }
    >
      <ForecastPanel delay={14} exit={186} />
    </Mech>
  </Stage>
);

/* ================================================================== *
 * ACT 7 -- outcomes
 * ================================================================== */

export const SceneOutcomes: React.FC = () => (
  <Stage flip>
    <AbsoluteFill style={{ justifyContent: 'center', padding: '0 110px', gap: 52 }}>
      <Line
        words={[{ t: 'What' }, { t: 'changes' }, { t: 'for' }, { t: 'you.' }]}
        size={78}
        delay={0}
        exit={196}
        justify="flex-start"
      />
      <div style={{ display: 'flex', gap: 30, alignItems: 'stretch' }}>
        <OutcomeCard
          n="01"
          title="Clarity in the decision"
          body="You walk into the meeting already knowing which locations are working and which aren’t."
          delay={14}
          exit={196}
        />
        <OutcomeCard
          n="02"
          title="Better allocation of every dollar"
          body="The next dollar goes where the last one actually produced — not where the report looked best."
          delay={26}
          exit={196}
        />
        <OutcomeCard
          n="03"
          title="More customers through the door"
          body="Waste gets found in week one instead of next quarter, and that budget goes back to work."
          delay={38}
          exit={196}
        />
      </div>
    </AbsoluteFill>
  </Stage>
);

/* ================================================================== *
 * ACT 3 -- WHAT VERO DOES
 * ================================================================== */



/* ================================================================== *
 * ACT 4 -- WHAT YOU ACTUALLY GET
 * ================================================================== */


/** The act-4 step number. Same family as Eyebrow, so it never reads as chrome. */
const NumRule: React.FC<{ n: string; exit: number }> = ({ n, exit }) => {
  const st = useReveal(0, exit);
  return (
    <span
      style={{
        ...st,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 14,
        fontFamily: FONT_UI,
        fontSize: 21,
        fontWeight: 700,
        letterSpacing: 5,
        color: F.brand,
      }}
    >
      <span style={{ width: 34, height: 2, background: F.brand, opacity: 0.4 }} />
      {n}
      <span style={{ width: 34, height: 2, background: F.brand, opacity: 0.4 }} />
    </span>
  );
};





/** 15. what it sounds like -- REAL investigating strip, then two real answers */
export const SceneSounds: React.FC = () => (
  <Stage flip>
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 26 }}>
      <RealStrip delay={0} exit={162} />
      <Exchange
        delay={26}
        exit={162}
        width={1100}
        q="“Is the marketing working?”"
        a={
          <>
            At <b>four of your twelve locations</b>, yes — worth about <b style={{ color: F.green }}>$7,500 a week</b>{' '}
            between them. One is genuinely down. The rest I can’t call yet, and I’ll tell you
            what would settle it.
          </>
        }
      />
      <Exchange
        delay={78}
        exit={162}
        width={1100}
        q="“Meta is crushing it, right? I want to put more there.”"
        a={
          <>
            Not quite. Meta is working — about <b>$2.90</b> back per dollar. Geofencing is doing{' '}
            <b style={{ color: F.green }}>$6.85</b> on a third of the budget. If you’re moving
            money, move it the other way.
          </>
        }
      />
    </AbsoluteFill>
  </Stage>
);

/** The investigating state, cut from the recording. Wide and short, so it sits
 *  as a banner above the answers rather than as a hero panel. */
const RealStrip: React.FC<{ delay: number; exit?: number }> = ({ delay, exit }) => {
  const st = useReveal(delay, exit);
  return (
    <div
      style={{
        ...st,
        width: 1100,
        borderRadius: 16,
        overflow: 'hidden',
        border: `1px solid ${F.line}`,
        boxShadow: '0 30px 68px rgba(15,23,41,0.11)',
      }}
    >
      {REAL('screen-investigating.png')}
    </div>
  );
};

/** 16. the first thing that will tell you no */
export const SceneTellYouNo: React.FC = () => (
  <Stage>
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 38 }}>
      <div style={{ textAlign: 'center' }}>
        <Line
          words={[{ t: "It's" }, { t: 'the' }, { t: 'first' }, { t: 'thing' }, { t: 'in' }, { t: 'your' }, { t: 'marketing' }]}
          size={62}
          delay={0}
          exit={116}
        />
        <Line
          words={[{ t: 'that' }, { t: 'will' }, { t: 'tell' }, { t: 'you' }, { t: 'no.', color: F.brand }]}
          size={62}
          delay={7}
          exit={116}
        />
      </div>
      <RefusePanel delay={18} exit={116} />
      <Sub delay={72} exit={116} size={27} width={1180} center>
        <b style={{ color: F.ink }}>+8.4% is withheld. +8.2% is reported.</b> Below a location’s own
        noise, Vero says so instead of making something up.
      </Sub>
    </AbsoluteFill>
  </Stage>
);

/* ================================================================== *
 * ACT 5 -- THE CLOSE
 * ================================================================== */

/** 17. what it does not do */
export const SceneLimit: React.FC = () => (
  <Stage flip>
    <Center gap={10}>
      <div style={{ marginBottom: 22 }}>
        <Eyebrow delay={0} exit={82} color={F.faint}>
          what Vero does not do
        </Eyebrow>
      </div>
      <Line
        words={[{ t: 'It' }, { t: "won't" }, { t: 'tell' }, { t: 'you' }, { t: 'which' }, { t: 'image' }, { t: 'won.' }]}
        size={70}
        delay={6}
        exit={82}
        color={F.ghost}
      />
      <Line
        words={[{ t: 'Or' }, { t: 'what' }, { t: 'happened' }, { t: 'yesterday.' }]}
        size={70}
        delay={16}
        exit={82}
        color={F.ghost}
      />
      <div style={{ marginTop: 34, display: 'flex', gap: 16, alignItems: 'center' }}>
        <Chip delay={30} exit={82} size={36}>
          it needs a few weeks
        </Chip>
        <Chip delay={36} exit={82} size={36}>
          and more than one location
        </Chip>
      </div>
    </Center>
  </Stage>
);

/** 18. the line */
export const SceneMeasure: React.FC = () => (
  <Stage>
    <Center gap={14}>
      <Line
        words={[{ t: 'They' }, { t: 'measure' }, { t: 'the' }, { t: 'campaign.' }]}
        size={84}
        delay={0}
        exit={82}
        color={F.ghost}
      />
      <Line
        words={[{ t: 'Vero' }, { t: 'measures' }, { t: 'the' }, { t: 'money.', color: F.brand }]}
        size={122}
        delay={16}
        exit={82}
      />
    </Center>
  </Stage>
);

/** 19. close */
export const SceneCTA: React.FC = () => {
  const mark = useReveal(0);
  const word = useReveal(3);
  const contact = useReveal(34);
  const vcs = useReveal(44);
  return (
    <Stage>
      <Center gap={26}>
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
        <Line words={[{ t: 'Bring' }, { t: 'us' }, { t: 'a' }, { t: 'month' }]} size={72} delay={10} />
        <div style={{ marginTop: -12 }}>
          <Line words={[{ t: 'you' }, { t: 'already' }, { t: 'argued' }, { t: 'about.' }]} size={72} delay={16} />
        </div>
        <div style={{ marginTop: 12 }}>
          <Sub delay={26} size={29} width={980}>
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
