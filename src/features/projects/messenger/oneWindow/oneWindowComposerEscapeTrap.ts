const trapState = { depth: 0 };

/** Active while inline @ mention picker (or similar) should consume Esc before Chat dock. */
export const pushOneWindowComposerEscapeTrap = (): (() => void) => {
  trapState.depth += 1;
  return () => {
    trapState.depth = Math.max(0, trapState.depth - 1);
  };
};

export const isOneWindowComposerEscapeTrapActive = (): boolean =>
  trapState.depth > 0;
