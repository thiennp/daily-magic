"use client";

import { useCallback, useEffect, useState } from "react";

import loadUserProjectsFromApi from "@/features/agent/hooks/loadUserProjectsFromApi";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import type ProjectCompositionCounts from "@/lib/projects/types/ProjectCompositionCounts.type";

export function useUserProjects(deviceId: string): {
  readonly projects: readonly UserProjectRecord[];
  readonly compositionCountsByProjectId: Readonly<
    Record<string, ProjectCompositionCounts>
  >;
  readonly isLoading: boolean;
  readonly refreshProjects: () => Promise<void>;
  readonly addProject: (project: UserProjectRecord) => void;
  readonly removeProject: (projectId: string) => void;
} {
  const [projects, setProjects] = useState<readonly UserProjectRecord[]>([]);
  const [compositionCountsByProjectId, setCompositionCountsByProjectId] =
    useState<Readonly<Record<string, ProjectCompositionCounts>>>({});
  const [isLoading, setIsLoading] = useState(true);

  const refreshProjects = useCallback(async (): Promise<void> => {
    setIsLoading(true);

    try {
      const loaded = await loadUserProjectsFromApi(deviceId);
      setProjects(loaded.projects);
      setCompositionCountsByProjectId(loaded.compositionCountsByProjectId);
    } finally {
      setIsLoading(false);
    }
  }, [deviceId]);

  useEffect(() => {
    const controller = new AbortController();

    const load = async (): Promise<void> => {
      setIsLoading(true);

      try {
        const loaded = await loadUserProjectsFromApi(deviceId);

        if (!controller.signal.aborted) {
          setProjects(loaded.projects);
          setCompositionCountsByProjectId(loaded.compositionCountsByProjectId);
        }
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
  }, [deviceId]);

  useEffect(() => {
    const refreshAfterReturningFromLocalApp = (): void => {
      void refreshProjects();
    };

    window.addEventListener("focus", refreshAfterReturningFromLocalApp);

    return () => {
      window.removeEventListener("focus", refreshAfterReturningFromLocalApp);
    };
  }, [refreshProjects]);

  const addProject = useCallback((project: UserProjectRecord): void => {
    setProjects((current) => [project, ...current]);
  }, []);

  const removeProject = useCallback((projectId: string): void => {
    setProjects((current) =>
      current.filter((project) => project.id !== projectId),
    );
  }, []);

  return {
    projects,
    compositionCountsByProjectId,
    isLoading,
    refreshProjects,
    addProject,
    removeProject,
  };
}
