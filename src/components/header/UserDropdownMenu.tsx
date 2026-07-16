"use client";

import { signOut } from "next-auth/react";
import type { Session } from "next-auth";

import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { COMPANIES_ENTITY_LABEL } from "@/lib/admin/companyGroupCopy.constant";
import formatGlobalRole from "@/lib/auth/formatGlobalRole";
import type { GlobalRoleValue } from "@/lib/auth/roles";

interface UserDropdownMenuProps {
  readonly isOpen: boolean;
  readonly session: Session;
  readonly displayName: string;
  readonly onClose: () => void;
  readonly showStyleguide: boolean;
}

export default function UserDropdownMenu({
  isOpen,
  session,
  displayName,
  onClose,
  showStyleguide,
}: UserDropdownMenuProps) {
  return (
    <Dropdown
      isOpen={isOpen}
      onClose={onClose}
      className="shadow-theme-lg dark:bg-gray-dark absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 dark:border-gray-800"
    >
      <div>
        <span className="text-theme-sm block font-medium text-gray-700 dark:text-gray-400">
          {displayName}
        </span>
        <span className="text-theme-xs mt-0.5 block text-gray-500 dark:text-gray-400">
          {session.user.email}
        </span>
        <span className="text-theme-xs mt-1 block text-zinc-600 dark:text-zinc-400">
          {formatGlobalRole(session.user.globalRole as GlobalRoleValue)}
        </span>
      </div>

      <ul className="flex flex-col gap-1 border-b border-gray-200 py-3 dark:border-gray-800">
        <li>
          <DropdownItem
            onItemClick={onClose}
            tag="a"
            href="/admin/groups"
            className="group flex items-center gap-3 rounded-lg px-3 py-2 text-theme-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
          >
            {COMPANIES_ENTITY_LABEL} management
          </DropdownItem>
        </li>
        <li>
          <DropdownItem
            onItemClick={onClose}
            tag="a"
            href="/admin/users"
            className="group flex items-center gap-3 rounded-lg px-3 py-2 text-theme-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
          >
            User management
          </DropdownItem>
        </li>
        {showStyleguide ? (
          <li>
            <DropdownItem
              onItemClick={onClose}
              tag="a"
              href="/styleguide"
              className="group flex items-center gap-3 rounded-lg px-3 py-2 text-theme-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Styleguide
            </DropdownItem>
          </li>
        ) : null}
      </ul>

      <button
        type="button"
        onClick={() => {
          onClose();
          void signOut({ callbackUrl: "/login" });
        }}
        className="group mt-3 flex items-center gap-3 rounded-lg px-3 py-2 text-theme-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
      >
        Sign out
      </button>
    </Dropdown>
  );
}
