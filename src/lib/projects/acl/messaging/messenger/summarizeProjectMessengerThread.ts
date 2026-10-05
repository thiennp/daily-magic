import { PROJECT_MESSENGER_PREVIEW_MAX_CHARS } from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";
import type {
  ProjectMessengerKeyedRow,
  ProjectMessengerThreadSummary,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";

/**
 * Visible rows of one thread (oldest first) → last message + unread count.
 * Unread = visible rows newer than the viewer's last read, not sent by the viewer.
 */
export const summarizeProjectMessengerThread = (input: {
  readonly rows: readonly ProjectMessengerKeyedRow[];
  readonly lastReadAt: string | null;
  readonly viewerUserId: string;
}): ProjectMessengerThreadSummary => {
  const visible = input.rows.filter((keyed) => keyed.visible);
  const last = visible.at(-1) ?? null;
  const readAtMs =
    input.lastReadAt === null ? null : Date.parse(input.lastReadAt);
  const unreadCount = visible.filter(
    (keyed) =>
      keyed.row.senderUserId !== input.viewerUserId &&
      (readAtMs === null || Date.parse(keyed.row.createdAt) > readAtMs),
  ).length;
  return {
    lastMessageAt: last === null ? null : last.row.createdAt,
    lastPreview:
      last === null
        ? null
        : last.text.slice(0, PROJECT_MESSENGER_PREVIEW_MAX_CHARS),
    unreadCount,
  };
};
