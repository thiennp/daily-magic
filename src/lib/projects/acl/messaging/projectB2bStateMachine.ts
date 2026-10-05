/**
 * Bot A → bot B delivery states, per project_message_deliveries row.
 * Timeouts are explicit events. Anything not in the table is illegal.
 *
 * Silence-watched states (those with a timeout_5m edge) time out 5 min after
 * the wake or B's last activity. Activity that lands in processing or
 * status_reporting restarts that clock and re-allows one ask.
 * Terminal states (no next state): blocked_silent_10m, acked.
 */
export const PROJECT_B2B_STATES = [
  "dispatched",
  "awaiting_first_activity",
  "silent_5m_notified",
  "blocked_silent_10m",
  "processing",
  "status_reporting",
  "done",
  "blocked",
  "acked",
] as const;

export type ProjectB2bState = (typeof PROJECT_B2B_STATES)[number];

export type ProjectB2bEvent =
  | "wake_accepted"
  | "processing"
  | "status"
  | "done"
  | "blocked"
  | "ack"
  | "timeout_5m"
  | "timeout_10m";

type TransitionRow = Readonly<Partial<Record<ProjectB2bEvent, ProjectB2bState>>>;

/** B's activity on the normal path, from any waiting or working state. */
const ACTIVITY: TransitionRow = {
  processing: "processing",
  status: "status_reporting",
  done: "done",
  blocked: "blocked",
  ack: "acked",
};

export const PROJECT_B2B_TRANSITIONS: Readonly<
  Record<ProjectB2bState, TransitionRow>
> = {
  dispatched: { wake_accepted: "awaiting_first_activity", ack: "acked" },
  awaiting_first_activity: { ...ACTIVITY, timeout_5m: "silent_5m_notified" },
  processing: { ...ACTIVITY, timeout_5m: "silent_5m_notified" },
  status_reporting: {
    status: "status_reporting",
    done: "done",
    blocked: "blocked",
    ack: "acked",
    timeout_5m: "silent_5m_notified",
  },
  /** A told, B asked once. Activity returns to the normal path. */
  silent_5m_notified: { ...ACTIVITY, timeout_10m: "blocked_silent_10m" },
  done: { ack: "acked" },
  blocked: { ack: "acked" },
  /** Terminal: a late reply or ack must not reopen a timed-out delivery. */
  blocked_silent_10m: {},
  acked: {},
};

/** States the silence check reads: those with a timeout edge. */
export const PROJECT_B2B_SILENCE_CHECK_STATES: readonly ProjectB2bState[] =
  PROJECT_B2B_STATES.filter((state) => {
    const row = PROJECT_B2B_TRANSITIONS[state];
    return row.timeout_5m !== undefined || row.timeout_10m !== undefined;
  });

/** States whose silence clock restarts on entry from B's activity. */
export const PROJECT_B2B_TIMER_RESET_STATES: readonly ProjectB2bState[] = [
  "processing",
  "status_reporting",
];
