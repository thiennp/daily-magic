import { formatOneWindowRoutingChipLabel } from "@/features/projects/messenger/oneWindow/oneWindowComposerRoutingLabels";
import { ONE_WINDOW_COMPOSER_COPY } from "@/features/projects/messenger/oneWindow/oneWindowComposerCopy.constant";
import type { MessengerKeptRecipient } from "@/features/projects/messenger/types/messengerChatStore.type";
import { PROJECT_MESSENGER_WHOLE_THREAD_KEY as WHOLE } from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";

/** Send a composer message to one thread ("whole" or an assistant's membershipId). */
export type OneWindowSendMessage = (
  text: string,
  needsReply: boolean,
  targetKey?: string,
) => Promise<boolean>;

/**
 * COMPOSER-LOCK "send to r" on the existing thread send path: everyone (or
 * nothing kept) → the whole-project thread (fan-out to every assistant);
 * assistants → each one's own thread, in order, no duplicates.
 */
export const oneWindowSendTargetKeys = (
  recipient: MessengerKeptRecipient | null,
): readonly string[] => {
  if (recipient === null || recipient.kind === "everyone") return [WHOLE];
  const keys = [...new Set(recipient.membershipIds)];
  return keys.length > 0 ? keys : [WHOLE];
};

/** Sends once per target; stops at the first failure (draft stays). */
export const sendOneWindowMessageTo = async (
  onSendMessage: OneWindowSendMessage,
  text: string,
  recipient: MessengerKeptRecipient | null,
): Promise<boolean> => {
  for (const key of oneWindowSendTargetKeys(recipient)) {
    if (!(await onSendMessage(text, false, key))) return false;
  }
  return true;
};

/**
 * Product guard (P1-S4 leftover a): on the whole-project feed the "To X"
 * switch names the current no-@ send target: "To {name}" (or "To {name} and
 * {n} more") while KEPT(r), else "To everyone".
 */
export const oneWindowWholeFeedSwitchLabel = (
  kept: MessengerKeptRecipient | null,
  nameById: ReadonlyMap<string, string>,
): string =>
  formatOneWindowRoutingChipLabel(kept, nameById) ??
  ONE_WINDOW_COMPOSER_COPY.chipEveryone;
