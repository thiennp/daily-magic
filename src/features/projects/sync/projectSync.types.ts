/**
 * Project sync module — shared types (S1).
 * Cursor v1 stays History `{ t, id }` base64url — re-exported, no new schema.
 * Neon may store meta only (SPEC HARD); never full bodies/prompts/logs.
 */

/** Same as ProjectHistoryTimelineCursor / ProjectMessengerCursor. */
export type ProjectSyncCursor = {
  readonly t: string;
  readonly id: string;
};

/**
 * page.source — live Messenger uses local|neon|mixed|exhausted.
 * "idb" is additive for client-cache pages (S2 wiring).
 */
export type ProjectSyncPageSource =
  | "local"
  | "neon"
  | "mixed"
  | "exhausted"
  | "idb";

export type ProjectSyncPageMeta = {
  readonly beforeCursor: string | null;
  readonly hasMore: boolean;
  readonly source: ProjectSyncPageSource;
  readonly localLive: boolean;
};

/** Exact Dispatch offline constant (LOCKED). */
export type ProjectSyncOfflineError = {
  readonly code: "project_computer_offline";
  readonly message: "Connection to the project computer was lost.";
};

export const PROJECT_SYNC_COMPUTER_OFFLINE_ERROR: ProjectSyncOfflineError = {
  code: "project_computer_offline",
  message: "Connection to the project computer was lost.",
};

/** Connection FSM states (SPEC §5). */
export type ProjectSyncConnectionState =
  | "unknown"
  | "local_live"
  | "local_offline"
  | "neon_only"
  | "reconciling"
  | "lost";

export type ProjectSyncVersion = {
  readonly version: number;
  readonly updatedAt: string;
};

/** Tasks UI chip statuses (SPEC §6). */
export type ProjectTaskUiStatus =
  | "queued"
  | "running"
  | "done"
  | "failed"
  | "cancelled";

/** Thin title/summary cap for Neon meta (SPEC §6.1 Soft pick ≤200). */
export const PROJECT_SYNC_NEON_SUMMARY_MAX_CHARS = 200;

/** Reconcile push batch size (SPEC §3.2). */
export const PROJECT_SYNC_RECONCILE_BATCH_SIZE = 50;
