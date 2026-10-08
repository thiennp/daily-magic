import type { ProjectTaskUiStatus } from "@/features/projects/sync/projectSync.types";

/**
 * Tasks tab display status (UI-only). Sync's ProjectTaskUiStatus plus the
 * terminal run outcomes it folds away, so they never read as "Queued" (DF-027).
 */
export type ProjectTaskDisplayStatus =
  | ProjectTaskUiStatus
  | "denied"
  | "timed_out"
  | "stopped"
  | "stalled"
  | "unknown";

/** Raw agent_runs / local status token → display status (trimmed, lowercased). */
const RUN_STATUS_TO_DISPLAY: ReadonlyMap<string, ProjectTaskDisplayStatus> =
  new Map(
    Object.entries({
      working: "running",
      running: "running",
      assigned: "queued",
      pending_approval: "queued",
      queued: "queued",
      pending: "queued",
      done: "done",
      completed: "done",
      failed: "failed",
      error: "failed",
      cancelled: "cancelled",
      canceled: "cancelled",
      denied: "denied",
      expired: "timed_out",
      timed_out: "timed_out",
      timeout: "timed_out",
      stopped: "stopped",
      stalled: "stalled",
    } satisfies Record<string, ProjectTaskDisplayStatus>),
  );

/** Exhaustive run status → display status; unknown tokens → "unknown" (never "queued"). */
export const mapRunStatusToProjectTaskDisplayStatus = (
  raw: string,
): ProjectTaskDisplayStatus => {
  const token = raw
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");
  return RUN_STATUS_TO_DISPLAY.get(token) ?? "unknown";
};
