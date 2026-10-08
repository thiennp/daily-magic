"use client";

import { useState } from "react";

import NotificationBellButton from "@/features/notifications/header/NotificationBellButton";
import NotificationDropdownPanel from "@/features/notifications/header/NotificationDropdownPanel";
import {
  NOTIFICATIONS_DEMO_ITEMS,
  countUnread,
} from "@/features/notifications/notificationsDemoItems.constant";
import { countPendingApprovals } from "@/features/notifications/notificationsSelectors";
import type { NotificationCounts } from "@/features/notifications/useNotificationsItems";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [counts, setCounts] = useState<NotificationCounts>(() => ({
    unread: countUnread(NOTIFICATIONS_DEMO_ITEMS),
    pending: countPendingApprovals(NOTIFICATIONS_DEMO_ITEMS),
  }));

  const toggleDropdown = () => {
    setIsOpen((previous) => !previous);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <NotificationBellButton
        unreadCount={counts.unread}
        pendingCount={counts.pending}
        isOpen={isOpen}
        onClick={toggleDropdown}
      />
      <NotificationDropdownPanel
        isOpen={isOpen}
        onClose={closeDropdown}
        onToggle={toggleDropdown}
        onCountsChange={setCounts}
      />
    </div>
  );
}
