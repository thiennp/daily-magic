import type {
  AwcMessengerOpenThread,
  AwcMessengerTimelineEntry,
} from "@/features/projects/messenger/types/awcProjectMessenger.type";
import type { MessengerChatStoreAdapter } from "@/features/projects/messenger/types/messengerChatStore.type";
import { mergeMessengerChatEntries } from "@/features/projects/messenger/utils/mergeMessengerChatEntries";
import { messengerChatKey } from "@/features/projects/messenger/utils/messengerChatKey";
import { pruneMessengerChatEntries } from "@/features/projects/messenger/utils/pruneMessengerChatEntries";

export type MessengerChatRetention = {
  readonly hasOwnerComputer: boolean;
  readonly isStoredOnComputer: (entry: AwcMessengerTimelineEntry) => boolean;
};

/** Browser copy for first paint, before the server GET returns. */
export const hydrateMessengerChat = async (input: {
  readonly store: MessengerChatStoreAdapter;
  readonly projectId: string;
  readonly threadKey: string;
}): Promise<AwcMessengerOpenThread | null> => {
  const record = await input.store
    .readChat(messengerChatKey(input))
    .catch(() => null);
  if (record === null) return null;
  return {
    threadKey: input.threadKey,
    entries: record.entries,
    canSend: record.canSend,
  };
};

/**
 * Write-through after a server GET (also after send → reload): merge the
 * server window into the browser copy, quiet-prune, upsert. Returns what to
 * show. A failed write never hides the live server thread.
 */
export const writeThroughMessengerChat = async (input: {
  readonly store: MessengerChatStoreAdapter;
  readonly projectId: string;
  readonly thread: AwcMessengerOpenThread;
  readonly retention: MessengerChatRetention;
  readonly now: number;
}): Promise<AwcMessengerOpenThread> => {
  const { store, projectId, thread, retention, now } = input;
  const chatKey = messengerChatKey({ projectId, threadKey: thread.threadKey });
  const cached = await store.readChat(chatKey).catch(() => null);
  const entries = pruneMessengerChatEntries({
    entries: mergeMessengerChatEntries(cached?.entries ?? [], thread.entries),
    now,
    ...retention,
  });
  await store
    .writeChat({
      chatKey,
      projectId,
      threadKey: thread.threadKey,
      entries,
      canSend: thread.canSend,
      updatedAt: new Date(now).toISOString(),
      schemaVersion: 1,
    })
    .catch(() => false);
  return { ...thread, entries };
};
