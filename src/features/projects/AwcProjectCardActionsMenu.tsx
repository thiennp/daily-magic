"use client";

import { useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/resolveProjectEditOnMacCta";
import { MoreDotIcon } from "@/icons";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";

interface AwcProjectCardActionsMenuProps {
  readonly projectId: string;
  readonly editCta: ProjectEditOnMacCta;
  readonly editHelperId: string | undefined;
}

const MENU_ITEM_CLASS =
  "block w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5";

const MENU_ITEM_DISABLED_CLASS =
  "block w-full cursor-not-allowed px-3 py-2 text-left text-sm text-gray-400 dark:text-gray-500";

export default function AwcProjectCardActionsMenu({
  projectId,
  editCta,
  editHelperId,
}: AwcProjectCardActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = (): void => {
    setIsOpen(false);
  };

  const assignTasksHref = buildAgentComposerHref({
    pathname,
    projectId,
    customTask: true,
  });

  return (
    <div className="relative shrink-0">
      <button
        ref={toggleRef}
        type="button"
        aria-label="Project actions"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? menuId : undefined}
        className="dropdown-toggle inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
        onClick={() => {
          setIsOpen((current) => !current);
        }}
      >
        <MoreDotIcon className="h-5 w-5" />
      </button>
      <Dropdown
        isOpen={isOpen}
        onClose={closeMenu}
        toggleRef={toggleRef}
        className="w-48 py-1 dark:bg-gray-dark"
      >
        <ul id={menuId} role="menu" aria-label="Project actions">
          <li role="none">
            <DropdownItem
              tag="a"
              href={`/projects/${projectId}`}
              baseClassName={MENU_ITEM_CLASS}
              onItemClick={closeMenu}
            >
              View details
            </DropdownItem>
          </li>
          <li role="none">
            <DropdownItem
              tag="a"
              href={assignTasksHref}
              baseClassName={MENU_ITEM_CLASS}
              onItemClick={closeMenu}
            >
              Assign tasks
            </DropdownItem>
          </li>
          <li role="none">
            {editCta.href !== null ? (
              <a
                role="menuitem"
                href={editCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className={MENU_ITEM_CLASS}
                onClick={closeMenu}
              >
                Edit
              </a>
            ) : (
              <button
                type="button"
                role="menuitem"
                disabled
                aria-describedby={editHelperId}
                className={MENU_ITEM_DISABLED_CLASS}
              >
                Edit
              </button>
            )}
          </li>
        </ul>
      </Dropdown>
    </div>
  );
}
