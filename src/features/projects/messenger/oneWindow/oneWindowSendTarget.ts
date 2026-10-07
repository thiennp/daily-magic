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

/** P1-S5b: who already got this draft; `pending` = failed + not sent yet. */
export type OneWindowKeptProgress = {
  readonly text: string;
  readonly sent: readonly string[];
  readonly pending: readonly string[];
} | null;
export type OneWindowKeptProgressRef = { current: OneWindowKeptProgress };

/**
 * Sends once per target; stops at the first failure (draft stays). With a
 * progress ref, a retry of the same text skips targets that already got it;
 * other text or a full success clears the tracking (no duplicates on retry).
 */
export const sendOneWindowMessageTo = async (
  onSendMessage: OneWindowSendMessage,
  text: string,
  recipient: MessengerKeptRecipient | null,
  progress?: OneWindowKeptProgressRef,
): Promise<boolean> => {
  const keys = oneWindowSendTargetKeys(recipient);
  const prior = progress?.current?.text === text ? progress.current.sent : [];
  const sent = [...prior];
  for (const key of keys.filter((k) => !prior.includes(k))) {
    if (!(await onSendMessage(text, false, key))) {
      if (progress) progress.current = { text, sent, pending: keys.filter((k) => !sent.includes(k)) };
      return false;
    }
    sent.push(key);
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
