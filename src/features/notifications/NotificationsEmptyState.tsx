import {
  NOTIFICATIONS_COPY,
  type NotificationsFilterId,
} from "@/features/notifications/notificationsCopy.constant";

interface NotificationsEmptyStateProps {
  readonly filter: NotificationsFilterId;
}

export default function NotificationsEmptyState({
  filter,
}: NotificationsEmptyStateProps) {
  const empty = NOTIFICATIONS_COPY.empty[filter];
  return (
    <div
      role="status"
      className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-awc-border px-6 py-12 text-center dark:border-gray-700"
      data-testid="notifications-empty"
    >
      <h2 className="text-lg font-semibold text-awc-fg dark:text-white">
        {empty.title}
      </h2>
      <p className="max-w-md text-sm text-awc-fg-muted dark:text-gray-400">
        {empty.body}
      </p>
    </div>
  );
}
