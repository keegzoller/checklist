import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import '@fontsource-variable/inter';
// Anton is vc-solutions.net's heading font, self-hosted from npm so the render
// never reaches for Google Fonts.
import '@fontsource/anton';
import { FAST, FAST_TOTAL, V } from './theme';
import {
  SceneHook,
  SceneButWhere,
  SceneSpendVsProof,
  SceneTheyBought,
  SceneConnect,
  SceneNoMore,
  SceneSteps,
  ScenePosLogos,
  SceneChannelLogos,
  SceneWhereTheyAre,
  ScenePayoff,
  SceneCTA,
} from './Scenes';

/**
 * Unlike the original 1:20 cut, these are HARD CUTS. The style depends on the
 * colour flipping between scenes on a single frame -- cross-fading white into
 * indigo just produces four frames of grey mud. Every scene paints its own
 * full-bleed background from frame 0, so there is no gap to fade through.
 */
const ORDER = [
  [FAST.hook, SceneHook],
  [FAST.butWhere, SceneButWhere],
  [FAST.spendVsProof, SceneSpendVsProof],
  [FAST.theyBought, SceneTheyBought],
  [FAST.connect, SceneConnect],
  [FAST.noMore, SceneNoMore],
  [FAST.steps, SceneSteps],
  [FAST.posLogos, ScenePosLogos],
  [FAST.channelLogos, SceneChannelLogos],
  [FAST.whereTheyAre, SceneWhereTheyAre],
  [FAST.payoff, ScenePayoff],
  [FAST.cta, SceneCTA],
] as const;

export const VeroFast: React.FC = () => (
  <AbsoluteFill style={{ background: V.page }}>
    {ORDER.map(([s, Comp], i) => (
      <Sequence key={i} from={s.from} durationInFrames={s.dur}>
        <Comp />
      </Sequence>
    ))}
  </AbsoluteFill>
);

export { FAST_TOTAL };
