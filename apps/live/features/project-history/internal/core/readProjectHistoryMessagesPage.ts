import type { ProjectMessengerTimelineEntry } from "../../../../adapters/projectHistorySharedMappers";

import { getLocalChatMessage } from "./getLocalChatMessage";
import { listLocalChatIndexPage } from "./listLocalChatIndexPage";
import { mapHistoryRecordToTimelineEntry } from "./mapHistoryRecordToTimelineEntry";
import {
  decodeProjectHistoryTimelineCursor,
  encodeProjectHistoryTimelineCursor,
} from "./projectHistoryTimelineCursor";

export type ReadProjectHistoryMessagesPageInput = {
  readonly projectId: string;
  readonly threadKey: string;
  /** Opaque base64url `{"t","id"}`. Omit / blank = first (newest) page. */
  readonly beforeCursor?: string | null;
  readonly limit: number;
};

export type ReadProjectHistoryMessagesPageResult = {
  /** Newest-first TimelineEntry rows for this thread. */
  readonly entries: readonly ProjectMessengerTimelineEntry[];
  /** Opaque cursor of the oldest entry in `entries`, or null when none / no more. */
  readonly nextBeforeCursor: string | null;
  readonly hasMore: boolean;
};

/**
 * History half of Messenger "Load older": page local history for one thread.
 * Entries are newest-first. Relies on S5 index (sqlite) with file-scan fallback
 * via `listLocalChatIndexPage`. threadKey is the v2 index field (or derived
 * into the index on ingest from message.threadKey / thread_key / messenger
 * keying — see `deriveProjectHistoryThreadKey` / `extractHistoryIndexFields`).
 */
export const readProjectHistoryMessagesPage = (
  input: ReadProjectHistoryMessagesPageInput,
): ReadProjectHistoryMessagesPageResult => {
  const decoded = decodeProjectHistoryTimelineCursor(input.beforeCursor);
  if (decoded === "invalid") {
    return { entries: [], nextBeforeCursor: null, hasMore: false };
  }

  const fetchLimit =
    typeof input.limit === "number" && Number.isFinite(input.limit)
      ? Math.max(1, Math.floor(input.limit))
      : 50;

  const page = listLocalChatIndexPage({
    projectId: input.projectId,
    threadKey: input.threadKey,
    beforeCreatedAt: decoded?.t ?? null,
    beforeMessageId: decoded?.id ?? null,
    limit: fetchLimit + 1,
  });

  const hasMore = page.rows.length > fetchLimit;
  const rows = hasMore ? page.rows.slice(0, fetchLimit) : page.rows;

  const entries: ProjectMessengerTimelineEntry[] = [];
  for (const row of rows) {
    const body = getLocalChatMessage({
      projectId: input.projectId,
      messageId: row.messageId,
    });
    if (body === null) {
      // Index-only hit without body: still surface a minimal bubble so paging
      // does not skip the cursor key.
      entries.push({
        messageId: row.messageId,
        createdAt: row.createdAt,
        author: { kind: "owner", membershipId: null, displayName: null },
        kind: "chat.note",
        text: "",
        needsReply: false,
        inReplyTo: null,
        states: [],
      });
      continue;
    }
    entries.push(mapHistoryRecordToTimelineEntry(body));
  }

  const oldest = entries.length > 0 ? entries[entries.length - 1] : undefined;
  const nextBeforeCursor =
    hasMore && oldest !== undefined
      ? encodeProjectHistoryTimelineCursor({
          t: oldest.createdAt,
          id: oldest.messageId,
        })
      : null;

  return { entries, nextBeforeCursor, hasMore };
};

/** Alias matching the locked Dispatch call name. */
export const loadOlderProjectHistoryMessages = readProjectHistoryMessagesPage;
