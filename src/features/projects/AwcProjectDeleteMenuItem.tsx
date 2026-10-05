"use client";

import { useState } from "react";

import AwcProjectDeleteConfirmForm from "@/features/projects/AwcProjectDeleteConfirmForm";
import { AWC_PROJECT_DELETE_COPY } from "@/features/projects/awcProjectDeleteCopy.constant";
import useDeleteProject from "@/features/projects/hooks/useDeleteProject";

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
      <li role="none" className="border-t border-gray-100 dark:border-gray-800">
        <button
          type="button"
          role="menuitem"
          className="block min-h-11 w-full px-3 py-2.5 text-left text-sm text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-950/30 sm:min-h-0"
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
