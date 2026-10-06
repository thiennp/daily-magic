import type { AwcMessengerTimelineEntry } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import {
  MESSENGER_CHAT_MAX_AGE_MS,
  MESSENGER_CHAT_MAX_MESSAGES,
} from "@/features/projects/messenger/utils/messengerChatStore.constant";

/** No per-message "stored on a computer" signal reaches Human UI yet. */
export const NO_COMPUTER_STORED_CONFIRMATION = (): boolean => false;

/**
 * Quiet browser trim (no UI). Input is oldest-first. A message is dropped
 * only when ALL hold: older than 1 week, outside the newest 1000, and
 * confirmed stored on a computer. No owner computer → never trim.
 * The chat record itself is never removed — only old message bodies.
 */
export const pruneMessengerChatEntries = (input: {
  readonly entries: readonly AwcMessengerTimelineEntry[];
  readonly now: number;
  readonly hasOwnerComputer: boolean;
  readonly isStoredOnComputer: (entry: AwcMessengerTimelineEntry) => boolean;
}): readonly AwcMessengerTimelineEntry[] => {
  const { entries, now, hasOwnerComputer, isStoredOnComputer } = input;
  if (!hasOwnerComputer) return entries;
  const cutoff = now - MESSENGER_CHAT_MAX_AGE_MS;
  const newestStart = Math.max(0, entries.length - MESSENGER_CHAT_MAX_MESSAGES);
  return entries.filter((entry, index) => {
    const createdMs = Date.parse(entry.createdAt);
    const olderThanWeek = Number.isFinite(createdMs) && createdMs < cutoff;
    const outsideNewest = index < newestStart;
    return !(olderThanWeek && outsideNewest && isStoredOnComputer(entry));
  });
};
