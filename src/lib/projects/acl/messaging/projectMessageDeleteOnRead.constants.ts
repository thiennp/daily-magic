/**
 * Delete-on-read constants for project messages.
 *
 * History composition (opt-in per project via project_computer_history_settings):
 * when gated (on_configuring / on_ready / degraded), cloud deletes a message ONLY after the
 * folder-save computerAck (gateProjectMessageDelete). Seven days of no ack
 * triggers unsavedOverdue flag + throttled wake only — never an age-based
 * delete or history gap marker. History off → normal delete-on-read / TTL.
 * See projectMessage.constants for retention / caps.
 */

/**
 * Delivery states that allow delete-on-read once read_at is set.
 * Kept for silence-tracked deliveries (actionable and notices).
 * Actionable kinds still need these (or explicit ack) — unwatched alone is not enough.
 */
export const PROJECT_B2B_DELETE_ON_READ_TERMINAL_STATES = [
  "done",
  "blocked",
  "blocked_silent_10m",
] as const;

export type ProjectB2bDeleteOnReadTerminalState =
  (typeof PROJECT_B2B_DELETE_ON_READ_TERMINAL_STATES)[number];
