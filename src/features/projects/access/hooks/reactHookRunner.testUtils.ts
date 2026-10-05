import type * as React from "react";

/** While active, useState/useRef/useCallback keep slots across plain-function "renders". */
export const reactHookRunner = {
  active: false,
  slots: [] as unknown[],
  index: 0,
};

/** Runs a hook body once with the runner's slots, outside React. */
export const runWithHookSlots = <T>(hook: () => T): T => {
  reactHookRunner.active = true;
  reactHookRunner.index = 0;
  try {
    return hook();
  } finally {
    reactHookRunner.active = false;
  }
};

/** vi.mock("react") factory body: real React unless the runner is active. */
export const mockReactWithHookRunner = (actual: typeof React): typeof React => {
  const slot = <T>(init: () => T): { get: () => T; set: (v: T) => void } => {
    const at = reactHookRunner.index++;
    if (!(at in reactHookRunner.slots)) reactHookRunner.slots[at] = init();
    return {
      get: () => reactHookRunner.slots[at] as T,
      set: (v: T) => {
        reactHookRunner.slots[at] = v;
      },
    };
  };
  return {
    ...actual,
    useState: (<T>(init: T) => {
      if (!reactHookRunner.active) return actual.useState(init);
      const s = slot(() => init);
      return [s.get(), (v: T) => s.set(v)];
    }) as typeof actual.useState,
    useRef: (<T>(init: T) => {
      if (!reactHookRunner.active) return actual.useRef(init);
      return slot(() => ({ current: init })).get();
    }) as typeof actual.useRef,
    useCallback: (<T>(fn: T, deps: readonly unknown[]) =>
      reactHookRunner.active
        ? fn
        : actual.useCallback(fn as never, deps)) as typeof actual.useCallback,
  };
};
