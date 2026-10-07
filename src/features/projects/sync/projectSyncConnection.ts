/**
 * Connection FSM over detectProjectMessengerLocalLive (SPEC §5).
 * Minimal pure transitions; probe I/O stays at the call site.
 */

import type { ProjectSyncConnectionState } from "@/features/projects/sync/projectSync.types";

export type ProjectSyncConnectionEvent =
  | { readonly type: "probe"; readonly localLive: boolean }
  | { readonly type: "neon_ok" }
  | { readonly type: "load_older_exhausted_offline" }
  | { readonly type: "retry" }
  | { readonly type: "reconcile_start" }
  | { readonly type: "reconcile_done" }
  | { readonly type: "local_back" };

/**
 * Reduce connection state. Safe to call repeatedly; unknown stays quiet.
 */
export const reduceProjectSyncConnection = (
  state: ProjectSyncConnectionState,
  event: ProjectSyncConnectionEvent,
): ProjectSyncConnectionState => {
  switch (event.type) {
    case "probe":
      if (event.localLive) {
        if (
          state === "local_offline" ||
          state === "neon_only" ||
          state === "lost" ||
          state === "unknown"
        ) {
          // Caller may enter reconciling explicitly; probe alone → local_live
          // when already live path, else leave reconciling to reconcile_start.
          return state === "unknown" || state === "lost"
            ? "local_live"
            : "local_live";
        }
        return "local_live";
      }
      if (state === "local_live" || state === "reconciling") {
        return "local_offline";
      }
      if (state === "unknown") {
        return "local_offline";
      }
      return state === "lost" ? "lost" : state;

    case "neon_ok":
      if (state === "local_offline" || state === "unknown") {
        return "neon_only";
      }
      return state;

    case "load_older_exhausted_offline":
      return "lost";

    case "retry":
      if (state === "lost") {
        return "neon_only";
      }
      return state;

    case "local_back":
      if (
        state === "local_offline" ||
        state === "neon_only" ||
        state === "lost"
      ) {
        return "reconciling";
      }
      return state;

    case "reconcile_start":
      if (
        state === "local_offline" ||
        state === "neon_only" ||
        state === "lost" ||
        state === "local_live"
      ) {
        return "reconciling";
      }
      return state;

    case "reconcile_done":
      if (state === "reconciling") {
        return "local_live";
      }
      return state;

    default:
      return state;
  }
};

/**
 * Map a boolean probe (+ optional neon answered) into an initial state.
 */
export const projectSyncConnectionFromProbe = (input: {
  readonly localLive: boolean;
  readonly neonAnswered?: boolean;
}): ProjectSyncConnectionState => {
  if (input.localLive) {
    return "local_live";
  }
  if (input.neonAnswered === true) {
    return "neon_only";
  }
  return "local_offline";
};

/** True when Load older may hit AWL local page. */
export const isProjectSyncLocalPaging = (
  state: ProjectSyncConnectionState,
): boolean => state === "local_live" || state === "reconciling";
