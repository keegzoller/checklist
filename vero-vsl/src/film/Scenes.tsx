import React from 'react';
import { AbsoluteFill } from 'remotion';
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
  useSceneExit,
} from './Motion';
import { Exchange, ExpenseCheck, RefusePanel, ReportCard } from './Panels';
import { CHANNEL_TILES, ConnectGrid, POS_TILES } from './Connect';
import {
  AttributionPanel,
  BaselinePanel,
  DeterministicPanel,
  ForecastPanel,
  LocationAnswer,
  NotThisCard,
  OutcomeCard,
} from './Mechanism';
import { VeroMark } from '../fast/Logos';

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

/* ================================================================== *
 * 1. open
 * ================================================================== */

export const SceneOpen: React.FC = () => {
  const exit = useSceneExit();
  const mark = useReveal(0, exit);
  const word = useReveal(4, exit);
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

/**
 * 2. the hook. Two earlier versions were rejected for shrugging rather than
 *    stating. This one opens on the number so the viewer recognises their own
 *    spend, then names the thing that is actually wrong with it.
 */
export const SceneHook: React.FC = () => {
  const exit = useSceneExit();
  return (
    <Stage>
      <Center gap={0}>
        <Line words={[{ t: '$40,000' }, { t: 'a' }, { t: 'month.' }]} size={136} delay={0} exit={exit} />
        <div style={{ marginTop: 46 }}>
          <Line
            words={[{ t: 'The' }, { t: 'only' }, { t: 'money' }, { t: 'you' }, { t: 'spend' }]}
            size={66}
            delay={26}
            exit={exit}
            color={F.ghost}
          />
          <div style={{ marginTop: 6 }}>
            <Line
              words={[{ t: 'that' }, { t: 'nobody' }, { t: 'can' }, { t: 'account' }, { t: 'for.', color: F.brand }]}
              size={66}
              delay={33}
              exit={exit}
            />
          </div>
        </div>
      </Center>
    </Stage>
  );
};


/**
 * 4. the pause between the two lines is the beat. "And hope" only lands if the
 *    first line has already settled, hence the gap in the delays.
 */
export const SceneInstinct: React.FC = () => {
  const exit = useSceneExit();
  return (
    <Stage>
      <Center gap={0}>
        <Line words={[{ t: 'So' }, { t: 'you' }, { t: 'approve' }, { t: 'it.' }]} size={104} delay={0} exit={exit} />
        <div style={{ marginTop: 18 }}>
          <Line words={[{ t: 'And' }, { t: 'hope.', color: F.brand }]} size={104} delay={20} exit={exit} />
        </div>
        <div style={{ marginTop: 48 }}>
          <Sub delay={40} exit={exit} size={32} width={1220} center color={F.muted}>
            Same as last month. Same as next month.
          </Sub>
        </div>
        <div style={{ marginTop: 12 }}>
          <Sub delay={56} exit={exit} size={32} width={1220} center color={F.ink}>
            <b>You never find out whether you were right — so it never gets better.</b>
          </Sub>
        </div>
      </Center>
    </Stage>
  );
};

/* ================================================================== *
 * ACT 2 -- WHY NOBODY CAN TELL YOU
 * ================================================================== */

/** 5. everyone reporting to you is being graded by themselves */
export const SceneGraded: React.FC = () => {
  const exit = useSceneExit();
  return (
  <Stage flip>
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 60 }}>
      <div style={{ display: 'flex', gap: 34, height: 250 }}>
        <ReportCard
          brand="meta"
          name="Meta"
          claim="+34%"
          detail="how Facebook says Facebook did"
          delay={0}
          exit={exit}
          rotate={-1.3}
        />
        <ReportCard
          brand="googleads"
          name="Google Ads"
          claim="+41%"
          detail="how Google says Google did"
          delay={7}
          exit={exit}
          rotate={0.7}
        />
        <ReportCard
          name="Your agency"
          claim="Great month."
          detail="written by the people being graded"
          delay={14}
          exit={exit}
          rotate={-0.5}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <Line
          words={[{ t: 'None' }, { t: 'of' }, { t: 'your' }, { t: 'channels' }, { t: 'are' }, { t: 'lying.' }]}
          size={74}
          delay={30}
          exit={exit}
          color={F.ghost}
        />
        <div style={{ marginTop: 10 }}>
          <Line
            words={[{ t: 'They' }, { t: 'just' }, { t: "can't" }, { t: 'afford' }, { t: 'to' }, { t: 'tell' }, { t: 'you' }]}
            size={58}
            delay={46}
            exit={exit}
          />
          <Line
            words={[{ t: 'when' }, { t: "it isn't" }, { t: 'working.', color: F.brand }]}
            size={58}
            delay={54}
            exit={exit}
          />
        </div>
      </div>
    </AbsoluteFill>
  </Stage>
  );
};


