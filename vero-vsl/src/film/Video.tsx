import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import '@fontsource-variable/inter';
import '@fontsource-variable/manrope';
import { F, FILM, FILM_TOTAL } from './theme';
import {
  SceneOpen,
  SceneEitherWay,
  SceneEveryMonth,
  SceneGut,
  SceneGraded,
  SceneSameSale,
  SceneLastExpense,
  SceneRegister,
  SceneQuietOnes,
  SceneWhatYouGet,
  SceneGetLocations,
  SceneGetNextDollar,
  SceneGetLeak,
  SceneGetAsk,
  SceneSounds,
  SceneTellYouNo,
  SceneLimit,
  SceneMeasure,
  SceneCTA,
} from './Scenes';

/**
 * Hard cuts, like the poster cut -- but here the seam is hidden by the scenes
 * themselves: every beat blurs its own content out before its last frame, so
 * one white stage dissolves into the next with nothing visibly popping.
 */
const ORDER = [
  [FILM.open, SceneOpen],

  // act 1 -- the feeling
  [FILM.eitherWay, SceneEitherWay],
  [FILM.everyMonth, SceneEveryMonth],
  [FILM.gut, SceneGut],

  // act 2 -- why nobody can tell you
  [FILM.graded, SceneGraded],
  [FILM.sameSale, SceneSameSale],
  [FILM.lastExpense, SceneLastExpense],

  // act 3 -- what Vero does
  [FILM.register, SceneRegister],
  [FILM.quietOnes, SceneQuietOnes],

  // act 4 -- what you actually get
  [FILM.whatYouGet, SceneWhatYouGet],
  [FILM.getLocations, SceneGetLocations],
  [FILM.getNextDollar, SceneGetNextDollar],
  [FILM.getLeak, SceneGetLeak],
  [FILM.getAsk, SceneGetAsk],
  [FILM.sounds, SceneSounds],
  [FILM.tellYouNo, SceneTellYouNo],

  // act 5 -- the close
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
