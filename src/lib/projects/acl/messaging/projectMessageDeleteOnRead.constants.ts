/**
 * Delete-on-read and History computerAck composition for project messages.
 * See projectMessage.constants for retention / caps.
 */

/** Delivery states that allow delete-on-read once read_at is set. */
export const PROJECT_B2B_DELETE_ON_READ_TERMINAL_STATES = [
  "done",
  "blocked",
  "blocked_silent_10m",
] as const;

export type ProjectB2bDeleteOnReadTerminalState =
  (typeof PROJECT_B2B_DELETE_ON_READ_TERMINAL_STATES)[number];

/**
 * History feature 551bf17d (computerAck). Cloud delete composition:
 * - off → delete-on-read / ack unchanged (always allow).
 * - ready | degraded → require a project_message_computer_acks row AND
 *   recipient rules (read+terminal/unwatched, or explicit ack).
 * - un-acked older than 7 days may delete with a thin history-gap marker
 *   (no body); History owns writing that marker.
 */
export const PROJECT_MESSAGE_HISTORY_COMPUTER_ACK_MODE = "off" as const;

export type ProjectMessageHistoryComputerAckMode =
  | typeof PROJECT_MESSAGE_HISTORY_COMPUTER_ACK_MODE
  | "ready"
  | "degraded";
