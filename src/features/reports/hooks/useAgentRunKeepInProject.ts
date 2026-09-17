"use client";

import { useCallback, useEffect, useState } from "react";

const useAgentRunKeepInProject = (
  runId: string,
  projectId: string | null,
): {
  readonly visible: boolean;
  readonly isSaving: boolean;
  readonly message: string | null;
  readonly keepInProject: () => Promise<void>;
} => {
  const [hasRunScoped, setHasRunScoped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (projectId === null || projectId.length === 0) {
      return;
    }

    const controller = new AbortController();

    const load = async (): Promise<void> => {
      try {
        const response = await fetch(
          `/api/agent-runs/${encodeURIComponent(runId)}/composition-snapshot`,
          { signal: controller.signal },
        );
        if (!response.ok) {
          return;
        }
        const data: unknown = await response.json();
        const runScopedCount =
          typeof data === "object" &&
          data !== null &&
          typeof (data as { runScopedCount?: unknown }).runScopedCount ===
            "number"
            ? (data as { runScopedCount: number }).runScopedCount
            : 0;
        setHasRunScoped(runScopedCount > 0);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void load();

    return () => {
      controller.abort();
    };
  }, [projectId, runId]);

  const keepInProject = useCallback(async () => {
    if (projectId === null || projectId.length === 0) {
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      const response = await fetch(
        `/api/projects/${encodeURIComponent(projectId)}/runs/${encodeURIComponent(runId)}/keep-scoped-components`,
        { method: "POST" },
      );
      const data: unknown = await response.json().catch(() => null);
      if (
        response.ok &&
        typeof data === "object" &&
        data !== null &&
        (data as { ok?: unknown }).ok === true
      ) {
        setMessage("Run-scoped components are now pinned on this project.");
        setHasRunScoped(false);
      } else {
        const errorMessage =
          typeof data === "object" &&
          data !== null &&
          typeof (data as { errorMessage?: unknown }).errorMessage === "string"
            ? (data as { errorMessage: string }).errorMessage
            : "Could not keep components in project.";
        setMessage(errorMessage);
      }
    } finally {
      setIsSaving(false);
    }
  }, [projectId, runId]);

  const hasProject = projectId !== null && projectId.length > 0;

  return {
    visible: hasProject && !isLoading && hasRunScoped,
    isSaving,
    message,
    keepInProject,
  };
};

export default useAgentRunKeepInProject;
