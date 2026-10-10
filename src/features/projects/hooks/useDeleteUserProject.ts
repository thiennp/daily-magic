"use client";

import { useCallback, useState } from "react";

import { requestDeleteUserProject } from "@/features/projects/utils/public-api/presentation";

/**
 * @deprecated Prefer `useDeleteProject(projectId)` (binds id at hook time).
 * Kept for older call sites that pass projectId into `deleteProject(id)`.
 */
const useDeleteUserProject = (): {
  readonly isDeleting: boolean;
  readonly errorMessage: string | null;
  readonly deleteProject: (projectId: string) => Promise<boolean>;
} => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const deleteProject = useCallback(
    async (projectId: string): Promise<boolean> => {
      setIsDeleting(true);
      setErrorMessage(null);

      const result = await requestDeleteUserProject(projectId);
      if (!result.ok) {
        setErrorMessage(result.errorMessage);
        setIsDeleting(false);
        return false;
      }

      setIsDeleting(false);
      return true;
    },
    [],
  );

  return { isDeleting, errorMessage, deleteProject };
};

export default useDeleteUserProject;