/** 7. marketing is the last big expense nobody can check */
export const SceneLastExpense: React.FC = () => {
  const exit = useSceneExit();
  return (
  <Stage>
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 52 }}>
      <Line
        words={[{ t: 'Every' }, { t: 'other' }, { t: 'line' }, { t: 'on' }, { t: 'your' }, { t: 'P&L,' }, { t: 'you' }, { t: 'can' }, { t: 'check.' }]}
        size={62}
        delay={0}
        exit={exit}
      />
      <ExpenseCheck delay={12} exit={exit} />
    </AbsoluteFill>
  </Stage>
  );
};

/* ================================================================== *
 * ACT 1 (cont.) -- the three things you don't know
 * ================================================================== */

const UNKNOWNS = [
  'Is my marketing working?',
  'Which channels should I spend on?',
  'How much should I spend?',
];

/** Three questions, each landing with nothing in the answer slot. */
export const SceneThreeUnknowns: React.FC = () => {
  const exit = useSceneExit();
  return (
  <Stage>
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 34 }}>
      {UNKNOWNS.map((q, i) => (
        <UnknownRow key={q} q={q} delay={i * 26} exit={exit} />
      ))}
      <div style={{ marginTop: 26 }}>
        <Line
          words={[{ t: 'Three' }, { t: 'questions.' }, { t: 'No' }, { t: 'answers.', color: F.brand }]}
          size={62}
          delay={104}
          exit={exit}
        />
      </div>
    </AbsoluteFill>
  </Stage>
  );
};

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
  const exit = useSceneExit();
  const mark = useReveal(0, exit);
  const word = useReveal(3, exit);
  return (
    <Stage>
      <Center gap={30}>
        <Eyebrow delay={0} exit={exit} color={F.faint}>
          introducing
        </Eyebrow>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <div style={mark}>
            <VeroMark size={140} tile={false} />
          </div>
          <div
            style={{
              ...word,
              fontFamily: FONT,
              fontSize: 142,
              fontWeight: 700,
              letterSpacing: -5,
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
export const SceneConnectPos: React.FC = () => {
  const exit = useSceneExit();
  return (
  <Stage>
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 42 }}>
      <div style={{ textAlign: 'center' }}>
        <Line words={[{ t: 'It' }, { t: 'starts' }, { t: 'at' }, { t: 'your' }]} size={66} delay={0} exit={exit} />
        <Line words={[{ t: 'point' }, { t: 'of' }, { t: 'sale.', color: F.brand }]} size={66} delay={5} exit={exit} />
      </div>
      <ConnectGrid tiles={POS_TILES} delay={14} exit={exit} cols={6} tileW={182} />
      <Sub delay={78} exit={exit} size={27} width={1100} center>
        Not clicks. Not impressions. The actual money that came through your tills.
      </Sub>
    </AbsoluteFill>
  </Stage>
  );
};

/** Then every channel you buy. */
export const SceneConnectChannels: React.FC = () => {
  const exit = useSceneExit();
  return (
  <Stage flip>
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 42 }}>
      <div style={{ textAlign: 'center' }}>
        <Line words={[{ t: 'Then' }, { t: 'every' }, { t: 'channel' }]} size={66} delay={0} exit={exit} />
        <Line words={[{ t: 'you' }, { t: 'buy.', color: F.brand }]} size={66} delay={5} exit={exit} />
      </div>
      <ConnectGrid tiles={CHANNEL_TILES} delay={12} exit={exit} cols={5} tileW={186} />
    </AbsoluteFill>
  </Stage>
  );
};

