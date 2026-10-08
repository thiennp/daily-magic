import Link from "next/link";

import { APP_SURFACE_TEXT_LINK_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { NOTIFICATIONS_CHIP_OUTLINE_CLASS } from "@/features/notifications/notificationsClasses.constant";
import type { NotificationItem } from "@/features/notifications/notificationsDemoItems.constant";
import {
  rowClass,
  type NotificationsCardProps,
} from "@/features/notifications/notificationsCardProps";
import NotificationsItemTitle from "@/features/notifications/NotificationsItemTitle";
import NotificationsMarkReadButton from "@/features/notifications/NotificationsMarkReadButton";

type NoteItem = Exclude<NotificationItem, { kind: "join" | "run" }>;

export default function NotificationsNoteCard({
  item,
  onMarkRead,
}: NotificationsCardProps<NoteItem>) {
  return (
    <article
      className={rowClass(item)}
      data-testid={`notifications-item-${item.id}`}
      data-unread={item.unread ? "true" : "false"}
    >
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0 space-y-1">
            <NotificationsItemTitle title={item.title} unread={item.unread} />
            <p className="text-sm text-awc-fg-muted dark:text-gray-400">
              {item.text}
            </p>
          </div>
          <time className="text-[length:var(--awc-fs-sm)] text-awc-fg-muted dark:text-gray-400">
            {item.atLabel}
          </time>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {item.project ? (
            <span className={NOTIFICATIONS_CHIP_OUTLINE_CLASS}>
              {item.project}
            </span>
          ) : null}
          {item.href && item.linkLabel ? (
            <Link href={item.href} className={APP_SURFACE_TEXT_LINK_CLASS}>
              {item.linkLabel}
            </Link>
          ) : null}
          <NotificationsMarkReadButton
            id={item.id}
            title={item.title}
            unread={item.unread}
            onMarkRead={onMarkRead}
          />
        </div>
      </div>
    </article>
  );
}
