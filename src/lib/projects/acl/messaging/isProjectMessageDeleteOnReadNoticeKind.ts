import {
  PROJECT_MESSAGE_LIFECYCLE_KINDS,
  PROJECT_MESSAGE_SYSTEM_NOTICE_KINDS,
} from "@/lib/projects/acl/messaging/projectMessage.constants";

/** Peer/system notices — listing may still make these delete-on-read eligible. */
const NOTICE_KINDS = new Set<string>([
  ...PROJECT_MESSAGE_LIFECYCLE_KINDS,
  ...PROJECT_MESSAGE_SYSTEM_NOTICE_KINDS,
]);

/**
 * True for notice-only kinds that may delete-on-read after read + unwatched/terminal.
 * Actionable kinds (task.*, owner/member dispatches) need explicit ack or terminal.
 */
export const isProjectMessageDeleteOnReadNoticeKind = (kind: string): boolean =>
  NOTICE_KINDS.has(kind);
