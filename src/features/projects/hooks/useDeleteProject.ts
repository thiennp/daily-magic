"use client";

import { useCallback, useState } from "react";

import { clearProjectSyncOnLeave } from "@/features/projects/sync/clearProjectSyncOnLeave";
import requestDeleteUserProject from "@/features/projects/utils/requestDeleteUserProject";

/**
 * Client delete for one project (DELETE /api/projects/[projectId]).
 * 403 → "Only the owner can delete this project."
 */
export default function useDeleteProject(projectId: string): {
  readonly pending: boolean;
  readonly errorMessage: string | null;
  readonly deleteProject: () => Promise<boolean>;
  readonly clearError: () => void;
} {
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const clearError = useCallback((): void => {
    setErrorMessage(null);
  }, []);

  const deleteProject = useCallback(async (): Promise<boolean> => {
    setPending(true);
    setErrorMessage(null);

    const result = await requestDeleteUserProject(projectId);
    if (!result.ok) {
      setErrorMessage(result.errorMessage);
      setPending(false);
      return false;
    }

    await clearProjectSyncOnLeave(projectId);
    setPending(false);
    return true;
  }, [projectId]);

  return { pending, errorMessage, deleteProject, clearError };
}
