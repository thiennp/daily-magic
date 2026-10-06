"use client";

import useDismissibleMenu from "@/features/projects/hooks/useDismissibleMenu";
import { PROJECT_PAGE_LIBRARY_ACTIONS_COPY as A } from "@/features/projects/library/projectPageLibraryActionsCopy.constant";
import { PROJECT_PAGE_LIBRARY_COPY as C } from "@/features/projects/library/projectPageLibraryCopy.constant";
import {
  PANEL_BUTTON_PRIMARY_CLASS,
  PANEL_BUTTON_SECONDARY_CLASS,
  PANEL_HEADING_CLASS,
  PANEL_INTRO_CLASS,
} from "@/features/projects/projectPagePanelChrome.constant";

const MENU_CLASS =
  "absolute right-0 z-20 mt-1 min-w-36 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-900";
const MENU_ITEM_CLASS =
  "block w-full px-3 py-1.5 text-left text-sm text-gray-800 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-white/[0.06]";

interface AwcProjectLibraryHeaderProps {
  readonly canEdit: boolean;
  readonly canCreateSkill: boolean;
  readonly onNewSkill: () => void;
  readonly onAddFrom: () => void;
}

/**
 * Heading + intro, **New** (always this project) and **Add from another
 * project**. New offers Skill only: playbook / workflow create forms wait on
 * Product open Q7 (no create UI on Cloud today).
 */
export default function AwcProjectLibraryHeader({
  canEdit,
  canCreateSkill,
  onNewSkill,
  onAddFrom,
}: AwcProjectLibraryHeaderProps) {
  const { menuOpen, setMenuOpen, wrapRef } = useDismissibleMenu();

  return (
    <header className="flex flex-wrap items-start justify-between gap-3 px-1">
      <div className="min-w-0 space-y-0.5">
        <h3 className={PANEL_HEADING_CLASS}>{C["library.heading"]}</h3>
        <p className={PANEL_INTRO_CLASS}>{C["library.intro"]}</p>
      </div>
      {canEdit ? (
        <div className="flex items-center gap-2">
          {canCreateSkill ? (
            <div ref={wrapRef} className="relative">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                className={PANEL_BUTTON_PRIMARY_CLASS}
                onClick={() => {
                  setMenuOpen((open) => !open);
                }}
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
          <button
            type="button"
            className={PANEL_BUTTON_SECONDARY_CLASS}
            onClick={onAddFrom}
          >
            {A["library.add_from"]}
          </button>
        </div>
      ) : null}
    </header>
  );
}
