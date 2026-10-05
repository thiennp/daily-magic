/**
 * Bot A → bot B delivery states, per project_message_deliveries row.
 * Timeouts are explicit events. Anything not in the table is illegal.
 * Terminal states (no next state): blocked_silent_10m, acked.
 */
export const PROJECT_B2B_STATES = [
  "dispatched",
  "woken",
  "awaiting_first_activity",
  "silent_5m_notified",
  "blocked_silent_10m",
  "received",
  "processing",
  "status_reporting",
  "done",
  "blocked",
  "acked",
] as const;

export type ProjectB2bState = (typeof PROJECT_B2B_STATES)[number];

export type ProjectB2bEvent =
  | "wake_accepted"
  | "watch_started"
  | "received"
  | "processing"
  | "status"
  | "done"
  | "blocked"
  | "ack"
  | "timeout_5m"
  | "timeout_10m";

type TransitionRow = Readonly<Partial<Record<ProjectB2bEvent, ProjectB2bState>>>;

/** Any activity from B while waiting puts the delivery back on the normal path. */
const ACTIVITY_FROM_WAITING: TransitionRow = {
  received: "received",
  processing: "processing",
  status: "status_reporting",
  done: "done",
  blocked: "blocked",
  ack: "acked",
};

export const PROJECT_B2B_TRANSITIONS: Readonly<
  Record<ProjectB2bState, TransitionRow>
> = {
  dispatched: { wake_accepted: "woken", ack: "acked" },
  woken: { watch_started: "awaiting_first_activity", ack: "acked" },
  awaiting_first_activity: {
    ...ACTIVITY_FROM_WAITING,
    timeout_5m: "silent_5m_notified",
  },
  silent_5m_notified: {
    ...ACTIVITY_FROM_WAITING,
    timeout_10m: "blocked_silent_10m",
  },
  received: {
    received: "received",
    processing: "processing",
    status: "status_reporting",
    done: "done",
    blocked: "blocked",
    ack: "acked",
  },
  processing: {
    processing: "processing",
    status: "status_reporting",
    done: "done",
    blocked: "blocked",
    ack: "acked",
  },
  status_reporting: {
    status: "status_reporting",
    done: "done",
    blocked: "blocked",
    ack: "acked",
  },
  done: { ack: "acked" },
  blocked: { ack: "acked" },
  /** Terminal: a late reply or ack must not reopen a timed-out delivery. */
  blocked_silent_10m: {},
  acked: {},
};
