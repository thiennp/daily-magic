"use client";

import { useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import AppIcon from "@/components/ui/icon/AppIcon";
import AwcProjectCardActionsMenuItems from "@/features/projects/AwcProjectCardActionsMenuItems";
import AwcProjectDeleteConfirmForm from "@/features/projects/AwcProjectDeleteConfirmForm";
import AwcProjectLeaveConfirmForm from "@/features/projects/AwcProjectLeaveConfirmForm";
import useDeleteProject from "@/features/projects/hooks/useDeleteProject";
import useLeaveProject from "@/features/projects/hooks/useLeaveProject";
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
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [leaveConfirmOpen, setLeaveConfirmOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const {
    deleteProject,
    errorMessage: deleteError,
    pending: deletePending,
    clearError: clearDeleteError,
  } = useDeleteProject(projectId);
  const {
    leaveProject,
    errorMessage: leaveError,
    pending: leavePending,
    clearError: clearLeaveError,
  } = useLeaveProject(projectId);

  const closeMenu = (): void => {
    setIsOpen(false);
  };

  const assignTasksHref = buildNavConsolidationNewTaskHref({ projectId });
  const canLeave = !canDelete;

  const runDelete = (): void => {
    void deleteProject().then((ok) => {
      if (ok) {
        setDeleteConfirmOpen(false);
        onProjectDeleted?.();
      }
    });
  };

  const runLeave = (): void => {
    void leaveProject().then((ok) => {
      if (!ok) return;
      setLeaveConfirmOpen(false);
      onProjectDeleted?.();
      router.push("/projects");
      router.refresh();
    });
  };

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
            isDefaultProject={isDefaultUserProject({ name: projectName })}
            canDelete={canDelete}
            canLeave={canLeave}
            assignTasksHref={assignTasksHref}
            editCta={editCta}
            editHelperId={editHelperId}
            onClose={closeMenu}
            onRequestDelete={() => {
              clearDeleteError();
              setDeleteConfirmOpen(true);
            }}
            onRequestLeave={() => {
              clearLeaveError();
              setLeaveConfirmOpen(true);
            }}
          />
        </ul>
      </Dropdown>
      {deleteConfirmOpen ? (
        <AwcProjectDeleteConfirmForm
          variant="dialog"
          projectName={projectName}
          pending={deletePending}
          errorMessage={deleteError}
          onConfirm={runDelete}
          onCancel={() => {
            clearDeleteError();
            setDeleteConfirmOpen(false);
          }}
        />
      ) : null}
      {leaveConfirmOpen ? (
        <AwcProjectLeaveConfirmForm
          variant="dialog"
          pending={leavePending}
          errorMessage={leaveError}
          onConfirm={runLeave}
          onCancel={() => {
            clearLeaveError();
            setLeaveConfirmOpen(false);
          }}
        />
      ) : null}
    </div>
  );
}
