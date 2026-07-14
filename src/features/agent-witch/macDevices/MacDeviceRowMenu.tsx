"use client";

import { useState } from "react";

import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { MoreDotIcon, PencilIcon, TrashBinIcon } from "@/icons";

interface MacDeviceRowMenuProps {
  readonly onEdit: () => void;
  readonly onDelete?: () => void;
}

const stopRowSelection = (event: { stopPropagation: () => void }) => {
  event.stopPropagation();
};

export default function MacDeviceRowMenu({
  onEdit,
  onDelete,
}: MacDeviceRowMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleEdit = () => {
    closeMenu();
    onEdit();
  };

  const handleDelete = () => {
    closeMenu();
    onDelete?.();
  };

  return (
    <div
      className={`relative shrink-0 self-start transition-opacity ${
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
        <ul className="flex flex-col">
          <li>
            <DropdownItem
              onClick={handleEdit}
              baseClassName="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
            >
              <PencilIcon className="h-4 w-4 shrink-0" />
              <span>Edit</span>
            </DropdownItem>
          </li>
          {onDelete ? (
            <li>
              <DropdownItem
                onClick={handleDelete}
                baseClassName="flex w-full items-center gap-2 px-3 py-2 text-sm text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-500/10"
              >
                <TrashBinIcon className="h-4 w-4 shrink-0" />
                <span>Delete</span>
              </DropdownItem>
            </li>
          ) : null}
        </ul>
      </Dropdown>
    </div>
  );
}
