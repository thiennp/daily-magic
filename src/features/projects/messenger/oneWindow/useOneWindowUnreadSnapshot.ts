"use client";

import { useState } from "react";

import type { AwcMessengerThreadList } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import { PROJECT_MESSENGER_WHOLE_THREAD_KEY } from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";

/** Unread count the thread list reports for one feed ("whole" or an assistant id). */
export const unreadForMessengerThread = (
  threads: AwcMessengerThreadList | null,
  threadKey: string,
): number => {
  if (threads === null) return 0;
  if (threadKey === PROJECT_MESSENGER_WHOLE_THREAD_KEY) return threads.wholeProject.unreadCount;
  return threads.bots.find((bot) => bot.membershipId === threadKey)?.unreadCount ?? 0;
};

/**
 * P1-S4a: the open feed's unread count, frozen when the feed opens (opening
 * marks it read, so the live count drops to 0). The first feed uses the count
 * the page had before opening; a feed switched to later uses the list's count
 * at the switch.
 */
export const useOneWindowUnreadSnapshot = (input: {
  readonly selectedKey: string;
  readonly initialKey: string;
  readonly initialCount: number;
  readonly threads: AwcMessengerThreadList | null;
}): number => {
  const { selectedKey, threads } = input;
  const [snap, setSnap] = useState({ key: input.initialKey, count: input.initialCount });
  if (snap.key !== selectedKey && threads !== null) {
    const next = { key: selectedKey, count: unreadForMessengerThread(threads, selectedKey) };
    setSnap(next);
    return next.count;
  }
  return snap.key === selectedKey ? snap.count : 0;
};
