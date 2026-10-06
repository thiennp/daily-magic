import { fetchMessengerThread } from "@/features/projects/messenger/utils/fetchMessengerThread";
import { messengerChatStoreIdb } from "@/features/projects/messenger/utils/messengerChatStoreIdb";
import { writeThroughMessengerChat } from "@/features/projects/messenger/utils/persistMessengerChat";
import { NO_COMPUTER_STORED_CONFIRMATION } from "@/features/projects/messenger/utils/pruneMessengerChatEntries";

/**
 * Server GET + IndexedDB write-through. Same result shape as
 * fetchMessengerThread; on success the thread is the merged browser copy.
 */
export const fetchMessengerThreadPersisted = async (input: {
  readonly projectId: string;
  readonly threadKey: string;
  readonly hasOwnerComputer: boolean;
}): ReturnType<typeof fetchMessengerThread> => {
  const result = await fetchMessengerThread(input);
  if (!result.ok) return result;
  const thread = await writeThroughMessengerChat({
    store: messengerChatStoreIdb,
    projectId: input.projectId,
    thread: result.thread,
    retention: {
      hasOwnerComputer: input.hasOwnerComputer,
      // Trim needs per-message computer-stored confirmation; none on the
      // wire yet → nothing is trimmed (soft: server field later).
      isStoredOnComputer: NO_COMPUTER_STORED_CONFIRMATION,
    },
    now: Date.now(),
  });
  return { ok: true, thread };
};
