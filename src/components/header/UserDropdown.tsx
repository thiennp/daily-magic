"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, type MouseEvent } from "react";

import UserDropdownMenu from "@/components/header/UserDropdownMenu";

const buildInitials = (displayName: string): string => {
  const trimmed = displayName.trim();

  if (trimmed.length === 0) {
    return "?";
  }

  const [firstWord] = trimmed.split(/\s+/);

  return (firstWord?.slice(0, 1) ?? "?").toUpperCase();
};

interface UserDropdownProps {
  readonly showStyleguide?: boolean;
}

export default function UserDropdown({ showStyleguide = false }: UserDropdownProps) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

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

  const displayName = session.user.name ?? session.user.email ?? "Account";
  const initials = buildInitials(displayName);
  const showImage = Boolean(session.user.image) && !imageError;

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={`${displayName} account menu`}
        className="dropdown-toggle flex max-w-full items-center gap-2 text-gray-700 dark:text-gray-400"
      >
        <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-zinc-100 text-sm font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
          {showImage ? (
            <Image
              width={44}
              height={44}
              src={session.user.image ?? ""}
              alt=""
              className="h-full w-full object-cover"
              onError={() => {
                setImageError(true);
              }}
            />
          ) : (
            initials
          )}
        </span>

        <span className="hidden max-w-[9rem] truncate text-theme-sm font-medium xl:block">
          {displayName}
        </span>

        <svg
          className={`hidden shrink-0 stroke-gray-500 transition-transform duration-200 dark:stroke-gray-400 xl:block ${
            isOpen ? "rotate-180" : ""
          }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
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
        showStyleguide={showStyleguide}
      />
    </div>
  );
}
