import type { AwcMessengerThreadList } from "@/features/projects/messenger/types/awcProjectMessenger.type";

const sumMessengerUnread = (threads: AwcMessengerThreadList | null): number => {
  if (threads === null) {
    return 0;
  }
  return (
    threads.wholeProject.unreadCount +
    threads.bots.reduce((sum, bot) => sum + bot.unreadCount, 0)
  );
};

export default sumMessengerUnread;
