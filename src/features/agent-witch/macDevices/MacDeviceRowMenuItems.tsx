"use client";

import type { ReactElement } from "react";

import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { PaperPlaneIcon, PencilIcon, TrashBinIcon } from "@/icons";

interface MacDeviceRowMenuItemsProps {
  readonly closeMenu: () => void;
  readonly onEdit: () => void;
  readonly onDelegateTask?: () => void;
  readonly onOpenShell?: () => void;
  readonly onDelete?: () => void;
}

const renderMenuItem = (
  onClick: () => void,
  icon: ReactElement,
  label: string,
  danger = false,
): ReactElement => (
  <li>
    <DropdownItem
      onClick={onClick}
      baseClassName={
        danger
          ? "flex w-full items-center gap-2 px-3 py-2 text-sm text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-500/10"
          : "flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
      }
    >
      {icon}
      <span>{label}</span>
    </DropdownItem>
  </li>
);

export default function MacDeviceRowMenuItems({
  closeMenu,
  onEdit,
  onDelegateTask,
  onOpenShell,
  onDelete,
}: MacDeviceRowMenuItemsProps) {
  return (
    <ul className="flex flex-col">
      {renderMenuItem(
        () => {
          closeMenu();
          onEdit();
        },
        <PencilIcon className="h-4 w-4 shrink-0" />,
        "Edit",
      )}
      {onOpenShell
        ? renderMenuItem(
            () => {
              closeMenu();
              onOpenShell();
            },
            <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center text-[10px] font-semibold">
              &gt;_
            </span>,
            "Open Mac shell",
          )
        : null}
      {onDelegateTask
        ? renderMenuItem(
            () => {
              closeMenu();
              onDelegateTask();
            },
            <PaperPlaneIcon className="h-4 w-4 shrink-0" />,
            "Delegate task",
          )
        : null}
      {onDelete
        ? renderMenuItem(
            () => {
              closeMenu();
              onDelete();
            },
            <TrashBinIcon className="h-4 w-4 shrink-0" />,
            "Delete",
            true,
          )
        : null}
    </ul>
  );
}
