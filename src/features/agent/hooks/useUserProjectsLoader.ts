"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { fetchUserProjectsForLoader } from "@/features/agent/hooks/utils/fetchUserProjectsForLoader";
import type ProjectCompositionCounts from "@/lib/projects/types/ProjectCompositionCounts.type";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

export type RefreshUserProjectsOptions = {
  readonly showLoading?: boolean;
};

export function useUserProjectsLoader(deviceId: string): {
  readonly projects: readonly UserProjectRecord[];
  readonly compositionCountsByProjectId: Readonly<
    Record<string, ProjectCompositionCounts>
  >;
  readonly isLoading: boolean;
  readonly loadFailed: boolean;
  readonly refreshProjects: (
    options?: RefreshUserProjectsOptions,
  ) => Promise<void>;
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

  const runFetch = useCallback(
    async (
      generation: number,
      showLoading: boolean,
      isCancelled?: () => boolean,
    ): Promise<void> => {
      await fetchUserProjectsForLoader({
        deviceId,
        generation,
        showLoading,
        loadGenerationRef,
        isCancelled,
        setProjects,
        setCompositionCountsByProjectId,
        setLoadFailed,
        setIsLoading,
      });
    },
    [deviceId],
  );

  const refreshProjects = useCallback(
    async (options?: RefreshUserProjectsOptions): Promise<void> => {
      const showLoading = options?.showLoading ?? false;
      const generation = loadGenerationRef.current + 1;
      loadGenerationRef.current = generation;
      await runFetch(generation, showLoading);
    },
    [runFetch],
  );

  useEffect(() => {
    const controller = new AbortController();
    const generation = loadGenerationRef.current + 1;
    loadGenerationRef.current = generation;

    void runFetch(generation, true, () => controller.signal.aborted);

    return () => {
      controller.abort();
    };
  }, [runFetch]);

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
