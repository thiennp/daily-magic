import {
  PROJECT_MESSAGE_KIND_TASK_BLOCKED,
  PROJECT_MESSAGE_KIND_TASK_DONE,
  PROJECT_MESSAGE_KIND_TASK_PROCESSING,
  PROJECT_MESSAGE_KIND_TASK_RECEIVED,
  PROJECT_MESSAGE_KIND_TASK_STATUS,
} from "@/lib/projects/acl/messaging/projectMessage.constants";

/**
 * No-wake list (DF-022, Lead decision): pure progress kinds. Stored and
 * delivered as usual, but never fire a Grok routine wake (or a task.processing
 * receipt) on any recipient, so two bot templates cannot ping-pong status.
 */
export const PROJECT_MESSAGE_NO_WAKE_STATUS_KINDS: readonly string[] = [
  PROJECT_MESSAGE_KIND_TASK_RECEIVED,
  PROJECT_MESSAGE_KIND_TASK_PROCESSING,
  PROJECT_MESSAGE_KIND_TASK_STATUS,
];

/**
 * Terminal kinds (DF-026): wake ONLY the bot that assigned the task, i.e. the
 * sender of the message the reply points at (see
 * resolveProjectMessageWakeRecipients). Every other recipient, and every
 * recipient when the assigner cannot be resolved, is skipped_by_policy.
 */
export const PROJECT_MESSAGE_ASSIGNER_ONLY_WAKE_KINDS: readonly string[] = [
  PROJECT_MESSAGE_KIND_TASK_DONE,
  PROJECT_MESSAGE_KIND_TASK_BLOCKED,
];

const NO_WAKE_KINDS: ReadonlySet<string> = new Set(
  PROJECT_MESSAGE_NO_WAKE_STATUS_KINDS,
);
const ASSIGNER_ONLY_KINDS: ReadonlySet<string> = new Set(
  PROJECT_MESSAGE_ASSIGNER_ONLY_WAKE_KINDS,
);

export const isProjectMessageAssignerOnlyWakeKind = (kind: string): boolean =>
  ASSIGNER_ONLY_KINDS.has(kind.trim());

/**
 * Ack events (DF-026): a kind whose last dot segment is ack / acked /
 * acknowledge(d) (e.g. "ack", "task.ack", "msg.acked") is bookkeeping, never
 * work, so it must not wake anyone. Server-side ack_project_message itself
 * stores no message; this covers bots that report acks as messages.
 * The pattern is exported as a STRING (case-insensitive by contract) so
 * Wake's coalesce SQL binds it to Postgres `~*` instead of re-typing it.
 */
export const PROJECT_MESSAGE_ACK_EVENT_KIND_PATTERN =
  "^(?:[a-z0-9_-]+\\.)*(?:ack|acked|acknowledge|acknowledged)$";

const ACK_EVENT_KIND = new RegExp(PROJECT_MESSAGE_ACK_EVENT_KIND_PATTERN, "i");

export const isProjectMessageAckEventKind = (kind: string): boolean =>
  ACK_EVENT_KIND.test(kind.trim());

/** No-wake list: received / processing / status + ack events (never wake). */
export const isProjectMessageNeverWakeKind = (kind: string): boolean =>
  NO_WAKE_KINDS.has(kind.trim()) || isProjectMessageAckEventKind(kind);

/**
 * Kind-level gate (DF-022 / DF-026): true = this kind never gets a broadcast
 * wake nor an HMAC task.processing receipt. That is the no-wake list plus the
 * terminal kinds; done / blocked may still wake the single assigner bot via
 * resolveProjectMessageWakeRecipients. Skipped recipients store
 * skipped_by_policy.
 */
export const isProjectMessageWakeSkippedByPolicy = (kind: string): boolean =>
  isProjectMessageNeverWakeKind(kind) ||
  isProjectMessageAssignerOnlyWakeKind(kind);
