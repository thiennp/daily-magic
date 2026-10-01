"use client";

import { useCallback } from "react";

import {
  useUserProjectsLoader,
  type RefreshUserProjectsOptions,
} from "@/features/agent/hooks/useUserProjectsLoader";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import type ProjectCompositionCounts from "@/lib/projects/types/ProjectCompositionCounts.type";

export function useUserProjects(deviceId: string): {
  readonly projects: readonly UserProjectRecord[];
  readonly compositionCountsByProjectId: Readonly<
    Record<string, ProjectCompositionCounts>
  >;
  readonly isLoading: boolean;
  readonly loadFailed: boolean;
  readonly refreshProjects: (
    options?: RefreshUserProjectsOptions,
  ) => Promise<void>;
  readonly addProject: (project: UserProjectRecord) => void;
  readonly removeProject: (projectId: string) => void;
} {
  const {
    projects,
    compositionCountsByProjectId,
    isLoading,
    loadFailed,
    refreshProjects,
    setProjects,
  } = useUserProjectsLoader(deviceId);

  const addProject = useCallback(
    (project: UserProjectRecord): void => {
      setProjects((current) => [project, ...current]);
    },
    [setProjects],
  );

  const removeProject = useCallback(
    (projectId: string): void => {
      setProjects((current) =>
        current.filter((project) => project.id !== projectId),
      );
    },
    [setProjects],
  );

  return {
    projects,
    compositionCountsByProjectId,
    isLoading,
    loadFailed,
    refreshProjects,
    addProject,
    removeProject,
  };
}
