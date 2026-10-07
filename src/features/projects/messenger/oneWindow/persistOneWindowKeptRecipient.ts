import {
  deleteComposerRecipientSticky,
  putComposerRecipientSticky,
} from "@/features/projects/messenger/oneWindow/fetchComposerRecipientSticky";
import { keptToStickyPutBody } from "@/features/projects/messenger/oneWindow/mapStickyToKeptRecipient";
import type { MessengerKeptRecipient } from "@/features/projects/messenger/types/messengerChatStore.type";
import { messengerChatStoreIdb } from "@/features/projects/messenger/utils/messengerChatStoreIdb";
import { writeMessengerKeptRecipient } from "@/features/projects/messenger/utils/persistMessengerKeptRecipient";

/** IDB cache of the kept recipient; no-op without a member key. */
export const cacheOneWindowKeptRecipient = async (input: {
  readonly projectId: string;
  readonly memberKey: string | null;
  readonly recipient: MessengerKeptRecipient | null;
}): Promise<void> => {
  if (input.memberKey === null) return;
  await writeMessengerKeptRecipient({
    store: messengerChatStoreIdb,
    projectId: input.projectId,
    memberKey: input.memberKey,
    recipient: input.recipient,
    now: Date.now(),
  });
};

/** Server sticky: null clears it, otherwise PUT the kept recipient. */
export const syncOneWindowKeptRecipientSticky = async (
  projectId: string,
  recipient: MessengerKeptRecipient | null,
): Promise<void> => {
  if (recipient === null) {
    await deleteComposerRecipientSticky(projectId);
    return;
  }
  await putComposerRecipientSticky(projectId, keptToStickyPutBody(recipient));
};
