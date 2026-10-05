"use client";

import { useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import AppIcon from "@/components/ui/icon/AppIcon";
import AwcProjectCardActionsMenuItems from "@/features/projects/AwcProjectCardActionsMenuItems";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/resolveProjectEditOnMacCta";
import isDefaultUserProject from "@/lib/projects/isDefaultUserProject";
import { MoreDotIcon } from "@/icons";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";

interface AwcProjectCardActionsMenuProps {
  readonly projectId: string;
  readonly projectName: string;
  readonly editCta: ProjectEditOnMacCta;
  readonly editHelperId: string | undefined;
  readonly onProjectDeleted?: () => void;
  readonly canDelete: boolean;
}

export default function AwcProjectCardActionsMenu({
  projectId,
  projectName,
  editCta,
  editHelperId,
  onProjectDeleted,
  canDelete,
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
        className="dropdown-toggle inline-flex h-11 w-11 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200 sm:h-8 sm:w-8"
        onClick={() => {
          setIsOpen((current) => !current);
        }}
      >
        <AppIcon icon={MoreDotIcon} size="md" />
      </button>
      <Dropdown
        isOpen={isOpen}
        onClose={closeMenu}
        toggleRef={toggleRef}
        className="w-52 py-1 dark:bg-gray-dark"
      >
        <ul id={menuId} role="menu" aria-label="Project actions">
          <AwcProjectCardActionsMenuItems
            projectId={projectId}
            projectName={projectName}
            isDefaultProject={isDefaultUserProject({ name: projectName })}
            canDelete={canDelete}
            assignTasksHref={assignTasksHref}
            editCta={editCta}
            editHelperId={editHelperId}
            onClose={closeMenu}
            onProjectDeleted={onProjectDeleted}
          />
        </ul>
      </Dropdown>
    </div>
  );
}
