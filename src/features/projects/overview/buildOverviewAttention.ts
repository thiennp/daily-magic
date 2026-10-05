import type { AwcMessengerThreadList } from "@/features/projects/messenger/types/awcProjectMessenger.type";

export type OverviewAttention = {
  readonly botName: string;
  readonly membershipId: string | null;
};

/** Prefer a bot thread with unread; else whole-project unread. */
const buildOverviewAttention = (
  threads: AwcMessengerThreadList | null,
): OverviewAttention | null => {
  if (threads === null) {
    return null;
  }
  const bot = threads.bots.find((entry) => entry.unreadCount > 0);
  if (bot !== undefined) {
    return {
      botName: bot.displayName?.trim() || "A bot",
      membershipId: bot.membershipId,
    };
  }
  if (threads.wholeProject.unreadCount > 0) {
    return {
      botName: "Whole project",
      membershipId: null,
    };
  }
  return null;
};

export default buildOverviewAttention;
