import type { AwcMessengerThreadList } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import { sumMessengerUnreadCount } from "@/features/projects/messenger/utils/sumMessengerUnreadCount";

/** Overview/Activity badge — delegates to messenger Activity helper. */
const sumMessengerUnread = (threads: AwcMessengerThreadList | null): number =>
  sumMessengerUnreadCount(threads);

export default sumMessengerUnread;
