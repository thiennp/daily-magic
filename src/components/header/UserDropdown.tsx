"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, type MouseEvent } from "react";

import UserDropdownMenu from "@/components/header/UserDropdownMenu";

export default function UserDropdown() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setIsOpen((previous) => !previous);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  if (!session?.user) {
    return (
      <Link
        href="/login"
        className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
      >
        Sign in
      </Link>
    );
  }

  const displayName = session.user.name ?? session.user.email;
  const initials = displayName.slice(0, 1).toUpperCase();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleDropdown}
        className="dropdown-toggle flex items-center text-gray-700 dark:text-gray-400"
      >
        <span className="mr-3 flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-brand-50 text-sm font-semibold text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
          {session.user.image ? (
            <Image
              width={44}
              height={44}
              src={session.user.image}
              alt={displayName}
            />
          ) : (
            initials
          )}
        </span>

        <span className="text-theme-sm mr-1 block font-medium">
          {displayName}
        </span>

        <svg
          className={`stroke-gray-500 transition-transform duration-200 dark:stroke-gray-400 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <UserDropdownMenu
        isOpen={isOpen}
        session={session}
        displayName={displayName}
        onClose={closeDropdown}
      />
    </div>
  );
}
