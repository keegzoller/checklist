import React from 'react';
import { Img, staticFile } from 'remotion';
import { L, FONT_BODY } from '../theme';

/**
 * Light browser chrome. Vero's UI is light, so a dark window frame would read
 * as a different product sitting on the dark stage.
 */
export const ScreenFrame: React.FC<{
  children: React.ReactNode;
  width?: number;
  style?: React.CSSProperties;
}> = ({ children, width = 1200, style }) => (
  <div
    style={{
      width,
      borderRadius: 16,
      overflow: 'hidden',
      background: L.surface,
      border: '1px solid rgba(255,255,255,0.10)',
      boxShadow: '0 60px 150px rgba(0,0,0,0.66), 0 0 0 1px rgba(12,14,20,0.35)',
      ...style,
    }}
  >
    <div
      style={{
        height: 46,
        background: '#EDEFF4',
        borderBottom: `1px solid ${L.border}`,
        display: 'flex',
        alignItems: 'center',
        padding: '0 18px',
        gap: 9,
      }}
    >
      {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
        <span key={c} style={{ width: 11, height: 11, borderRadius: 6, background: c }} />
      ))}
      <div
        style={{
          marginLeft: 20,
          padding: '6px 18px',
          borderRadius: 7,
          background: L.surface,
          border: `1px solid ${L.border}`,
          color: L.dim,
          fontFamily: FONT_BODY,
          fontSize: 15,
          letterSpacing: 0.2,
        }}
      >
        dashboard.vc-solutions.net
      </div>
    </div>
    {children}
  </div>
);

export const RealScreenshot: React.FC<{ file: string }> = ({ file }) => (
  <Img src={staticFile(`screens/${file}`)} style={{ width: '100%', display: 'block' }} />
);
