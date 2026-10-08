import { NOTIFICATIONS_COPY } from "@/features/notifications/notificationsCopy.constant";
import type { NotificationItem } from "@/features/notifications/notificationsDemoItems.constant";

type ApprovalItem = Extract<NotificationItem, { kind: "join" | "run" }>;

export function denyCopy(item: ApprovalItem): { title: string; body: string } {
  if (item.kind === "join") {
    return {
      title: NOTIFICATIONS_COPY.denyJoinTitle.replace("{who}", item.who),
      body: NOTIFICATIONS_COPY.denyJoinBody
        .replaceAll("{who}", item.who)
        .replace("{project}", item.project),
    };
  }
  return {
    title: NOTIFICATIONS_COPY.denyRunTitle,
    body: NOTIFICATIONS_COPY.denyRunBody
      .replace("{who}", item.who)
      .replace("{task}", item.task)
      .replace("{computer}", item.computerLabel),
  };
}
