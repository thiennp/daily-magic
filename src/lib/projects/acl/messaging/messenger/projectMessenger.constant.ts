import {
  PROJECT_MESSAGE_KIND_TASK_BLOCKED,
  PROJECT_MESSAGE_KIND_TASK_DONE,
  PROJECT_MESSAGE_KIND_TASK_PROCESSING,
  PROJECT_MESSAGE_KIND_TASK_RECEIVED,
  PROJECT_MESSAGE_KIND_TASK_STATUS,
  PROJECT_MESSAGE_UNREAD_CAP,
} from "@/lib/projects/acl/messaging/projectMessage.constants";

/** Thread key of the pinned Whole project thread (one message, one delivery per bot). */
export const PROJECT_MESSENGER_WHOLE_THREAD_KEY = "whole";

/** Composer "Needs a reply" on: actionable task + existing 5/10 min silence watch. */
export const PROJECT_MESSENGER_KIND_NEEDS_REPLY = "task.assign";
/** Composer "Needs a reply" off: plain chat line, no silence watch. */
export const PROJECT_MESSENGER_KIND_NOTE = "chat.note";

/** AI session timeline subtype (`kind`; entryKind is PROJECT_MESSENGER_ENTRY_KIND_SESSION). */
export const PROJECT_MESSENGER_KIND_AI_SESSION = "ai.session";

/**
 * TimelineEntry.entryKind value for AI session rows (History C1 contract).
 * Single source: flip here only if the contract changes.
 */
export const PROJECT_MESSENGER_ENTRY_KIND_SESSION = "session" as const;

/** Reply kinds a bot may post through project_messenger_reply (existing reply kinds). */
export const PROJECT_MESSENGER_REPLY_KINDS = [
  PROJECT_MESSAGE_KIND_TASK_RECEIVED,
  PROJECT_MESSAGE_KIND_TASK_PROCESSING,
  PROJECT_MESSAGE_KIND_TASK_STATUS,
  PROJECT_MESSAGE_KIND_TASK_DONE,
  PROJECT_MESSAGE_KIND_TASK_BLOCKED,
] as const;
export const PROJECT_MESSENGER_DEFAULT_REPLY_KIND =
  PROJECT_MESSAGE_KIND_TASK_STATUS;

/**
 * Bot kinds that only move the per-message state row (Got it / Working on it)
 * and are not shown as chat bubbles.
 */
export const PROJECT_MESSENGER_STATE_ONLY_KINDS: readonly string[] = [
  PROJECT_MESSAGE_KIND_TASK_RECEIVED,
  PROJECT_MESSAGE_KIND_TASK_PROCESSING,
];

/** Lifecycle notices from bots that never become chat bubbles. */
export const PROJECT_MESSENGER_HIDDEN_KINDS: readonly string[] = [
  "peer.joined",
  "peer.left",
  "peer.renamed",
  "composer.recipient_sticky_cleared",
];

/** Rows loaded per view. Equals the project-wide unread cap, so nothing live is cut. */
export const PROJECT_MESSENGER_ROW_LIMIT = PROJECT_MESSAGE_UNREAD_CAP;

/** Thread list preview length (characters). */
export const PROJECT_MESSENGER_PREVIEW_MAX_CHARS = 80;

/** Default / max page size for messenger thread GET (?limit=). */
export const PROJECT_MESSENGER_PAGE_DEFAULT_LIMIT = 50;
export const PROJECT_MESSENGER_PAGE_MAX_LIMIT = 100;
