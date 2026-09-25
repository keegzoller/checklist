import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import '@fontsource-variable/inter';
import '@fontsource-variable/manrope';
import { F, FILM, FILM_TOTAL } from './theme';
import {
  SceneOpen,
  SceneEitherWay,
  SceneThreeUnknowns,
  SceneGut,
  SceneGraded,
  SceneLastExpense,
  SceneIntro,
  SceneConnectPos,
  SceneConnectChannels,
  SceneAttribute,
  SceneNotAnAI,
  SceneDeterministic,
  SceneBaseline,
  SceneForecast,
  SceneSounds,
  SceneTellYouNo,
  SceneOutcomes,
  SceneLimit,
  SceneMeasure,
  SceneCTA,
} from './Scenes';

/**
 * Hard cuts. The seam is hidden by the scenes themselves: every beat blurs its
 * own content out before its last frame, so one white stage dissolves into the
 * next with nothing visibly popping.
 */
const ORDER = [
  [FILM.open, SceneOpen],

  // act 1 -- the three things you don't know
  [FILM.eitherWay, SceneEitherWay],
  [FILM.threeUnknowns, SceneThreeUnknowns],
  [FILM.gut, SceneGut],

  // act 2 -- why nobody can tell you
  [FILM.graded, SceneGraded],
  [FILM.lastExpense, SceneLastExpense],

  // act 3 -- introducing Vero, and what it connects to
  [FILM.intro, SceneIntro],
  [FILM.connectPos, SceneConnectPos],
  [FILM.connectChannels, SceneConnectChannels],
  [FILM.attribute, SceneAttribute],

  // act 4 -- what we are not
  [FILM.notAnAI, SceneNotAnAI],

  // act 5 -- how it actually works
  [FILM.deterministic, SceneDeterministic],
  [FILM.baseline, SceneBaseline],
  [FILM.forecast, SceneForecast],

  // act 6 -- what it sounds like
  [FILM.sounds, SceneSounds],
  [FILM.tellYouNo, SceneTellYouNo],

  // act 7 -- outcomes and close
  [FILM.outcomes, SceneOutcomes],
  [FILM.limit, SceneLimit],
  [FILM.measure, SceneMeasure],
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