/** Where they came from, and what they came for. */
export const SceneAttribute: React.FC = () => {
  const exit = useSceneExit();
  return (
  <Stage>
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 44 }}>
      <div style={{ textAlign: 'center' }}>
        <Line
          words={[{ t: 'So' }, { t: 'you' }, { t: 'can' }, { t: 'see' }, { t: 'where' }, { t: 'they' }, { t: 'came' }, { t: 'from' }]}
          size={58}
          delay={0}
          exit={exit}
        />
        <Line
          words={[{ t: 'and' }, { t: 'what' }, { t: 'they' }, { t: 'came' }, { t: 'for.', color: F.brand }]}
          size={58}
          delay={7}
          exit={exit}
        />
      </div>
      <AttributionPanel delay={16} exit={exit} />
      <Sub delay={86} exit={exit} size={27} width={1240} center>
        Not just which ad they clicked — which locations, which channels, and which items
        actually rang up.
      </Sub>
    </AbsoluteFill>
  </Stage>
  );
};

/* ================================================================== *
 * ACT 4 -- what we are not
 * ================================================================== */

export const SceneNotChatbot: React.FC = () => {
  const exit = useSceneExit();
  return (
  <Stage flip>
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 38 }}>
      <div style={{ textAlign: 'center' }}>
        <Line words={[{ t: 'Vero' }, { t: 'is' }, { t: 'not' }, { t: 'a' }, { t: 'chatbot.' }]} size={88} delay={0} exit={exit} />
        <div style={{ marginTop: 8 }}>
          <Line
            words={[{ t: 'Not' }, { t: 'a' }, { t: 'widget.' }, { t: 'Not' }, { t: 'another' }, { t: 'dashboard.' }]}
            size={62}
            delay={10}
            exit={exit}
            color={F.ghost}
          />
        </div>
      </div>
      <NotThisCard delay={28} exit={exit} />
      <Sub delay={74} exit={exit} size={29} width={1160} color={F.ink} center>
        Those read the same numbers you already couldn’t trust and say them back with more
        confidence. <b>Vero is a measurement system.</b> It starts at your revenue and works
        backwards.
      </Sub>
    </AbsoluteFill>
  </Stage>
  );
};

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

export const SceneDeterministic: React.FC = () => {
  const exit = useSceneExit();
  return (
  <Stage>
    <Mech
      n="01"
      top="Ask it the same question twice."
      bottom="You get the same answer."
      exit={exit}
      subDelay={88}
      sub={
        <>
          That is what <b style={{ color: F.ink }}>deterministic</b> means: the number comes from
          counting your register rows, not from a model generating something that sounds right.
          And you can open the rows it counted.
        </>
      }
    >
      <DeterministicPanel delay={14} exit={exit} />
    </Mech>
  </Stage>
  );
};

export const SceneBaseline: React.FC = () => {
  const exit = useSceneExit();
  return (
  <Stage flip>
    <Mech
      n="02"
      top="It builds the floor —"
      bottom="what happens without you."
      exit={exit}
      subDelay={92}
      sub={
        <>
          Your own unmarketed locations show what demand did on its own.{' '}
          <b style={{ color: F.ink }}>Everything above that line is yours.</b>
        </>
      }
    >
      <BaselinePanel delay={14} exit={exit} />
    </Mech>
  </Stage>
  );
};

export const SceneForecast: React.FC = () => {
  const exit = useSceneExit();
  return (
  <Stage>
    <Mech
      n="03"
      top="And it forecasts"
      bottom="the change before you make it."
      exit={exit}
      subDelay={94}
      sub={
        <>
          Move the money on screen and see what it’s expected to do at the register —{' '}
          <b style={{ color: F.ink }}>with the range, not just the number.</b>
        </>
      }
    >
      <ForecastPanel delay={14} exit={exit} />
    </Mech>
  </Stage>
  );
};

/* ================================================================== *
 * ACT 7 -- outcomes
 * ================================================================== */

