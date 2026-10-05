import type { AwcMessengerThreadList } from "@/features/projects/messenger/types/awcProjectMessenger.type";

/** Activity tab badge = whole-project unread + each bot thread unread. */
export const sumMessengerUnreadCount = (
  threads: AwcMessengerThreadList | null | undefined,
): number => {
  if (threads === null || threads === undefined) return 0;
  const whole = threads.wholeProject.unreadCount;
  const bots = threads.bots.reduce((sum, bot) => sum + bot.unreadCount, 0);
  return whole + bots;
};
