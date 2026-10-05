/**
 * Unsaved-overdue threshold for project computer history.
 * When History is gated (on_configuring / on_ready / degraded), a message still without a
 * computerAck after this long is flagged for the owner and may trigger a
 * throttled re-push wake. It is never deleted for age alone.
 */
export const PROJECT_COMPUTER_HISTORY_UNSAVED_FLAG_AFTER_DAYS = 7;

export const PROJECT_COMPUTER_HISTORY_UNSAVED_FLAG_AFTER_MS =
  PROJECT_COMPUTER_HISTORY_UNSAVED_FLAG_AFTER_DAYS * 24 * 60 * 60 * 1000;

/** Min interval between overdue re-push wakes per project. */
export const PROJECT_COMPUTER_HISTORY_UNSAVED_WAKE_MIN_INTERVAL_MS =
  24 * 60 * 60 * 1000;

/** Max backlog messages returned to the project computer per request. */
export const PROJECT_COMPUTER_HISTORY_BACKLOG_LIMIT = 100;

/** Outbox idempotency key prefix for the project computer notify. */
export const PROJECT_COMPUTER_HISTORY_NOTIFY_KEY_PREFIX = "project-history:";

/** Idempotency key prefix for overdue unsaved re-push wakes. */
export const PROJECT_COMPUTER_HISTORY_UNSAVED_WAKE_KEY_PREFIX =
  "project-history-unsaved:";

/** What the project computer (AWL) may report. Nothing else is accepted or stored. */
export const PROJECT_COMPUTER_HISTORY_REPORTS = ["ready", "degraded"] as const;

export type ProjectComputerHistoryReport =
  (typeof PROJECT_COMPUTER_HISTORY_REPORTS)[number];
