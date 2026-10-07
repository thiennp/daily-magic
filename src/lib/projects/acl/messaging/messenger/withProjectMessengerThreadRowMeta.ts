import type { ProjectMessengerThreadRowEntry } from "@/lib/projects/acl/messaging/messenger/projectMessengerThreadRow.type";
import type { ProjectMessengerWindowTimelineEntry } from "@/lib/projects/acl/messaging/messenger/projectMessengerWindowFields.type";

const parentOf = (entry: ProjectMessengerWindowTimelineEntry): string | null =>
  entry.inReplyTo !== null && entry.inReplyTo !== entry.messageId
    ? entry.inReplyTo
    : null;

/**
 * Group one page by parent: every row gets `parentMessageId` and the ids of
 * its direct replies in this page (`replyIds`, oldest first), plus
 * `archived` (null when absent). Order is unchanged (newest first), so the
 * flat list still renders as before; grouping UIs nest by these fields.
 */
export const withProjectMessengerThreadRowMeta = (
  entries: readonly ProjectMessengerWindowTimelineEntry[],
): readonly ProjectMessengerThreadRowEntry[] => {
  const repliesByParent = new Map<string, string[]>();
  // Newest-first page → walk oldest first so reply ids come out oldest first.
  [...entries].reverse().forEach((entry) => {
    const parent = parentOf(entry)?.toLowerCase();
    if (parent === undefined) return;
    repliesByParent.set(parent, [
      ...(repliesByParent.get(parent) ?? []),
      entry.messageId,
    ]);
  });
  return entries.map((entry) => ({
    ...entry,
    parentMessageId: parentOf(entry),
    replyIds: repliesByParent.get(entry.messageId.toLowerCase()) ?? [],
    archived: entry.archived ?? null,
  }));
};