export const SceneOutcomes: React.FC = () => {
  const exit = useSceneExit();
  return (
  <Stage flip>
    <AbsoluteFill style={{ justifyContent: 'center', padding: '0 110px', gap: 52 }}>
      <Line
        words={[{ t: 'What' }, { t: 'changes' }, { t: 'for' }, { t: 'you.' }]}
        size={78}
        delay={0}
        exit={exit}
        justify="flex-start"
      />
      <div style={{ display: 'flex', gap: 30, alignItems: 'stretch' }}>
        <OutcomeCard
          n="01"
          title="Clarity in the decision"
          body="You walk into the meeting already knowing which locations are working and which aren’t."
          delay={14}
          exit={exit}
        />
        <OutcomeCard
          n="02"
          title="Better allocation of every dollar"
          body="The next dollar goes where the last one actually produced — not where the report looked best."
          delay={26}
          exit={exit}
        />
        <OutcomeCard
          n="03"
          title="More customers through the door"
          body="Waste gets found in week one instead of next quarter, and that budget goes back to work."
          delay={38}
          exit={exit}
        />
      </div>
    </AbsoluteFill>
  </Stage>
  );
};

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





/**
 * 15. what an answer actually looks like. The screenshot montage that used to
 *     sit here showed Vero starting to work and never finishing, because the
 *     recording stops before it renders one -- so it sold the waiting, not the
 *     answer. This shows the answer, with the location's own trend under it.
 */
export const SceneAnswerTrend: React.FC = () => {
  const exit = useSceneExit();
  return (
  <Stage flip>
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 34 }}>
      <Line
        words={[{ t: 'So' }, { t: 'you' }, { t: 'ask.' }, { t: 'And' }, { t: 'it' }, { t: 'answers.', color: F.brand }]}
        size={62}
        delay={0}
        exit={exit}
      />
      <LocationAnswer delay={10} exit={exit} />
    </AbsoluteFill>
  </Stage>
  );
};



/**
 * 16. the refusal. "The first thing in your marketing that will tell you no"
 *     was too clever to parse in three seconds -- it now says the thing
 *     plainly and the sub explains why the smaller number is the real one.
 */
export const SceneWhenItCant: React.FC = () => {
  const exit = useSceneExit();
  return (
  <Stage>
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 36 }}>
      <div style={{ textAlign: 'center' }}>
        <Line words={[{ t: 'And' }, { t: 'when' }, { t: "it can't" }, { t: 'tell' }, { t: 'yet,' }]} size={70} delay={0} exit={exit} />
        <div style={{ marginTop: 6 }}>
          <Line words={[{ t: 'it' }, { t: 'says' }, { t: 'so.', color: F.brand }]} size={70} delay={8} exit={exit} />
        </div>
      </div>
      <RefusePanel delay={20} exit={exit} />
      <Sub delay={80} exit={exit} size={27} width={1240} center>
        Destin is up 8.4% and Vero will not report it. Schenectady is up 8.2% and it will.{' '}
        <b style={{ color: F.ink }}>The difference isn’t the size of the number</b> — it’s whether
        that location is steady enough for the number to mean anything.
      </Sub>
    </AbsoluteFill>
  </Stage>
  );
};

/* ================================================================== *
 * ACT 5 -- THE CLOSE
 * ================================================================== */


/** 18. the tagline. One line, held. */
export const SceneTagline: React.FC = () => {
  const exit = useSceneExit();
  return (
  <Stage>
    <Center gap={0}>
      <Line words={[{ t: 'Decisions' }, { t: 'made' }, { t: 'simple.' }]} size={124} delay={0} exit={exit} />
    </Center>
  </Stage>
  );
};

/** 19. close: the mark, the name, and where to reach us. Nothing else. */
export const SceneCTA: React.FC = () => {
  const mark = useReveal(0);
  const word = useReveal(4);
  const contact = useReveal(26);
  return (
    <Stage>
      <Center gap={0}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={mark}>
            <VeroMark size={150} tile={false} />
          </div>
          <div
            style={{
              ...word,
              fontFamily: FONT,
              fontSize: 152,
              fontWeight: 700,
              letterSpacing: -5.4,
              color: F.ink,
            }}
          >
            Vero
          </div>
        </div>
        <div
          style={{
            ...contact,
            marginTop: 54,
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            fontFamily: FONT_UI,
            fontSize: 32,
            color: F.ink,
          }}
        >
          <span style={{ fontWeight: 700, color: F.brand }}>vc-solutions.net</span>
          <Sep />
          <span>info@vc-solutions.net</span>
        </div>
      </Center>
    </Stage>
  );
};

const Sep: React.FC = () => (
  <span style={{ width: 5, height: 5, borderRadius: 99, background: F.faint, display: 'block' }} />
);
