import { fetchMessengerThread } from "@/features/projects/messenger/utils/fetchMessengerThread";
import { mergeMessengerChatEntries } from "@/features/projects/messenger/utils/mergeMessengerChatEntries";
import { messengerChatStoreIdb } from "@/features/projects/messenger/utils/messengerChatStoreIdb";
import { writeThroughMessengerChat } from "@/features/projects/messenger/utils/persistMessengerChat";
import { NO_COMPUTER_STORED_CONFIRMATION } from "@/features/projects/messenger/utils/pruneMessengerChatEntries";
import type { AwcMessengerOpenThread } from "@/features/projects/messenger/types/awcProjectMessenger.type";

/**
 * Server GET + IndexedDB write-through. Same result shape as
 * fetchMessengerThread; on success the thread is the merged browser copy.
 * Optional `before` loads an older page and merges it into the existing
 * display window (caller passes `existing` for prepend merge).
 */
export const fetchMessengerThreadPersisted = async (input: {
  readonly projectId: string;
  readonly threadKey: string;
  readonly hasOwnerComputer: boolean;
  readonly before?: string | null;
  readonly existing?: AwcMessengerOpenThread | null;
}): ReturnType<typeof fetchMessengerThread> => {
  const result = await fetchMessengerThread(input);
  if (!result.ok) return result;
  const mergedEntries =
    input.existing !== undefined && input.existing !== null
      ? mergeMessengerChatEntries(input.existing.entries, result.thread.entries)
      : result.thread.entries;
  const mergedThread: AwcMessengerOpenThread = {
    ...result.thread,
    entries: mergedEntries,
    // Prefer load-older page meta when paging; keep first-page meta otherwise.
    ...(result.thread.page !== undefined
      ? { page: result.thread.page }
      : input.existing?.page !== undefined
        ? { page: input.existing.page }
        : {}),
  };
  const thread = await writeThroughMessengerChat({
    store: messengerChatStoreIdb,
    projectId: input.projectId,
    thread: mergedThread,
    retention: {
      hasOwnerComputer: input.hasOwnerComputer,
      // Trim needs per-message computer-stored confirmation; none on the
      // wire yet → nothing is trimmed (soft: server field later).
      isStoredOnComputer: NO_COMPUTER_STORED_CONFIRMATION,
    },
    now: Date.now(),
  });
  return {
    ok: true,
    thread: {
      ...thread,
      ...(mergedThread.page !== undefined ? { page: mergedThread.page } : {}),
      ...(result.thread.error !== undefined
        ? { error: result.thread.error }
        : {}),
    },
  };
};
