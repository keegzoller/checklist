import React from 'react';
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from 'remotion';
import '@fontsource-variable/inter';
import '@fontsource-variable/manrope';
import { Backdrop, Scene } from './components/Base';
import { C, FONT_BODY, FONT_HEAD, SCENES, TOTAL } from './theme';
import {
  SceneHook,
  SceneOneCampaign,
  SceneBlindSpot,
  SceneClicks,
  SceneConnect,
  SceneAsk,
  SceneAnswer,
  SceneDifferentiator,
  SceneCTA,
} from './scenes/Scenes';

const ORDER = [
  [SCENES.hook, SceneHook],
  [SCENES.oneCampaign, SceneOneCampaign],
  [SCENES.blindSpot, SceneBlindSpot],
  [SCENES.clicks, SceneClicks],
  [SCENES.connect, SceneConnect],
  [SCENES.ask, SceneAsk],
  [SCENES.answer, SceneAnswer],
  [SCENES.differentiator, SceneDifferentiator],
  [SCENES.cta, SceneCTA],
] as const;

const OVERLAP = 14;

const Watermark: React.FC = () => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [30, 60, SCENES.cta.from - 30, SCENES.cta.from], [0, 0.5, 0.5, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        position: 'absolute',
        top: 56,
        right: 74,
        opacity: o,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <span
        style={{
          fontFamily: FONT_HEAD,
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: 5,
          color: C.white,
        }}
      >
        VERO
      </span>
      <span style={{ width: 1, height: 18, background: C.line }} />
      <span style={{ fontFamily: FONT_BODY, fontSize: 18, letterSpacing: 3, color: C.muted }}>
        BY VCS
      </span>
    </div>
  );
};

const Progress: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 4 }}>
      <div
        style={{
          height: '100%',
          width: `${(frame / TOTAL) * 100}%`,
          background: `linear-gradient(90deg, ${C.blue}, ${C.blueLight})`,
          opacity: 0.85,
        }}
      />
    </div>
  );
};

export const VeroVSL: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    <Backdrop />
    {ORDER.map(([s, Comp], i) => {
      // Scenes overlap by OVERLAP frames so one cross-fades into the next
      // instead of both sitting at zero opacity on the boundary.
      const isLast = i === ORDER.length - 1;
      const dur = isLast ? s.dur : s.dur + OVERLAP;
      return (
        <Sequence key={i} from={s.from} durationInFrames={dur}>
          <Scene durationInFrames={dur} fadeOut={!isLast}>
            <Comp />
          </Scene>
        </Sequence>
      );
    })}
    <Watermark />
    <Progress />
  </AbsoluteFill>
);
