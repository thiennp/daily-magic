"use client";

import { useMemo, useState } from "react";

import NotificationBellButton from "@/components/header/NotificationBellButton";
import NotificationDropdownPanel from "@/components/header/NotificationDropdownPanel";
import {
  NOTIFICATIONS_DEMO_ITEMS,
  countUnread,
} from "@/features/notifications/notificationsDemoItems.constant";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const initialUnread = useMemo(
    () => countUnread(NOTIFICATIONS_DEMO_ITEMS),
    [],
  );
  const [unreadCount, setUnreadCount] = useState(initialUnread);

  const toggleDropdown = () => {
    setIsOpen((previous) => !previous);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <NotificationBellButton
        notifying={unreadCount > 0}
        onClick={toggleDropdown}
      />
      <NotificationDropdownPanel
        isOpen={isOpen}
        onClose={closeDropdown}
        onToggle={toggleDropdown}
        onUnreadChange={setUnreadCount}
      />
    </div>
  );
}
