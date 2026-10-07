import {
  PROJECT_MESSAGE_KIND_TASK_BLOCKED,
  PROJECT_MESSAGE_KIND_TASK_DONE,
  PROJECT_MESSAGE_KIND_TASK_PROCESSING,
  PROJECT_MESSAGE_KIND_TASK_RECEIVED,
  PROJECT_MESSAGE_KIND_TASK_STATUS,
} from "@/lib/projects/acl/messaging/projectMessage.constants";

/**
 * Pure status kinds: stored and delivered as usual, but never fire a Grok
 * routine wake (or a task.processing receipt) on the recipient bot, so two
 * bot templates cannot ping-pong status replies (DF-022).
 */
export const PROJECT_MESSAGE_NO_WAKE_STATUS_KINDS: readonly string[] = [
  PROJECT_MESSAGE_KIND_TASK_RECEIVED,
  PROJECT_MESSAGE_KIND_TASK_PROCESSING,
  PROJECT_MESSAGE_KIND_TASK_STATUS,
  PROJECT_MESSAGE_KIND_TASK_DONE,
  PROJECT_MESSAGE_KIND_TASK_BLOCKED,
];

const NO_WAKE_KINDS: ReadonlySet<string> = new Set(
  PROJECT_MESSAGE_NO_WAKE_STATUS_KINDS,
);

/**
 * Wake policy (DF-022): pure status kinds never wake the recipient bot. The
 * message is still stored and listed in the inbox; only the wake (and its
 * receipt) is skipped, and the stored wake result is skipped_by_policy.
 */
export const isProjectMessageWakeSkippedByPolicy = (kind: string): boolean =>
  NO_WAKE_KINDS.has(kind.trim());
