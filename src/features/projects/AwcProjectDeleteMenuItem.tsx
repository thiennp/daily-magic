"use client";

import { useState } from "react";

import AwcProjectDeleteConfirmForm from "@/features/projects/AwcProjectDeleteConfirmForm";
import { AWC_PROJECT_DELETE_COPY } from "@/features/projects/awcProjectDeleteCopy.constant";
import useDeleteUserProject from "@/features/projects/hooks/useDeleteUserProject";

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
  const { deleteProject, errorMessage, isDeleting } = useDeleteUserProject();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const runDelete = (): void => {
    void deleteProject(projectId).then((ok) => {
      if (ok) {
        setConfirmOpen(false);
        onDeleted?.();
      }
    });
  };

  if (confirmOpen) {
    return (
      <li
        role="none"
        className="border-t border-gray-100 px-3 py-2 dark:border-gray-800"
      >
        <AwcProjectDeleteConfirmForm
          projectName={projectName}
          isDeleting={isDeleting}
          errorMessage={errorMessage}
          onConfirm={runDelete}
          onCancel={() => {
            setConfirmOpen(false);
          }}
        />
      </li>
    );
  }

  return (
    <li role="none" className="border-t border-gray-100 dark:border-gray-800">
      <button
        type="button"
        role="menuitem"
        className="block min-h-11 w-full px-3 py-2.5 text-left text-sm text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-950/30 sm:min-h-0"
        onClick={() => {
          setConfirmOpen(true);
        }}
      >
        {AWC_PROJECT_DELETE_COPY.trigger}
      </button>
    </li>
  );
};

export default AwcProjectDeleteMenuItem;
