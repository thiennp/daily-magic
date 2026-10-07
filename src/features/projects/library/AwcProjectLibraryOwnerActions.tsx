"use client";

import useDismissibleMenu from "@/features/projects/hooks/useDismissibleMenu";
import AwcProjectLibraryDisabledActions from "@/features/projects/library/AwcProjectLibraryDisabledActions";
import { PROJECT_PAGE_LIBRARY_ACTIONS_COPY as A } from "@/features/projects/library/projectPageLibraryActionsCopy.constant";
import {
  PANEL_BUTTON_PRIMARY_CLASS,
  PANEL_BUTTON_SECONDARY_CLASS,
} from "@/features/projects/projectPagePanelChrome.constant";

const MENU_CLASS =
  "absolute right-0 z-20 mt-1 min-w-36 overflow-hidden rounded-xl border border-awc-border bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-900";
const MENU_ITEM_CLASS =
  "block w-full px-3 py-1.5 text-left text-sm text-awc-fg hover:bg-awc-surface-2 dark:text-gray-200 dark:hover:bg-white/[0.06]";

interface Props {
  readonly canEdit: boolean;
  readonly canCreateSkill: boolean;
  readonly onNewSkill: () => void;
  readonly onAddFrom: () => void;
}

/**
 * HN-H3 one-item toolbar: outline Add from (secondary) + filled New (primary).
 * Non-owners get disabled-with-reason controls.
 */
export default function AwcProjectLibraryOwnerActions({
  canEdit,
  canCreateSkill,
  onNewSkill,
  onAddFrom,
}: Props) {
  const { menuOpen, setMenuOpen, wrapRef } = useDismissibleMenu();
  if (!canEdit) {
    return <AwcProjectLibraryDisabledActions />;
  }
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className={PANEL_BUTTON_SECONDARY_CLASS}
        onClick={onAddFrom}
      >
        {A["library.add_from"]}
      </button>
      {canCreateSkill ? (
        <div ref={wrapRef} className="relative">
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            className={PANEL_BUTTON_PRIMARY_CLASS}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {A["library.new"]}
          </button>
          {menuOpen ? (
            <div
              role="menu"
              aria-label={A["library.new.menu.aria"]}
              className={MENU_CLASS}
            >
              <button
                type="button"
                role="menuitem"
                className={MENU_ITEM_CLASS}
                onClick={() => {
                  setMenuOpen(false);
                  onNewSkill();
                }}
              >
                {A["library.new.menu.skill"]}
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
