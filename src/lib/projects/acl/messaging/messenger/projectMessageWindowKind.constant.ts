import {
  PROJECT_MESSAGE_KIND_PEER_SILENT,
  PROJECT_MESSAGE_KIND_PEER_SILENT_BLOCKED,
  PROJECT_MESSAGE_KIND_COMPOSER_RECIPIENT_STICKY_CLEARED,
  PROJECT_MESSAGE_KIND_TASK_BLOCKED,
  PROJECT_MESSAGE_KIND_TASK_DONE,
  PROJECT_MESSAGE_KIND_TASK_PROCESSING,
  PROJECT_MESSAGE_KIND_TASK_RECEIVED,
  PROJECT_MESSAGE_KIND_TASK_STATUS,
} from "@/lib/projects/acl/messaging/projectMessage.constants";

/**
 * One-window row kind: the DESIGN §3.1 `window_kind` enum (OW1 CHECK order).
 * OW9 sends it as `windowKind` on messenger timeline rows. It is a code, not
 * copy; the UI never shows it.
 */
export const PROJECT_MESSAGE_WINDOW_KINDS = [
  "chat",
  "task",
  "task_update",
  "approval_request",
  "approval_result",
  "notice",
  "bot_to_bot",
] as const;

export type ProjectMessageWindowKind =
  (typeof PROJECT_MESSAGE_WINDOW_KINDS)[number];

/** DESIGN §3.1 `task_update`: bot task reply / receipt kinds. */
export const PROJECT_MESSAGE_TASK_UPDATE_KINDS: readonly string[] = [
  PROJECT_MESSAGE_KIND_TASK_PROCESSING,
  PROJECT_MESSAGE_KIND_TASK_RECEIVED,
  PROJECT_MESSAGE_KIND_TASK_STATUS,
  PROJECT_MESSAGE_KIND_TASK_DONE,
  PROJECT_MESSAGE_KIND_TASK_BLOCKED,
];

/** DESIGN §3.1 `notice`: silence notices and lifecycle (joined/left/renamed). */
export const PROJECT_MESSAGE_NOTICE_KINDS: readonly string[] = [
  PROJECT_MESSAGE_KIND_PEER_SILENT,
  PROJECT_MESSAGE_KIND_PEER_SILENT_BLOCKED,
  PROJECT_MESSAGE_KIND_COMPOSER_RECIPIENT_STICKY_CLEARED,
  "peer.joined",
  "peer.left",
  "peer.renamed",
];
