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
 * COMPOSER-LOCK "send to r" on the existing thread send path: nothing kept
 * → the whole-project thread (server maps to the single bot if exactly one, else fails);
 * assistant → their own thread.
 */
export const oneWindowSendTargetKeys = (
  recipient: MessengerKeptRecipient | null,
): readonly string[] => {
  if (recipient === null || recipient.kind !== "assistant") return [WHOLE];
  return [recipient.membershipId];
};

/** P1-S5b: who already got this draft; `pending` = failed + not sent yet. */
export type OneWindowKeptProgress = {
  readonly text: string;
  readonly sent: readonly string[];
  readonly pending: readonly string[];
} | null;
export type OneWindowKeptProgressRef = { current: OneWindowKeptProgress };

/**
 * Sends to the single target. With a progress ref, tracks failure.
 */
export const sendOneWindowMessageTo = async (
  onSendMessage: OneWindowSendMessage,
  text: string,
  recipient: MessengerKeptRecipient | null,
  progress?: OneWindowKeptProgressRef,
): Promise<boolean> => {
  const keys = oneWindowSendTargetKeys(recipient);
  const key = keys[0];

  // If we already sent it, we don't need to send again.
  const prior = progress?.current?.text === text ? progress.current.sent : [];
  if (prior.includes(key)) {
    if (progress) progress.current = null;
    return true;
  }

  const success = await onSendMessage(text, false, key);
  if (!success) {
    if (progress) progress.current = { text, sent: [], pending: [key] };
    return false;
  }

  if (progress) progress.current = null;
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
