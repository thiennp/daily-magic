import {
  isApprovalItem,
  type NotificationItem,
} from "@/features/notifications/notificationsDemoItems.constant";

export const NOTIFICATIONS_DEFAULT_WAIT_MINS = 30;

export function countPendingApprovals(
  items: readonly NotificationItem[],
): number {
  return items.filter(
    (item) => isApprovalItem(item) && item.state === "pending",
  ).length;
}

export function notificationTitle(item: NotificationItem): string {
  if (item.kind === "join") return `${item.who} asked to join ${item.project}`;
  if (item.kind === "run") {
    return `${item.who} wants to run a task on ${item.computerLabel}`;
  }
  return item.title;
}
