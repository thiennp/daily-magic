"use client";

import { signOut } from "next-auth/react";

import type { Session } from "next-auth";

import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import UserDropdownMenuLink from "@/components/header/UserDropdownMenuLink";
import { COMPANIES_ENTITY_LABEL } from "@/lib/admin/companyGroupCopy.constant";
import formatGlobalRole from "@/lib/auth/formatGlobalRole";
import { isPrivilegedGlobalRole, type GlobalRoleValue } from "@/lib/auth/roles";

interface UserDropdownMenuProps {
  readonly isOpen: boolean;
  readonly session: Session;
  readonly displayName: string;
  readonly onClose: () => void;
  readonly showStyleguide: boolean;
  /** Runs before sign-out (the app clears its local sync state here). */
  readonly onBeforeSignOut?: () => Promise<void>;
}

export default function UserDropdownMenu({
  isOpen,
  session,
  displayName,
  onClose,
  showStyleguide,
  onBeforeSignOut,
}: UserDropdownMenuProps) {
  return (
    <Dropdown
      isOpen={isOpen}
      onClose={onClose}
      className="shadow-theme-lg dark:bg-gray-dark absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-awc-border bg-white p-3 dark:border-gray-800"
    >
      <div>
        <span className="text-theme-sm block font-medium text-awc-fg dark:text-gray-400">
          {displayName}
        </span>
        <span className="text-theme-xs mt-0.5 block text-awc-fg-muted dark:text-gray-400">
          {session.user.email}
        </span>
        <span className="text-theme-xs mt-1 block text-zinc-600 dark:text-zinc-400">
          {formatGlobalRole(session.user.globalRole as GlobalRoleValue)}
        </span>
      </div>

      <ul className="flex flex-col gap-1 border-b border-awc-border py-3 dark:border-gray-800">
        <UserDropdownMenuLink href="/account" onClose={onClose}>
          Account
        </UserDropdownMenuLink>
        <UserDropdownMenuLink href="/pricing" onClose={onClose}>
          Billing and plans
        </UserDropdownMenuLink>
        <UserDropdownMenuLink href="/admin/groups" onClose={onClose}>
          {COMPANIES_ENTITY_LABEL} management
        </UserDropdownMenuLink>
        {isPrivilegedGlobalRole(session.user.globalRole as GlobalRoleValue) ? (
          <UserDropdownMenuLink href="/admin/users" onClose={onClose}>
            User management
          </UserDropdownMenuLink>
        ) : null}
        {showStyleguide ? (
          <UserDropdownMenuLink href="/styleguide" onClose={onClose}>
            Styleguide
          </UserDropdownMenuLink>
        ) : null}
      </ul>

      <button
        type="button"
        onClick={() => {
          onClose();
          void (onBeforeSignOut?.() ?? Promise.resolve()).finally(() => {
            void signOut({ callbackUrl: "/login" });
          });
        }}
        className="group mt-3 flex items-center gap-3 rounded-lg px-3 py-2 text-theme-sm font-medium text-awc-fg hover:bg-awc-tile hover:text-awc-fg dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
      >
        Sign out
      </button>
    </Dropdown>
  );
}
