import { PROJECT_MESSENGER_PEER_LIFECYCLE_KINDS } from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";
import { PROJECT_MESSAGE_NOTICE_KINDS } from "@/lib/projects/acl/messaging/messenger/projectMessageWindowKind.constant";
import type { ProjectMessengerRow } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";
import {
  PROJECT_MESSAGE_KIND_PEER_SILENT,
  PROJECT_MESSAGE_KIND_PEER_SILENT_BLOCKED,
} from "@/lib/projects/acl/messaging/projectMessage.constants";

/** Who reads the thread: notice visibility differs (owner sees all notices). */
export type ProjectMessengerNoticeViewer = "owner" | "member";

const LIFECYCLE_KINDS: ReadonlySet<string> = new Set(
  PROJECT_MESSENGER_PEER_LIFECYCLE_KINDS,
);

const SILENCE_KINDS: ReadonlySet<string> = new Set([
  PROJECT_MESSAGE_KIND_PEER_SILENT,
  PROJECT_MESSAGE_KIND_PEER_SILENT_BLOCKED,
]);

/** Notice row: a server notice (no sender seat) or a silence/lifecycle kind. */
export const isProjectMessengerNoticeRow = (
  row: ProjectMessengerRow,
): boolean =>
  row.senderKind === "system" ||
  PROJECT_MESSAGE_NOTICE_KINDS.includes(row.kind);

/**
 * Which notice rows a viewer gets (one row per event, no fan-out copies):
 * - peer.joined/left/renamed: the owner's copy only (every viewer).
 * - peer.silent / peer.silent_blocked: owner only, whoever was told.
 * - other server notices (sticky cleared, wake…): owner only, owner-addressed.
 */
export const showProjectMessengerNoticeRow = (input: {
  readonly row: ProjectMessengerRow;
  readonly viewer: ProjectMessengerNoticeViewer;
}): boolean => {
  const { row } = input;
  if (LIFECYCLE_KINDS.has(row.kind)) return row.recipientKind === "owner";
  if (input.viewer !== "owner") return false;
  if (SILENCE_KINDS.has(row.kind)) return true;
  return row.recipientKind === "owner" || row.recipientKind === "none";
};
