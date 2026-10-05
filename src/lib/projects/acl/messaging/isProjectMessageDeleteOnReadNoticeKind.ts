import {
  PROJECT_MESSAGE_KIND_PEER_SILENT,
  PROJECT_MESSAGE_KIND_PEER_SILENT_BLOCKED,
} from "@/lib/projects/acl/messaging/projectMessage.constants";

/** Pure peer/system notices — listing may still make these delete-on-read eligible. */
const NOTICE_KINDS = new Set<string>([
  "peer.joined",
  "peer.left",
  "peer.renamed",
  PROJECT_MESSAGE_KIND_PEER_SILENT,
  PROJECT_MESSAGE_KIND_PEER_SILENT_BLOCKED,
]);

/**
 * True for notice-only kinds that may delete-on-read after read + unwatched/terminal.
 * Actionable kinds (task.*, owner/member dispatches) need explicit ack or terminal.
 */
export const isProjectMessageDeleteOnReadNoticeKind = (kind: string): boolean =>
  NOTICE_KINDS.has(kind);
