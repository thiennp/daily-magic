import { ONE_WINDOW_FEED_COPY } from "@/features/projects/messenger/oneWindow/oneWindowFeedCopy.constant";
import type { AwcMessengerBotThread } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import { PROJECT_MESSENGER_WHOLE_THREAD_KEY } from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";

/** "{n} older messages are archived…" (null when nothing is archived). */
export const oneWindowArchivedNoticeText = (archivedCount: number): string | null => {
  if (archivedCount <= 0) return null;
  const copy = ONE_WINDOW_FEED_COPY;
  return archivedCount === 1
    ? copy.noticeArchivedOne
    : copy.noticeArchivedMany.replace("{n}", String(archivedCount));
};

/**
 * P1-S3 quiet notices from the thread list's live bot status (`silent`):
 * every quiet assistant on the whole feed, only that one on its private feed.
 */
export const oneWindowQuietNoticeTexts = (input: {
  readonly bots: readonly AwcMessengerBotThread[];
  readonly selectedKey: string;
}): readonly { readonly id: string; readonly text: string }[] =>
  input.bots
    .filter((bot) => bot.status === "silent")
    .filter(
      (bot) =>
        input.selectedKey === PROJECT_MESSENGER_WHOLE_THREAD_KEY ||
        input.selectedKey === bot.membershipId,
    )
    .map((bot) => ({
      id: bot.membershipId,
      text: ONE_WINDOW_FEED_COPY.noticeQuiet.replace(
        "{name}",
        bot.displayName?.trim() || "An assistant",
      ),
    }));
