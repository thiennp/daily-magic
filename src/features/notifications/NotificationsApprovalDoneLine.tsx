import { NOTIFICATIONS_COPY } from "@/features/notifications/notificationsCopy.constant";
import type { NotificationItem } from "@/features/notifications/notificationsDemoItems.constant";
import { NOTIFICATIONS_DEFAULT_WAIT_MINS } from "@/features/notifications/notificationsSelectors";

type ApprovalItem = Extract<NotificationItem, { kind: "join" | "run" }>;

export function approvalDoneText(item: ApprovalItem): string | null {
  const c = NOTIFICATIONS_COPY;
  const when = item.doneAtLabel ?? c.doneWhenFallback;
  const fill = (t: string) =>
    t
      .replace("{when}", when)
      .replace("{who}", item.who)
      .replace("{project}", item.project)
      .replace("{computer}", item.kind === "run" ? item.computerLabel : "");
  if (item.state === "approved") {
    return fill(item.kind === "run" ? c.approvedRun : c.approvedJoin);
  }
  if (item.state === "denied") {
    return fill(item.kind === "run" ? c.deniedRun : c.deniedJoin);
  }
  if (item.state === "timeout") {
    const expired = item.kind === "run" ? item.expiredAtLabel : undefined;
    const mins = item.kind === "run" ? item.waitMins : undefined;
    return c.timedOutLine
      .replace("{mins}", String(mins ?? NOTIFICATIONS_DEFAULT_WAIT_MINS))
      .replace("{clock}", expired ?? c.doneWhenFallback);
  }
  return null;
}

export default function NotificationsApprovalDoneLine({
  item,
}: {
  readonly item: ApprovalItem;
}) {
  const text = approvalDoneText(item);
  if (!text) return null;
  return <p className="text-sm text-awc-fg-muted dark:text-gray-400">{text}</p>;
}
