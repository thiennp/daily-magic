import { NOTIFICATIONS_COPY } from "@/features/notifications/notificationsCopy.constant";

const SKELETON_ROWS = [0, 1, 2, 3, 4] as const;

export default function NotificationsSkeleton() {
  return (
    <div
      aria-busy="true"
      className="flex flex-col gap-3"
      data-testid="notifications-skeleton"
    >
      <p className="sr-only" role="status">
        {NOTIFICATIONS_COPY.loading}
      </p>
      {SKELETON_ROWS.map((row) => (
        <div
          key={row}
          aria-hidden="true"
          className="h-20 animate-pulse rounded-xl border border-awc-border bg-awc-tile/60 dark:border-gray-700 dark:bg-white/[0.05]"
        />
      ))}
    </div>
  );
}
