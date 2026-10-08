import { NOTIFICATIONS_COPY } from "@/features/notifications/notificationsCopy.constant";

interface NotificationsMarkReadButtonProps {
  readonly id: string;
  readonly title: string;
  readonly unread: boolean;
  readonly onMarkRead: (id: string) => void;
}

export default function NotificationsMarkReadButton({
  id,
  title,
  unread,
  onMarkRead,
}: NotificationsMarkReadButtonProps) {
  if (!unread) return null;
  return (
    <button
      type="button"
      aria-label={NOTIFICATIONS_COPY.markReadAria.replace("{title}", title)}
      className="text-[length:var(--awc-fs-sm)] font-medium text-awc-fg-muted underline-offset-2 hover:text-awc-fg hover:underline dark:text-gray-400 dark:hover:text-gray-200"
      onClick={() => {
        onMarkRead(id);
      }}
    >
      {NOTIFICATIONS_COPY.markRead}
    </button>
  );
}
