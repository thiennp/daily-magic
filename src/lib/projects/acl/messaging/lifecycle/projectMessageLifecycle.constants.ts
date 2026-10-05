/**
 * Message lifecycle FSA (Arch FSA style). Exactly two states; anything not in
 * the arrow table is illegal.
 *
 * - READ: hidden from the unread inbox (read_at set). The row may still exist.
 * - SAVED_TO_PROJECT_FOLDER: a project_message_computer_acks row exists
 *   (History mig 060, device_id NOT NULL). History owns writing that row.
 *
 * `null` on an arrow end means "outside the FSA": an unread row on entry, or a
 * row already removed from the cloud on exit.
 *
 * Ownership:
 * - Dispatch: markRead (stampProjectInboxReadAt), deleteFromCloud ordering
 *   (deleteProjectMessageThroughLifecycle).
 * - History: saveToProjectFolder (recordSavedToProjectFolder) and the delete
 *   gate (gateProjectMessageDelete), run last inside
 *   deleteProjectMessageWithOutcome. Until History lands, the stub call site
 *   is isComputerAckSatisfiedForCloudDelete (mode "off" → always allows).
 *
 * Cloud delete rule (Lead plan):
 * - History ON (on_configuring | on_ready | degraded): cloud delete ONLY after
 *   SAVED_TO_PROJECT_FOLDER (folder ack). Never on age / 7d / timeout. The 7d
 *   marker is flag + wake the machine only — it is NOT an arrow and never
 *   bypasses the History gate.
 * - History OFF: OFF-only exception — DOR rules may delete from READ via the
 *   gate allow. No age-delete arrow exists in either mode.
 */
export const PROJECT_MESSAGE_CLOUD_DELETE_REQUIRES_FOLDER_ACK_WHEN_HISTORY_ON =
  true as const;
export const PROJECT_MESSAGE_LIFECYCLE_STATES = [
  "READ",
  "SAVED_TO_PROJECT_FOLDER",
] as const;

export type ProjectMessageLifecycleState =
  (typeof PROJECT_MESSAGE_LIFECYCLE_STATES)[number];

export type ProjectMessageLifecycleOwner = "dispatch" | "history";

export type ProjectMessageLifecycleArrowSpec = {
  readonly from: ProjectMessageLifecycleState | null;
  readonly to: ProjectMessageLifecycleState | null;
  readonly owner: ProjectMessageLifecycleOwner;
};

export const PROJECT_MESSAGE_LIFECYCLE_ARROWS = {
  /** Inbox fetch stamps read_at (stampProjectInboxReadAt). */
  markRead: { from: null, to: "READ", owner: "dispatch" },
  /** History: recordSavedToProjectFolder writes the 060 ack row. */
  saveToProjectFolder: {
    from: "READ",
    to: "SAVED_TO_PROJECT_FOLDER",
    owner: "history",
  },
  /**
   * DOR readiness → History gate → deleteProjectMessageWithOutcome.
   * Only arrow that leaves the cloud; there is no age/7d/timeout arrow.
   */
  deleteFromCloud: {
    from: "SAVED_TO_PROJECT_FOLDER",
    to: null,
    owner: "dispatch",
  },
} as const satisfies Readonly<Record<string, ProjectMessageLifecycleArrowSpec>>;

export type ProjectMessageLifecycleArrow =
  keyof typeof PROJECT_MESSAGE_LIFECYCLE_ARROWS;
