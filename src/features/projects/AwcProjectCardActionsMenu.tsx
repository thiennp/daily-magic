"use client";

import { useId, useRef, useState } from "react";

import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import AppIcon from "@/components/ui/icon/AppIcon";
import {
  AwcProjectCardDeleteDialog,
  AwcProjectCardLeaveDialog,
} from "@/features/projects/AwcProjectCardActionsDialogs";
import AwcProjectCardActionsMenuItems from "@/features/projects/AwcProjectCardActionsMenuItems";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/public-api/types";
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
  readonly canAssign: boolean;
}

export default function AwcProjectCardActionsMenu({
  projectId,
  projectName,
  editCta,
  editHelperId,
  onProjectDeleted,
  canDelete,
  canAssign,
}: AwcProjectCardActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [leaveConfirmOpen, setLeaveConfirmOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeMenu = (): void => {
    setIsOpen(false);
  };
  const actionsLabel = `Actions for ${projectName}`;

  return (
    <div className="relative shrink-0">
      <button
        ref={toggleRef}
        type="button"
        aria-label={actionsLabel}
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
          aria-label={actionsLabel}
          className="flex flex-col gap-0.5"
        >
          <AwcProjectCardActionsMenuItems
            projectId={projectId}
            isDefaultProject={isDefaultUserProject({ name: projectName })}
            canDelete={canDelete}
            canLeave={!canDelete}
            assignTasksHref={
              canAssign ? buildNavConsolidationNewTaskHref({ projectId }) : null
            }
            editCta={editCta}
            editHelperId={editHelperId}
            onClose={closeMenu}
            onRequestDelete={() => setDeleteConfirmOpen(true)}
            onRequestLeave={() => setLeaveConfirmOpen(true)}
          />
        </ul>
      </Dropdown>
      {deleteConfirmOpen ? (
        <AwcProjectCardDeleteDialog
          projectId={projectId}
          projectName={projectName}
          onClose={() => setDeleteConfirmOpen(false)}
          onProjectDeleted={onProjectDeleted}
        />
      ) : null}
      {leaveConfirmOpen ? (
        <AwcProjectCardLeaveDialog
          projectId={projectId}
          onClose={() => setLeaveConfirmOpen(false)}
          onProjectDeleted={onProjectDeleted}
        />
      ) : null}
    </div>
  );
}
