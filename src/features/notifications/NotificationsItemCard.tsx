"use client";

import type { NotificationItem } from "@/features/notifications/notificationsDemoItems.constant";
import NotificationsJoinCard from "@/features/notifications/NotificationsJoinCard";
import NotificationsNoteCard from "@/features/notifications/NotificationsNoteCard";
import NotificationsRunCard from "@/features/notifications/NotificationsRunCard";

interface NotificationsItemCardProps {
  readonly item: NotificationItem;
  readonly onDecide: (id: string, decision: "approved" | "denied") => void;
  readonly onMarkRead: (id: string) => void;
}

export default function NotificationsItemCard({
  item,
  onDecide,
  onMarkRead,
}: NotificationsItemCardProps) {
  if (item.kind === "join") {
    return (
      <NotificationsJoinCard
        item={item}
        onDecide={onDecide}
        onMarkRead={onMarkRead}
      />
    );
  }
  if (item.kind === "run") {
    return (
      <NotificationsRunCard
        item={item}
        onDecide={onDecide}
        onMarkRead={onMarkRead}
      />
    );
  }
  return (
    <NotificationsNoteCard
      item={item}
      onDecide={onDecide}
      onMarkRead={onMarkRead}
    />
  );
}
