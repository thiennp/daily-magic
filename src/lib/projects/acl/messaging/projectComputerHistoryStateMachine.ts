/**
 * Project computer history: per-project opt-in state, stored in
 * project_computer_history_settings. Anything not in the table is illegal.
 * The full flow and the unsaved-overdue flag/wake are documented in
 * orchestrateProjectComputerHistory.ts.
 */
export const PROJECT_COMPUTER_HISTORY_STATES = [
  "off",
  "on_configuring",
  "on_ready",
  "degraded",
] as const;

export type ProjectComputerHistoryState =
  (typeof PROJECT_COMPUTER_HISTORY_STATES)[number];

export type ProjectComputerHistoryEvent =
  | "owner_enable"
  | "owner_disable"
  | "computer_config_valid"
  | "computer_offline"
  | "computer_write_failed"
  | "computer_backlog_acked";

type TransitionRow = Readonly<
  Partial<Record<ProjectComputerHistoryEvent, ProjectComputerHistoryState>>
>;

export const PROJECT_COMPUTER_HISTORY_TRANSITIONS: Readonly<
  Record<ProjectComputerHistoryState, TransitionRow>
> = {
  /** Only an explicit owner toggle leaves off. Never automatic. */
  off: { owner_enable: "on_configuring", owner_disable: "off" },
  on_configuring: {
    owner_enable: "on_configuring",
    owner_disable: "off",
    computer_config_valid: "on_ready",
  },
  on_ready: {
    owner_enable: "on_ready",
    owner_disable: "off",
    computer_config_valid: "on_ready",
    computer_offline: "degraded",
    computer_write_failed: "degraded",
  },
  /** Back to on_ready only once the backlog is acked. */
  degraded: {
    owner_enable: "degraded",
    owner_disable: "off",
    computer_offline: "degraded",
    computer_write_failed: "degraded",
    computer_backlog_acked: "on_ready",
  },
};

/**
 * History ON: every state but off. New messages are pushed to the project
 * computer, and the cloud deletes a message only after its folder-save
 * computerAck (on_configuring too, so setup never deletes before the computer
 * can save). Only off keeps delete-on-read / TTL without an ack.
 */
export const PROJECT_COMPUTER_HISTORY_ON_STATES: readonly ProjectComputerHistoryState[] =
  ["on_configuring", "on_ready", "degraded"];
