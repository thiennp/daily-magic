"use client";

import { useState } from "react";

import AwcProjectDeleteConfirmForm from "@/features/projects/AwcProjectDeleteConfirmForm";
import { AWC_PROJECT_DELETE_COPY } from "@/features/projects/awcProjectDeleteCopy.constant";
import useDeleteProject from "@/features/projects/hooks/useDeleteProject";
import {
  PROJECTS_V5_DIVIDER_CLASS,
  PROJECTS_V5_MENU_ITEM_DANGER_CLASS,
} from "@/features/projects/projectsPageV5Classes.constant";

interface AwcProjectDeleteMenuItemProps {
  readonly projectId: string;
  readonly projectName: string;
  readonly onDeleted?: () => void;
}

const AwcProjectDeleteMenuItem = ({
  projectId,
  projectName,
  onDeleted,
}: AwcProjectDeleteMenuItemProps) => {
  const { deleteProject, errorMessage, pending, clearError } =
    useDeleteProject(projectId);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const runDelete = (): void => {
    void deleteProject().then((ok) => {
      if (ok) {
        setConfirmOpen(false);
        onDeleted?.();
      }
    });
  };

  return (
    <>
      <li role="none" className={`mt-1 pt-1 ${PROJECTS_V5_DIVIDER_CLASS}`}>
        <button
          type="button"
          role="menuitem"
          className={PROJECTS_V5_MENU_ITEM_DANGER_CLASS}
          onClick={() => {
            clearError();
            setConfirmOpen(true);
          }}
        >
          {AWC_PROJECT_DELETE_COPY.trigger}
        </button>
      </li>
      {confirmOpen ? (
        <AwcProjectDeleteConfirmForm
          variant="dialog"
          projectName={projectName}
          pending={pending}
          errorMessage={errorMessage}
          onConfirm={runDelete}
          onCancel={() => {
            clearError();
            setConfirmOpen(false);
          }}
        />
      ) : null}
    </>
  );
};

export default AwcProjectDeleteMenuItem;
