import React from 'react';
import { Composition } from 'remotion';
import { VeroVSL } from './Video';
import { FPS, WIDTH, HEIGHT, TOTAL } from './theme';
import { VeroFast } from './fast/Video';
import { FAST_TOTAL } from './fast/theme';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="VeroVSL"
      component={VeroVSL}
      durationInFrames={TOTAL}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
    <Composition
      id="VeroFast"
      component={VeroFast}
      durationInFrames={FAST_TOTAL}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  </>
);
