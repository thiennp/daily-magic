import {
  NOTIFICATIONS_ROW_CLASS,
  NOTIFICATIONS_ROW_DANGER_CLASS,
  NOTIFICATIONS_ROW_UNREAD_CLASS,
} from "@/features/notifications/notificationsClasses.constant";
import type { NotificationItem } from "@/features/notifications/notificationsDemoItems.constant";

export interface NotificationsCardProps<T extends NotificationItem> {
  readonly item: T;
  readonly onDecide: (id: string, decision: "approved" | "denied") => void;
  readonly onMarkRead: (id: string) => void;
}

export function rowClass(item: NotificationItem): string {
  if (item.kind === "billpay" || item.kind === "fail") {
    return `${NOTIFICATIONS_ROW_CLASS} ${NOTIFICATIONS_ROW_DANGER_CLASS}`;
  }
  if (item.unread) {
    return `${NOTIFICATIONS_ROW_CLASS} ${NOTIFICATIONS_ROW_UNREAD_CLASS}`;
  }
  return NOTIFICATIONS_ROW_CLASS;
}

export function metaLine(parts: readonly (string | undefined)[]): string {
  return parts.filter(Boolean).join(" · ");
}
