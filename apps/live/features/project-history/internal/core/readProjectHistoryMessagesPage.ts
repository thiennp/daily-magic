import type { ProjectMessengerTimelineEntry } from "../../../../adapters/projectHistorySharedMappers";

import { getLocalChatMessage } from "./getLocalChatMessage";
import { listLocalChatIndexPage } from "./listLocalChatIndexPage";
import { listProjectHistoryAiSessions } from "./listProjectHistoryAiSessions";
import {
  aiSessionMatchesThreadKey,
  mapAiSessionRecordToTimelineEntry,
} from "./mapAiSessionRecordToTimelineEntry";
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

const compareNewestFirst = (
  left: ProjectMessengerTimelineEntry,
  right: ProjectMessengerTimelineEntry,
): number => {
  if (left.createdAt !== right.createdAt) {
    return left.createdAt < right.createdAt ? 1 : -1;
  }
  return left.messageId < right.messageId ? 1 : -1;
};

const isStrictlyOlderThanCursor = (
  entry: ProjectMessengerTimelineEntry,
  beforeCreatedAt: string | null | undefined,
  beforeId: string | null | undefined,
): boolean => {
  if (
    beforeCreatedAt === undefined ||
    beforeCreatedAt === null ||
    beforeCreatedAt === ""
  ) {
    return true;
  }
  if (entry.createdAt < beforeCreatedAt) {
    return true;
  }
  if (entry.createdAt > beforeCreatedAt) {
    return false;
  }
  if (beforeId === undefined || beforeId === null || beforeId === "") {
    return true;
  }
  return entry.messageId < beforeId;
};

/**
 * History half of Messenger "Load older": page local history for one thread.
 * Merges chat messages with C1 AI session records (tasks/) on `whole` only.
 * Entries are newest-first. Cursor: base64url({ t: createdAt, id }) where id
 * is messageId for messages and raw agentRunId for sessions.
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

  const beforeCreatedAt = decoded?.t ?? null;
  const beforeId = decoded?.id ?? null;

  // Over-fetch messages so merge with sessions still fills a page.
  const page = listLocalChatIndexPage({
    projectId: input.projectId,
    threadKey: input.threadKey,
    beforeCreatedAt,
    beforeMessageId: beforeId,
    limit: fetchLimit + 1,
  });

  const messageEntries: ProjectMessengerTimelineEntry[] = [];
  for (const row of page.rows) {
    const body = getLocalChatMessage({
      projectId: input.projectId,
      messageId: row.messageId,
    });
    if (body === null) {
      messageEntries.push({
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
    messageEntries.push(mapHistoryRecordToTimelineEntry(body));
  }

  const sessionEntries: ProjectMessengerTimelineEntry[] = [];
  for (const record of listProjectHistoryAiSessions(input.projectId)) {
    if (!aiSessionMatchesThreadKey(record, input.threadKey)) {
      continue;
    }
    const entry = mapAiSessionRecordToTimelineEntry(record);
    if (!isStrictlyOlderThanCursor(entry, beforeCreatedAt, beforeId)) {
      continue;
    }
    sessionEntries.push(entry);
  }

  const merged = [...messageEntries, ...sessionEntries].sort(compareNewestFirst);
  // Dedupe by messageId (local wins over duplicate); prefer first seen after sort.
  const byId = new Map<string, ProjectMessengerTimelineEntry>();
  for (const entry of merged) {
    if (!byId.has(entry.messageId)) {
      byId.set(entry.messageId, entry);
    }
  }
  const sorted = [...byId.values()].sort(compareNewestFirst);
  const hasMore = sorted.length > fetchLimit;
  const entries = hasMore ? sorted.slice(0, fetchLimit) : sorted;

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
