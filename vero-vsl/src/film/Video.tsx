import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import '@fontsource-variable/inter';
import '@fontsource-variable/manrope';
import { F, FILM, FILM_TOTAL } from './theme';
import {
  SceneOpen,
  SceneHook,
  SceneThreeUnknowns,
  SceneInstinct,
  SceneGraded,
  SceneLastExpense,
  SceneIntro,
  SceneConnectPos,
  SceneConnectChannels,
  SceneAttribute,
  SceneNotChatbot,
  SceneDeterministic,
  SceneBaseline,
  SceneForecast,
  SceneAnswerTrend,
  SceneWhenItCant,
  SceneOutcomes,
  SceneTagline,
  SceneCTA,
} from './Scenes';

/**
 * Hard cuts. The seam is hidden by the scenes themselves: every beat blurs its
 * own content out before its last frame, so one white stage dissolves into the
 * next with nothing visibly popping.
 */
const ORDER = [
  [FILM.open, SceneOpen],

  // act 1 -- what you don't know
  [FILM.hook, SceneHook],
  [FILM.threeUnknowns, SceneThreeUnknowns],
  [FILM.instinct, SceneInstinct],

  // act 2 -- why nobody can tell you
  [FILM.graded, SceneGraded],
  [FILM.lastExpense, SceneLastExpense],

  // act 3 -- introducing Vero, and what it connects to
  [FILM.intro, SceneIntro],
  [FILM.connectPos, SceneConnectPos],
  [FILM.connectChannels, SceneConnectChannels],
  [FILM.attribute, SceneAttribute],

  // act 4 -- what we are not
  [FILM.notChatbot, SceneNotChatbot],

  // act 5 -- how it actually works
  [FILM.deterministic, SceneDeterministic],
  [FILM.baseline, SceneBaseline],
  [FILM.forecast, SceneForecast],

  // act 6 -- an answer, and a refusal
  [FILM.answerTrend, SceneAnswerTrend],
  [FILM.whenItCant, SceneWhenItCant],

  // act 7 -- outcomes and close
  [FILM.outcomes, SceneOutcomes],
  [FILM.tagline, SceneTagline],
  [FILM.cta, SceneCTA],
] as const;

export const VeroFilm: React.FC = () => (
  <AbsoluteFill style={{ background: F.page }}>
    {ORDER.map(([s, Comp], i) => (
      <Sequence key={i} from={s.from} durationInFrames={s.dur}>
        <Comp />
      </Sequence>
    ))}
  </AbsoluteFill>
);

export { FILM_TOTAL };
