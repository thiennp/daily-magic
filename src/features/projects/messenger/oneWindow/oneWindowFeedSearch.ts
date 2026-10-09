import type { AwcMessengerTimelineEntry } from "@/features/projects/messenger/types/awcProjectMessenger.type";

/** Case-insensitive match on the message text and who wrote it; empty query keeps everything. */
export const filterOneWindowEntriesByQuery = (
  entries: readonly AwcMessengerTimelineEntry[],
  query: string,
): readonly AwcMessengerTimelineEntry[] => {
  const needle = query.trim().toLowerCase();
  if (needle === "") return entries;
  return entries.filter((entry) =>
    `${entry.text} ${entry.author.displayName ?? ""}`
      .toLowerCase()
      .includes(needle),
  );
};
