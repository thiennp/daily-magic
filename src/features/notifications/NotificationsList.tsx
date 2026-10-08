import { NOTIFICATIONS_COPY } from "@/features/notifications/notificationsCopy.constant";
import type { NotificationItem } from "@/features/notifications/notificationsDemoItems.constant";
import NotificationsItemCard from "@/features/notifications/NotificationsItemCard";

interface NotificationsListProps {
  readonly items: readonly NotificationItem[];
  readonly onDecide: (id: string, decision: "approved" | "denied") => void;
  readonly onMarkRead: (id: string) => void;
}

export default function NotificationsList({
  items,
  onDecide,
  onMarkRead,
}: NotificationsListProps) {
  return (
    <ul className="flex flex-col gap-3" aria-label={NOTIFICATIONS_COPY.h1}>
      {items.map((item) => (
        <li key={item.id}>
          <NotificationsItemCard
            item={item}
            onDecide={onDecide}
            onMarkRead={onMarkRead}
          />
        </li>
      ))}
    </ul>
  );
}
