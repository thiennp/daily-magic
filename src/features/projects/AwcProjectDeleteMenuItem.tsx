"use client";

import { useState } from "react";

import Button from "@/components/ui/button/Button";
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
        <p className="text-xs text-gray-800 dark:text-white/90">
          Delete “{projectName}” from your account? Files on your Mac are not
          removed.
        </p>
        {errorMessage !== null ? (
          <p className="mt-1 text-xs text-error-600" role="alert">
            {errorMessage}
          </p>
        ) : null}
        <div className="mt-2 flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            disabled={isDeleting}
            className="min-h-11 bg-error-600 hover:bg-error-700 sm:min-h-0"
            onClick={runDelete}
          >
            {isDeleting ? "Deleting…" : "Yes, delete"}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isDeleting}
            className="min-h-11 sm:min-h-0"
            onClick={() => {
              setConfirmOpen(false);
            }}
          >
            Cancel
          </Button>
        </div>
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
        Delete project
      </button>
    </li>
  );
};

export default AwcProjectDeleteMenuItem;
