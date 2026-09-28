"use client";

import { useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import AwcProjectCardActionsMenuItems from "@/features/projects/AwcProjectCardActionsMenuItems";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/resolveProjectEditOnMacCta";
import { MoreDotIcon } from "@/icons";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";

interface AwcProjectCardActionsMenuProps {
  readonly projectId: string;
  readonly editCta: ProjectEditOnMacCta;
  readonly editHelperId: string | undefined;
}

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
          <AwcProjectCardActionsMenuItems
            projectId={projectId}
            assignTasksHref={assignTasksHref}
            editCta={editCta}
            editHelperId={editHelperId}
            onClose={closeMenu}
          />
        </ul>
      </Dropdown>
    </div>
  );
}
