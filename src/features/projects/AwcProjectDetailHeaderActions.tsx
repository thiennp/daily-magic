"use client";

import { useId, type ReactNode } from "react";

import useDismissibleMenu from "@/features/projects/hooks/useDismissibleMenu";
import { PROJECT_PAGE_LAYOUT_V2_COPY } from "@/features/projects/projectPageLayoutV2Copy.constant";
import {
  PROJECT_V5_MENU_CLASS,
  PROJECT_V5_ROUND_TRIGGER_CLASS,
} from "@/features/projects/projectPageV5ChromeClasses.constant";
import { PROJECT_PAGE_V5_CHROME_COPY } from "@/features/projects/projectPageV5ChromeCopy.constant";
import { AWC_PROJECT_LEAVE_COPY } from "@/features/projects/awcProjectLeaveCopy.constant";

interface AwcProjectDetailHeaderActionsProps {
  /** The one header action (Edit on this computer) inside the menu's dismiss wrap. */
  readonly children: ReactNode;
  readonly canRename: boolean;
  readonly canDelete: boolean;
  readonly canLeave: boolean;
  readonly onRename: () => void;
  readonly onInvite: () => void;
  readonly onDelete: () => void;
  readonly onLeave: () => void;
}

const ITEM_CLASS =
  "rounded-awc-control px-3 py-2 text-left text-[length:var(--awc-fs-body)] text-awc-fg hover:bg-awc-tile focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-awc-blue-600 dark:text-gray-100 dark:hover:bg-white/10";
const DANGER_ITEM_CLASS =
  "rounded-awc-control px-3 py-2 text-left text-[length:var(--awc-fs-body)] text-awc-bad hover:bg-awc-bad-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-awc-blue-600 dark:text-red-400 dark:hover:bg-red-950/40";

/** Header action cluster: Edit + More actions (Rename / Invite / Delete|Leave). */
export default function AwcProjectDetailHeaderActions({
  children,
  canRename,
  canDelete,
  canLeave,
  onRename,
  onInvite,
  onDelete,
  onLeave,
}: AwcProjectDetailHeaderActionsProps) {
  const copy = PROJECT_PAGE_LAYOUT_V2_COPY;
  const menuId = useId();
  const { menuOpen, setMenuOpen, wrapRef } = useDismissibleMenu();
  const select = (action: () => void): void => {
    setMenuOpen(false);
    action();
  };
  return (
    <div ref={wrapRef} className="relative flex w-full shrink-0 items-start gap-2 sm:w-auto">
      {children}
      <button
        type="button"
        className={PROJECT_V5_ROUND_TRIGGER_CLASS}
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        aria-controls={menuId}
        aria-label={PROJECT_PAGE_V5_CHROME_COPY["header.moreActions"]}
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
        <div id={menuId} role="menu" className={PROJECT_V5_MENU_CLASS}>
          {canRename ? (
            <button type="button" role="menuitem" className={ITEM_CLASS} onClick={() => select(onRename)}>
              {copy.menuRename}
            </button>
          ) : null}
          <button type="button" role="menuitem" className={ITEM_CLASS} onClick={() => select(onInvite)}>
            {copy.menuInvite}
          </button>
          {canDelete || canLeave ? (
            <div
              className="my-1 border-t border-awc-border dark:border-gray-800"
              role="separator"
            />
          ) : null}
          {canDelete ? (
            <button type="button" role="menuitem" className={DANGER_ITEM_CLASS} onClick={() => select(onDelete)}>
              {copy.menuDelete}
            </button>
          ) : null}
          {canLeave ? (
            <button type="button" role="menuitem" className={DANGER_ITEM_CLASS} onClick={() => select(onLeave)}>
              {AWC_PROJECT_LEAVE_COPY.trigger}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
