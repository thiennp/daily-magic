"use client";

import { useId, type ReactNode } from "react";

import AwcProjectDetailHeaderMoreIcon from "@/features/projects/AwcProjectDetailHeaderMoreIcon";
import AwcProjectDetailHeaderMenuItem from "@/features/projects/AwcProjectDetailHeaderMenuItem";
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
  /** A viewer cannot invite anyone. */
  readonly canInvite: boolean;
  readonly onRename: () => void;
  readonly onInvite: () => void;
  readonly onDelete: () => void;
  readonly onLeave: () => void;
}

/** Header action cluster: Edit + More actions (Rename / Invite / Delete|Leave). */
export default function AwcProjectDetailHeaderActions({
  children,
  canRename,
  canDelete,
  canLeave,
  canInvite,
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
    <div
      ref={wrapRef}
      className="relative flex w-full shrink-0 items-start gap-2 sm:w-auto"
    >
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
        <AwcProjectDetailHeaderMoreIcon />
      </button>
      {menuOpen ? (
        <div id={menuId} role="menu" className={PROJECT_V5_MENU_CLASS}>
          {canRename ? (
            <AwcProjectDetailHeaderMenuItem
              label={copy.menuRename}
              onSelect={() => select(onRename)}
            />
          ) : null}
          {canInvite ? (
            <AwcProjectDetailHeaderMenuItem
              label={copy.menuInvite}
              onSelect={() => select(onInvite)}
            />
          ) : null}
          {canDelete || canLeave ? (
            <div
              className="my-1 border-t border-awc-border dark:border-gray-800"
              role="separator"
            />
          ) : null}
          {canDelete ? (
            <AwcProjectDetailHeaderMenuItem
              danger
              label={copy.menuDelete}
              onSelect={() => select(onDelete)}
            />
          ) : null}
          {canLeave ? (
            <AwcProjectDetailHeaderMenuItem
              danger
              label={AWC_PROJECT_LEAVE_COPY.trigger}
              onSelect={() => select(onLeave)}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
