"use client";

import { useId, type ReactNode } from "react";

import useDismissibleMenu from "@/features/projects/hooks/useDismissibleMenu";
import { PROJECT_PAGE_LAYOUT_V2_COPY } from "@/features/projects/projectPageLayoutV2Copy.constant";

interface AwcProjectDetailHeaderActionsProps {
  /** Leading actions (Edit on this computer) inside the menu's dismiss wrap. */
  readonly children: ReactNode;
  readonly canRename: boolean;
  readonly onRename: () => void;
  readonly onInvite: () => void;
  readonly onDelete: () => void;
}

const TRIGGER_CLASS =
  "inline-grid size-8 place-items-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/40 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/15 dark:focus-visible:ring-gray-500/40";
const ITEM_CLASS =
  "rounded-lg px-3 py-2 text-left text-sm text-gray-800 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-400/40 dark:text-gray-100 dark:hover:bg-white/10";
const DANGER_ITEM_CLASS =
  "rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-400/40 dark:text-red-400 dark:hover:bg-red-950/40";

/** Header action cluster: leading actions + "More options" Rename / Invite / Delete menu. */
export default function AwcProjectDetailHeaderActions({
  children,
  canRename,
  onRename,
  onInvite,
  onDelete,
}: AwcProjectDetailHeaderActionsProps) {
  const copy = PROJECT_PAGE_LAYOUT_V2_COPY;
  const menuId = useId();
  const { menuOpen, setMenuOpen, wrapRef } = useDismissibleMenu();
  const select = (action: () => void): void => {
    setMenuOpen(false);
    action();
  };
  return (
    <div ref={wrapRef} className="relative flex shrink-0 items-center gap-2">
      {children}
      <button
        type="button"
        className={TRIGGER_CLASS}
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        aria-controls={menuId}
        aria-label={copy.moreOptions}
        onClick={() => {
          setMenuOpen((open) => !open);
        }}
      >
        <svg width="16" height="4" viewBox="0 0 18 4" fill="currentColor" aria-hidden>
          <circle cx="2" cy="2" r="2" />
          <circle cx="9" cy="2" r="2" />
          <circle cx="16" cy="2" r="2" />
        </svg>
      </button>
      {menuOpen ? (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 top-10 z-20 flex min-w-[14.5rem] flex-col rounded-[14px] border border-gray-200/90 bg-white p-1.5 shadow-lg dark:border-gray-700 dark:bg-gray-950"
        >
          {canRename ? (
            <button type="button" role="menuitem" className={ITEM_CLASS} onClick={() => select(onRename)}>
              {copy.menuRename}
            </button>
          ) : null}
          <button type="button" role="menuitem" className={ITEM_CLASS} onClick={() => select(onInvite)}>
            {copy.menuInvite}
          </button>
          <div
            className="my-1 border-t border-gray-200 dark:border-gray-800"
            role="separator"
          />
          <button type="button" role="menuitem" className={DANGER_ITEM_CLASS} onClick={() => select(onDelete)}>
            {copy.menuDelete}
          </button>
        </div>
      ) : null}
    </div>
  );
}
