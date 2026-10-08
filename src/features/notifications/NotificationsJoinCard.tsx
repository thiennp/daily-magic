import { NOTIFICATIONS_CHIP_OUTLINE_CLASS } from "@/features/notifications/notificationsClasses.constant";
import { NOTIFICATIONS_COPY } from "@/features/notifications/notificationsCopy.constant";
import type { NotificationItem } from "@/features/notifications/notificationsDemoItems.constant";
import { notificationTitle } from "@/features/notifications/notificationsSelectors";
import {
  metaLine,
  rowClass,
  type NotificationsCardProps,
} from "@/features/notifications/notificationsCardProps";
import NotificationsApprovalRow from "@/features/notifications/NotificationsApprovalRow";
import NotificationsApprovalStatus from "@/features/notifications/NotificationsApprovalStatus";
import NotificationsItemTitle from "@/features/notifications/NotificationsItemTitle";
import NotificationsMarkReadButton from "@/features/notifications/NotificationsMarkReadButton";

type JoinItem = Extract<NotificationItem, { kind: "join" }>;

function whoLine(item: JoinItem): string {
  if (item.whoKind === "assistant") {
    return metaLine([
      item.who,
      item.runs,
      item.role,
      item.delivery === "demand"
        ? NOTIFICATIONS_COPY.checksOnDemand
        : undefined,
    ]);
  }
  return metaLine([item.who, item.email, item.role]);
}

export default function NotificationsJoinCard({
  item,
  onDecide,
  onMarkRead,
}: NotificationsCardProps<JoinItem>) {
  const title = notificationTitle(item);
  const muted = "text-sm text-awc-fg-muted dark:text-gray-400";
  return (
    <article
      className={rowClass(item)}
      data-testid={`notifications-item-${item.id}`}
      data-unread={item.unread ? "true" : "false"}
    >
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0 space-y-1">
            <NotificationsItemTitle title={title} unread={item.unread} />
            <p className={muted}>{whoLine(item)}</p>
            {item.note ? (
              <p className="text-sm text-awc-fg dark:text-gray-200">
                {item.note}
              </p>
            ) : null}
            {item.owner ? <p className={muted}>Owner: {item.owner}</p> : null}
          </div>
          <div className="flex flex-col items-end gap-1">
            <NotificationsApprovalStatus state={item.state} />
            <time className="text-[length:var(--awc-fs-sm)] text-awc-fg-muted dark:text-gray-400">
              {item.atLabel}
            </time>
          </div>
        </div>
        <NotificationsApprovalRow item={item} onDecide={onDecide} />
        <div className="flex flex-wrap items-center gap-3">
          <span className={NOTIFICATIONS_CHIP_OUTLINE_CLASS}>
            {item.project}
          </span>
          <NotificationsMarkReadButton
            id={item.id}
            title={title}
            unread={item.unread}
            onMarkRead={onMarkRead}
          />
        </div>
      </div>
    </article>
  );
}
