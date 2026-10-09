"use client";

import type { ReactNode } from "react";

import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";

const LINK_CLASS =
  "group flex items-center gap-3 rounded-lg px-3 py-2 text-theme-sm font-medium text-awc-fg hover:bg-awc-tile hover:text-awc-fg dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300";

/** One link row of the user menu. */
export default function UserDropdownMenuLink({
  href,
  onClose,
  children,
}: {
  readonly href: string;
  readonly onClose: () => void;
  readonly children: ReactNode;
}) {
  return (
    <li>
      <DropdownItem
        onItemClick={onClose}
        tag="a"
        href={href}
        className={LINK_CLASS}
      >
        {children}
      </DropdownItem>
    </li>
  );
}
