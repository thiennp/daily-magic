"use client";

import { useCallback, useState } from "react";

import { clearProjectSyncOnLeave } from "@/features/projects/sync/clearProjectSyncOnLeave";
import requestLeaveUserProject from "@/features/projects/utils/requestLeaveUserProject";

/** Client leave for one project (POST /api/projects/[projectId]/leave). */
export default function useLeaveProject(projectId: string): {
  readonly pending: boolean;
  readonly errorMessage: string | null;
  readonly leaveProject: () => Promise<boolean>;
  readonly clearError: () => void;
} {
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const clearError = useCallback((): void => {
    setErrorMessage(null);
  }, []);

  const leaveProject = useCallback(async (): Promise<boolean> => {
    setPending(true);
    setErrorMessage(null);

    const result = await requestLeaveUserProject(projectId);
    if (!result.ok) {
      setErrorMessage(result.errorMessage);
      setPending(false);
      return false;
    }

    await clearProjectSyncOnLeave(projectId);
    setPending(false);
    return true;
  }, [projectId]);

  return { pending, errorMessage, leaveProject, clearError };
}
