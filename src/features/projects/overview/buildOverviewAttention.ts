import type { AwcMessengerThreadList } from "@/features/projects/messenger/types/awcProjectMessenger.type";

export type OverviewAttention = {
  readonly assistantName: string;
  readonly membershipId: string | null;
};

/** Prefer an assistant thread with unread; else whole-project unread. */
const buildOverviewAttention = (
  threads: AwcMessengerThreadList | null,
): OverviewAttention | null => {
  if (threads === null) {
    return null;
  }
  const assistant = threads.bots.find((entry) => entry.unreadCount > 0);
  if (assistant !== undefined) {
    return {
      assistantName: assistant.displayName?.trim() || "An assistant",
      membershipId: assistant.membershipId,
    };
  }
  if (threads.wholeProject.unreadCount > 0) {
    return {
      assistantName: "Whole project",
      membershipId: null,
    };
  }
  return null;
};

export default buildOverviewAttention;
