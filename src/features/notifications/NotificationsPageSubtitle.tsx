import { NOTIFICATIONS_COPY } from "@/features/notifications/notificationsCopy.constant";

export function subtitleText(unread: number, pending: number): string {
  const c = NOTIFICATIONS_COPY;
  const unreadPart =
    unread > 0
      ? c.subtitleUnread.replace("{n}", String(unread))
      : c.subtitleNone;
  if (pending === 0) return unreadPart;
  return `${unreadPart} · ${c.subtitleWaiting.replace("{m}", String(pending))}`;
}

interface NotificationsPageSubtitleProps {
  readonly unread: number;
  readonly pending: number;
  readonly ready: boolean;
}

export default function NotificationsPageSubtitle({
  unread,
  pending,
  ready,
}: NotificationsPageSubtitleProps) {
  return (
    <p
      aria-live="polite"
      className="mt-1 text-sm text-awc-fg-muted dark:text-gray-400"
      data-testid="notifications-subtitle"
    >
      {ready ? subtitleText(unread, pending) : " "}
    </p>
  );
}
