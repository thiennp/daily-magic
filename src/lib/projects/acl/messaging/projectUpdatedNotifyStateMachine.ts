/**
 * Debounced project.updated notify per projectId.
 * idle = no row; pending = waiting for trailing window; flushed = claimed for notify.
 * A change while pending stays pending and resets flush_after (trailing debounce).
 * Stale flushed rows reclaim to pending after ~60s (crash / notify failure).
 */
export const PROJECT_UPDATED_NOTIFY_STATES = [
  "idle",
  "pending",
  "flushed",
] as const;

export type ProjectUpdatedNotifyState =
  (typeof PROJECT_UPDATED_NOTIFY_STATES)[number];

export type ProjectUpdatedNotifyEvent =
  | "schedule"
  | "flush_due"
  | "notify_done"
  | "reclaim_stale";

type TransitionRow = Readonly<
  Partial<Record<ProjectUpdatedNotifyEvent, ProjectUpdatedNotifyState>>
>;

export const PROJECT_UPDATED_NOTIFY_TRANSITIONS: Readonly<
  Record<ProjectUpdatedNotifyState, TransitionRow>
> = {
  idle: { schedule: "pending" },
  pending: { schedule: "pending", flush_due: "flushed" },
  flushed: {
    notify_done: "idle",
    schedule: "pending",
    reclaim_stale: "pending",
  },
};
