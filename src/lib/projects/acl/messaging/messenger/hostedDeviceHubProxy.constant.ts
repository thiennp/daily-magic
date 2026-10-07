/**
 * Hosted→device History page hub proxy constants.
 *
 * Timeout picked at 3s: short enough that Load older never hangs the UI,
 * long enough for a local page read + one hub RTT on a healthy device.
 * Soft-degrade to Neon meta on timeout / error / old AWL bundle.
 */

/** Hub wait for project.history.page.result before Neon soft-degrade. */
export const HOSTED_DEVICE_HISTORY_PAGE_TIMEOUT_MS = 3_000;

/**
 * Min AWL install bundle that understands PROJECT_HISTORY_PAGE_REQUEST.
 * Older bundles ignore the type → timeout → Neon fallback (safe).
 */
export const HOSTED_DEVICE_HISTORY_PAGE_MIN_BUNDLE_VERSION = "268";

/** Explicit request lifecycle for the in-memory registry (and any future relay). */
export const PROJECT_HISTORY_PAGE_REQUEST_STATES = [
  "pending",
  "completed",
  "failed",
  "expired",
] as const;

export type ProjectHistoryPageRequestState =
  (typeof PROJECT_HISTORY_PAGE_REQUEST_STATES)[number];
