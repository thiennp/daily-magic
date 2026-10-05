import type { LocalProjectHistoryState } from "./localProjectHistoryState";

/** History ON locally: configuring, ready, or degraded (never off/missing). */
export const isLocalProjectHistoryOn = (
  state: LocalProjectHistoryState | null | undefined,
): boolean =>
  state === "on_ready" || state === "degraded" || state === "on_configuring";
