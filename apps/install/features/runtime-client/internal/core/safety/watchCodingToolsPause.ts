import { readCodingToolsPause } from "./codingToolsPauseStore";

export const CODING_TOOLS_PAUSE_POLL_MS = 1_000;

/**
 * Calls onChange(paused) whenever the pause switch flips (stat polling, so
 * any writer — local app route, CLI, hand edit — is seen). Returns unwatch.
 *
 * Uses setInterval (not fs.watchFile): Darwin watchFile is unreliable for
 * create-via-atomic-rename under load, which flakes the notify test in CI.
 */
export const watchCodingToolsPause = (
  configPath: string,
  onChange: (paused: boolean) => void,
  intervalMs: number = CODING_TOOLS_PAUSE_POLL_MS,
): (() => void) => {
  const state = { paused: readCodingToolsPause(configPath).paused };
  const tick = (): void => {
    const next = readCodingToolsPause(configPath).paused;
    if (next === state.paused) {
      return;
    }
    state.paused = next;
    onChange(next);
  };
  const timer = setInterval(tick, intervalMs);
  // Match prior fs.watchFile({ persistent: false }): do not keep process alive alone.
  timer.unref?.();
  return () => {
    clearInterval(timer);
  };
};
