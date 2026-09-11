import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import '@fontsource-variable/inter';
import '@fontsource-variable/manrope';
import { F, FILM, FILM_TOTAL } from './theme';
import {
  SceneOpen,
  SceneOnlyOne,
  SceneTheRoom,
  SceneSameSale,
  SceneIntro,
  SceneRegister,
  SceneTwoQuestions,
  SceneMethod,
  SceneRefuse,
  SceneProof,
  ScenePartner,
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
  [FILM.onlyOne, SceneOnlyOne],
  [FILM.theRoom, SceneTheRoom],
  [FILM.sameSale, SceneSameSale],
  [FILM.intro, SceneIntro],
  [FILM.register, SceneRegister],
  [FILM.twoQuestions, SceneTwoQuestions],
  [FILM.method, SceneMethod],
  [FILM.refuse, SceneRefuse],
  [FILM.proof, SceneProof],
  [FILM.partner, ScenePartner],
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
