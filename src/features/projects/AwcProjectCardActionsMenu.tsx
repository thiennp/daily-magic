"use client";

import { useId, useRef, useState } from "react";

import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import AppIcon from "@/components/ui/icon/AppIcon";
import AwcProjectCardActionsMenuItems from "@/features/projects/AwcProjectCardActionsMenuItems";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/resolveProjectEditOnMacCta";
import {
  PROJECTS_V5_ICON_BUTTON_CLASS,
  PROJECTS_V5_MENU_PANEL_CLASS,
} from "@/features/projects/projectsPageV5Classes.constant";
import isDefaultUserProject from "@/lib/projects/isDefaultUserProject";
import { MoreDotIcon } from "@/icons";
import { buildNavConsolidationNewTaskHref } from "@/lib/shell/buildNavConsolidationNewTaskHref";

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
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = (): void => {
    setIsOpen(false);
  };

  const assignTasksHref = buildNavConsolidationNewTaskHref({ projectId });

  return (
    <div className="relative shrink-0">
      <button
        ref={toggleRef}
        type="button"
        aria-label="Project actions"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? menuId : undefined}
        className={`dropdown-toggle h-11 w-11 sm:h-8 sm:w-8 ${PROJECTS_V5_ICON_BUTTON_CLASS}`}
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
        panelBaseClassName={PROJECTS_V5_MENU_PANEL_CLASS}
      >
        <ul
          id={menuId}
          role="menu"
          aria-label="Project actions"
          className="flex flex-col gap-0.5"
        >
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
