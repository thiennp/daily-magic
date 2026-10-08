import { NOTIFICATIONS_CHIP_OUTLINE_CLASS } from "@/features/notifications/notificationsClasses.constant";
import type { NotificationItem } from "@/features/notifications/notificationsDemoItems.constant";
import { notificationTitle } from "@/features/notifications/notificationsSelectors";
import {
  rowClass,
  type NotificationsCardProps,
} from "@/features/notifications/notificationsCardProps";
import NotificationsApprovalRow from "@/features/notifications/NotificationsApprovalRow";
import NotificationsApprovalStatus from "@/features/notifications/NotificationsApprovalStatus";
import NotificationsItemTitle from "@/features/notifications/NotificationsItemTitle";
import NotificationsMarkReadButton from "@/features/notifications/NotificationsMarkReadButton";

type RunItem = Extract<NotificationItem, { kind: "run" }>;

export default function NotificationsRunCard({
  item,
  onDecide,
  onMarkRead,
}: NotificationsCardProps<RunItem>) {
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
            <p className="text-sm text-awc-fg dark:text-gray-200">
              “{item.task}”
            </p>
            {item.rule ? <p className={muted}>{item.rule}</p> : null}
            {item.files && item.files.length > 0 ? (
              <p className={muted}>Files: {item.files.join(", ")}</p>
            ) : null}
          </div>
          <div className="flex flex-col items-end gap-1">
            <NotificationsApprovalStatus
              state={item.state}
              minsLeft={item.minsLeft}
            />
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
          <span className={NOTIFICATIONS_CHIP_OUTLINE_CLASS}>
            {item.computerLabel}
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
