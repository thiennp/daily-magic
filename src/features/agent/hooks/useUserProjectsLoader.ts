"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { runUserProjectsFetch } from "@/features/agent/hooks/runUserProjectsFetch";
import { applyUserProjectsFetchOutcome } from "@/features/agent/hooks/utils/applyUserProjectsFetchOutcome";
import type ProjectCompositionCounts from "@/lib/projects/types/ProjectCompositionCounts.type";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

export function useUserProjectsLoader(deviceId: string): {
  readonly projects: readonly UserProjectRecord[];
  readonly compositionCountsByProjectId: Readonly<
    Record<string, ProjectCompositionCounts>
  >;
  readonly isLoading: boolean;
  readonly loadFailed: boolean;
  readonly refreshProjects: () => Promise<void>;
  readonly setProjects: (
    value:
      | readonly UserProjectRecord[]
      | ((
          current: readonly UserProjectRecord[],
        ) => readonly UserProjectRecord[]),
  ) => void;
} {
  const [projects, setProjects] = useState<readonly UserProjectRecord[]>([]);
  const [compositionCountsByProjectId, setCompositionCountsByProjectId] =
    useState<Readonly<Record<string, ProjectCompositionCounts>>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const loadGenerationRef = useRef(0);

  const applyOutcome = useCallback(
    (
      outcome: Awaited<ReturnType<typeof runUserProjectsFetch>>,
      generation: number,
    ): void => {
      if (loadGenerationRef.current !== generation) {
        return;
      }

      applyUserProjectsFetchOutcome(outcome, {
        setProjects,
        setCompositionCountsByProjectId,
        setLoadFailed,
        setIsLoading,
      });
    },
    [],
  );

  const refreshProjects = useCallback(async (): Promise<void> => {
    const generation = loadGenerationRef.current + 1;
    loadGenerationRef.current = generation;
    setIsLoading(true);
    setLoadFailed(false);

    try {
      applyOutcome(await runUserProjectsFetch(deviceId), generation);
    } catch {
      if (loadGenerationRef.current === generation) {
        setLoadFailed(true);
        setIsLoading(false);
      }
    }
  }, [applyOutcome, deviceId]);

  useEffect(() => {
    const controller = new AbortController();
    const generation = loadGenerationRef.current + 1;
    loadGenerationRef.current = generation;

    const load = async (): Promise<void> => {
      setIsLoading(true);
      setLoadFailed(false);

      try {
        const outcome = await runUserProjectsFetch(deviceId);
        if (!controller.signal.aborted) {
          applyOutcome(outcome, generation);
        }
      } catch {
        if (
          !controller.signal.aborted &&
          loadGenerationRef.current === generation
        ) {
          setLoadFailed(true);
          setIsLoading(false);
        }
      }
    };

    void load();

    return () => {
      controller.abort();
    };
  }, [applyOutcome, deviceId]);

  useEffect(() => {
    const onFocus = (): void => {
      void refreshProjects();
    };

    window.addEventListener("focus", onFocus);

    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, [refreshProjects]);

  return {
    projects,
    compositionCountsByProjectId,
    isLoading,
    loadFailed,
    refreshProjects,
    setProjects,
  };
}
