/**
 * SCREENSHOT SLOTS
 * ----------------
 * Files live in public/screens/. Cut from the 2026-09-07 screen recording of
 * dashboard.vc-solutions.net unless noted.
 *
 * Set a value to null to fall back to a designed mock (only `answer` has one).
 */
export const SCREENS = {
  /** Connections page: sources reconciling into the Vero measurement layer. */
  connections: 'screen-connections.png' as string | null,

  /** Workspace home: stat row plus the four starter investigations. */
  ask: 'screen-ask.png' as string | null,

  /** "Reading every location in the register" investigating state. */
  investigating: 'screen-investigating.png' as string | null,

  /**
   * The answer itself. The recording ends before Vero renders one, so this is
   * still a designed mock tagged "sample view". Drop a real capture here and
   * the whole video is real product footage.
   */
  answer: null as string | null,
};
