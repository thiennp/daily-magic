"use client";

import { useState } from "react";
import NotificationBellButton from "@/components/header/NotificationBellButton";
import NotificationDropdownPanel from "@/components/header/NotificationDropdownPanel";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const toggleDropdown = () => {
    setIsOpen((previous) => !previous);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleClick = () => {
    toggleDropdown();
    setNotifying(false);
  };

  return (
    <div className="relative">
      <NotificationBellButton notifying={notifying} onClick={handleClick} />
      <NotificationDropdownPanel
        isOpen={isOpen}
        onClose={closeDropdown}
        onToggle={toggleDropdown}
      />
    </div>
  );
}
