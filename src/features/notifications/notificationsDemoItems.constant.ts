/** Presentational demo feed matching AgentWitch-Notifications.html seed (UI-only). */
export type NotificationApprovalState =
  "pending" | "approved" | "denied" | "timeout";

export type NotificationNoteKind =
  | "auto"
  | "done"
  | "limit"
  | "bill"
  | "billpay"
  | "invite"
  | "fail"
  | "computer";

export type NotificationItem =
  | {
      readonly id: string;
      readonly kind: "join";
      readonly who: string;
      readonly whoKind: "person" | "assistant";
      readonly email?: string;
      readonly runs?: string;
      readonly role: string;
      readonly project: string;
      readonly owner?: string;
      readonly note?: string;
      readonly delivery?: "demand" | "wake";
      readonly atLabel: string;
      readonly unread: boolean;
      readonly state: NotificationApprovalState;
      readonly doneAtLabel?: string;
    }
  | {
      readonly id: string;
      readonly kind: "run";
      readonly who: string;
      readonly task: string;
      readonly project: string;
      readonly computer: string;
      readonly computerLabel: string;
      readonly rule?: string;
      readonly files?: readonly string[];
      readonly atLabel: string;
      readonly unread: boolean;
      readonly state: NotificationApprovalState;
      readonly minsLeft?: number;
      readonly doneAtLabel?: string;
      readonly expiredAtLabel?: string;
      readonly waitMins?: number;
    }
  | {
      readonly id: string;
      readonly kind: NotificationNoteKind;
      readonly title: string;
      readonly text: string;
      readonly project?: string;
      readonly atLabel: string;
      readonly unread: boolean;
      readonly href?: string;
      readonly linkLabel?: string;
    };

export { NOTIFICATIONS_DEMO_ITEMS } from "@/features/notifications/notificationsDemoData.constant";

export function isApprovalItem(
  item: NotificationItem,
): item is Extract<NotificationItem, { kind: "join" | "run" }> {
  return item.kind === "join" || item.kind === "run";
}

export function filterNotificationItems(
  items: readonly NotificationItem[],
  filter: "all" | "unread" | "approvals",
): NotificationItem[] {
  if (filter === "unread") {
    return items.filter((item) => item.unread);
  }
  if (filter === "approvals") {
    return items.filter(isApprovalItem);
  }
  return [...items];
}

export function countUnread(items: readonly NotificationItem[]): number {
  return items.filter((item) => item.unread).length;
}
