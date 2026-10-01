"use client";

import { useCallback, useState } from "react";

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

      try {
        const response = await fetch(
          `/api/projects/${encodeURIComponent(projectId)}`,
          { method: "DELETE" },
        );
        const body: unknown = await response.json().catch(() => null);
        const message =
          typeof body === "object" &&
          body !== null &&
          typeof (body as { errorMessage?: unknown }).errorMessage === "string"
            ? (body as { errorMessage: string }).errorMessage
            : "Could not delete project.";

        if (!response.ok) {
          setErrorMessage(message);
          return false;
        }

        return true;
      } catch {
        setErrorMessage("Could not delete project.");
        return false;
      } finally {
        setIsDeleting(false);
      }
    },
    [],
  );

  return { isDeleting, errorMessage, deleteProject };
};

export default useDeleteUserProject;
