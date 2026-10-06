import type { AwcMessengerTimelineEntry } from "@/features/projects/messenger/types/awcProjectMessenger.type";

const byCreatedAt = (
  a: AwcMessengerTimelineEntry,
  b: AwcMessengerTimelineEntry,
): number =>
  a.createdAt < b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0;

/**
 * Union of the browser copy and the latest server window, oldest-first.
 * Server rows win (fresh state chips). Rows the server no longer returns
 * (ack / delete-on-read / TTL) stay — that is the point of the browser copy.
 */
export const mergeMessengerChatEntries = (
  cached: readonly AwcMessengerTimelineEntry[],
  server: readonly AwcMessengerTimelineEntry[],
): readonly AwcMessengerTimelineEntry[] => {
  const byId = new Map<string, AwcMessengerTimelineEntry>();
  cached.forEach((entry) => byId.set(entry.messageId, entry));
  server.forEach((entry) => byId.set(entry.messageId, entry));
  return [...byId.values()].sort(byCreatedAt);
};
