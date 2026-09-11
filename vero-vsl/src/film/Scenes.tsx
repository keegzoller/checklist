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
import {
  AnswerPanel,
  DoubleCount,
  Exchange,
  ExpenseCheck,
  LeakPanel,
  LocationValue,
  MethodPanel,
  NextDollar,
  RefusePanel,
  ReportCard,
} from './Panels';
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

/** 3. every month, the same decision */
export const SceneEveryMonth: React.FC = () => (
  <Stage flip>
    <Center gap={12}>
      <Line words={[{ t: 'You' }, { t: 'get' }, { t: 'a' }, { t: 'report.' }]} size={80} delay={0} exit={104} color={F.ghost} />
      <Line words={[{ t: 'The' }, { t: 'charts' }, { t: 'go' }, { t: 'up.' }]} size={80} delay={10} exit={104} color={F.ghost} />
      <Line words={[{ t: 'Everyone' }, { t: 'sounds' }, { t: 'pleased.' }]} size={80} delay={20} exit={104} color={F.ghost} />
      <div style={{ marginTop: 46 }}>
        <Line
          words={[{ t: 'And' }, { t: 'you' }, { t: 'still' }, { t: "don't" }, { t: 'know' }]}
          size={92}
          delay={44}
          exit={104}
        />
        <div style={{ marginTop: 4 }}>
          <Line
            words={[{ t: 'whether' }, { t: 'to' }, { t: 'spend' }, { t: 'more' }, { t: 'or' }, { t: 'less.' }]}
            size={92}
            delay={52}
            exit={104}
          />
        </div>
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

/** 6. and two of them counted the same sale */
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
      <div style={{ width: 620, flexShrink: 0 }}>
        <Line words={[{ t: 'Two' }, { t: 'of' }, { t: 'them' }]} size={98} delay={0} exit={86} justify="flex-start" />
        <Line words={[{ t: 'counted' }, { t: 'the' }]} size={98} delay={6} exit={86} justify="flex-start" />
        <Line words={[{ t: 'same' }, { t: 'sale.' }]} size={98} delay={11} exit={86} justify="flex-start" />
      </div>
      <DoubleCount delay={8} exit={86} />
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
 * ACT 3 -- WHAT VERO DOES
 * ================================================================== */

/** 8. it looks at your register -- REAL SCREEN */
export const SceneRegister: React.FC = () => (
  <Stage>
    <Panel delay={4} exit={106} x={700} y={196} width={1760}>
      {REAL('screen-connections.png')}
    </Panel>
    <AbsoluteFill style={{ justifyContent: 'center', paddingLeft: 112 }}>
      <div style={{ width: 520 }}>
        <PanelLabel top="Vero looks at" bottom="your register." delay={0} exit={106} size={72} />
        <div style={{ marginTop: 30 }}>
          <Sub delay={18} exit={106} size={29} width={480}>
            Not clicks. Not impressions. Not a platform’s estimate of a visit — the actual
            money that came through your tills.
          </Sub>
        </div>
      </div>
    </AbsoluteFill>
  </Stage>
);

/** 9. the quiet ones show what would have happened anyway */
export const SceneQuietOnes: React.FC = () => (
  <Stage flip>
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 42 }}>
      <div style={{ textAlign: 'center' }}>
        <Line
          words={[{ t: 'Then' }, { t: 'it' }, { t: 'compares' }, { t: 'the' }, { t: 'locations' }]}
          size={62}
          delay={0}
          exit={126}
        />
        <Line
          words={[{ t: "you're" }, { t: 'advertising' }, { t: 'at' }, { t: 'against' }, { t: 'the' }, { t: 'ones' }, { t: "you're", color: F.brand }, { t: 'not.', color: F.brand }]}
          size={62}
          delay={7}
          exit={126}
        />
      </div>
      <MethodPanel delay={16} exit={126} />
      <div style={{ textAlign: 'center' }}>
        <Sub delay={72} exit={126} size={30} width={1240}>
          The quiet ones show what would have happened anyway.{' '}
          <b style={{ color: F.ink }}>The difference is what your marketing did.</b>
        </Sub>
      </div>
    </AbsoluteFill>
  </Stage>
);

/* ================================================================== *
 * ACT 4 -- WHAT YOU ACTUALLY GET
 * ================================================================== */

/** 10. the title card for the act */
export const SceneWhatYouGet: React.FC = () => (
  <Stage>
    <Center gap={16}>
      <Eyebrow delay={0} exit={44} color={F.faint}>
        not a dashboard · not another login
      </Eyebrow>
      <Line
        words={[{ t: 'Four' }, { t: 'things' }, { t: "you've" }, { t: 'never' }, { t: 'had.' }]}
        size={104}
        delay={6}
        exit={44}
      />
    </Center>
  </Stage>
);

const GetLayout: React.FC<{
  n: string;
  top: string;
  bottom: string;
  children: React.ReactNode;
  exit: number;
}> = ({ n, top, bottom, children, exit }) => (
  <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 40 }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: 16 }}>
        <NumRule n={n} exit={exit} />
      </div>
      <Line words={[{ t: top }]} size={64} delay={3} exit={exit} />
      <Line words={[{ t: bottom, color: F.brand }]} size={64} delay={7} exit={exit} />
    </div>
    {children}
  </AbsoluteFill>
);

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

/** 11. which locations it is working at, and what that is worth */
export const SceneGetLocations: React.FC = () => (
  <Stage>
    <GetLayout n="01" top="Where it's working," bottom="and what that's worth." exit={96}>
      <LocationValue delay={10} exit={96} />
    </GetLayout>
  </Stage>
);

/** 12. where the next dollar should go */
export const SceneGetNextDollar: React.FC = () => (
  <Stage flip>
    <GetLayout n="02" top="Where the next" bottom="dollar should go." exit={96}>
      <NextDollar delay={10} exit={96} />
    </GetLayout>
  </Stage>
);

/** 13. money that is leaking, the week it starts */
export const SceneGetLeak: React.FC = () => (
  <Stage>
    <GetLayout n="03" top="Money that's leaking," bottom="the week it starts." exit={96}>
      <LeakPanel delay={10} exit={96} />
    </GetLayout>
  </Stage>
);

/** 14. someone to ask, any time you wonder -- REAL SCREEN */
export const SceneGetAsk: React.FC = () => (
  <Stage>
    <Panel delay={6} exit={102} x={880} y={74} width={1500} zoom={0.045}>
      {REAL('screen-ask.png')}
    </Panel>
    <AbsoluteFill style={{ paddingLeft: 112, paddingTop: 126 }}>
      <div style={{ width: 680 }}>
        <div style={{ marginBottom: 26 }}>
          <NumRule n="04" exit={102} />
        </div>
        <PanelLabel top="Someone to ask," bottom="any time you wonder." delay={3} exit={102} size={62} />
        <div style={{ marginTop: 28 }}>
          <Sub delay={16} exit={102} size={28} width={620}>
            Not a monthly meeting. A question, whenever it occurs to you, answered in a
            sentence you can act on.
          </Sub>
        </div>
      </div>
    </AbsoluteFill>
  </Stage>
);

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
      <Sub delay={72} exit={116} size={27} width={1180}>
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
