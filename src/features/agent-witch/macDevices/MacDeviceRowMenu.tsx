"use client";

import { useState } from "react";

import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { MoreDotIcon } from "@/icons";
import MacDeviceRowMenuItems from "@/features/agent-witch/macDevices/MacDeviceRowMenuItems";

interface MacDeviceRowMenuProps {
  readonly onEdit: () => void;
  readonly onDelegateTask?: () => void;
  readonly onOpenShell?: () => void;
  readonly onDelete?: () => void;
}

const stopRowSelection = (event: { stopPropagation: () => void }) => {
  event.stopPropagation();
};

export default function MacDeviceRowMenu({
  onEdit,
  onDelegateTask,
  onOpenShell,
  onDelete,
}: MacDeviceRowMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div
      data-mac-device-row-actions
      className={`relative shrink-0 self-center transition-opacity ${
        isOpen
          ? "opacity-100"
          : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
      }`}
      onClick={stopRowSelection}
      onKeyDown={stopRowSelection}
    >
      <button
        type="button"
        aria-label="Mac actions"
        aria-expanded={isOpen}
        className="dropdown-toggle inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
        onClick={(event) => {
          stopRowSelection(event);
          setIsOpen((current) => !current);
        }}
      >
        <MoreDotIcon className="h-5 w-5" />
      </button>
      <Dropdown
        isOpen={isOpen}
        onClose={closeMenu}
        className="w-44 py-1 dark:bg-gray-dark"
      >
        <MacDeviceRowMenuItems
          closeMenu={closeMenu}
          onEdit={onEdit}
          onOpenShell={onOpenShell}
          onDelegateTask={onDelegateTask}
          onDelete={onDelete}
        />
      </Dropdown>
    </div>
  );
}
