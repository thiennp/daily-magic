import type { ProjectMessengerTimelineEntry } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";

const byNewestFirst = (
  left: ProjectMessengerTimelineEntry,
  right: ProjectMessengerTimelineEntry,
): number => {
  if (left.createdAt !== right.createdAt) {
    return left.createdAt < right.createdAt ? 1 : -1;
  }
  return left.messageId < right.messageId ? 1 : -1;
};

/**
 * Merge message + session Neon slices (both newest-first) into one page.
 * Dedupes by messageId (UUID collision across tables is negligible).
 */
export const mergeProjectMessengerNeonTimelinePage = (input: {
  readonly messageEntries: readonly ProjectMessengerTimelineEntry[];
  readonly messageHasMore: boolean;
  readonly sessionEntries: readonly ProjectMessengerTimelineEntry[];
  readonly sessionHasMore: boolean;
  readonly limit: number;
}): {
  readonly entries: readonly ProjectMessengerTimelineEntry[];
  readonly hasMore: boolean;
} => {
  const byId = new Map<string, ProjectMessengerTimelineEntry>();
  for (const entry of input.messageEntries) {
    byId.set(entry.messageId, entry);
  }
  for (const entry of input.sessionEntries) {
    byId.set(entry.messageId, entry);
  }
  const merged = [...byId.values()].sort(byNewestFirst);
  const hasMore =
    merged.length > input.limit ||
    input.messageHasMore ||
    input.sessionHasMore;
  return {
    entries: merged.slice(0, input.limit),
    hasMore,
  };
};
