import fs from "node:fs";

import {
  readCodingToolsPause,
  resolveCodingToolsPausePath,
} from "./codingToolsPauseStore";

export const CODING_TOOLS_PAUSE_POLL_MS = 1_000;

/**
 * Calls onChange(paused) whenever the pause switch flips (stat polling, so
 * any writer — local app route, CLI, hand edit — is seen). Returns unwatch.
 */
export const watchCodingToolsPause = (
  configPath: string,
  onChange: (paused: boolean) => void,
  intervalMs: number = CODING_TOOLS_PAUSE_POLL_MS,
): (() => void) => {
  const filePath = resolveCodingToolsPausePath(configPath);
  const state = { paused: readCodingToolsPause(configPath).paused };
  const listener = (): void => {
    const next = readCodingToolsPause(configPath).paused;
    if (next === state.paused) {
      return;
    }
    state.paused = next;
    onChange(next);
  };
  fs.watchFile(filePath, { interval: intervalMs, persistent: false }, listener);
  return () => {
    fs.unwatchFile(filePath, listener);
  };
};
