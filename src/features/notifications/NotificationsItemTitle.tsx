import { NOTIFICATIONS_COPY } from "@/features/notifications/notificationsCopy.constant";

interface NotificationsItemTitleProps {
  readonly title: string;
  readonly unread: boolean;
}

export default function NotificationsItemTitle({
  title,
  unread,
}: NotificationsItemTitleProps) {
  return (
    <h3
      className={`flex items-center gap-2 text-sm text-awc-fg dark:text-white ${unread ? "font-bold" : "font-semibold"}`}
    >
      {unread ? (
        <>
          <span
            aria-hidden="true"
            data-testid="notifications-unread-dot"
            className="h-2 w-2 shrink-0 rounded-full bg-awc-blue-600"
          />
          <span className="sr-only">{NOTIFICATIONS_COPY.unreadSr}</span>
        </>
      ) : null}
      <span>{title}</span>
    </h3>
  );
}
