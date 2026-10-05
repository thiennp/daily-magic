"use client";

import { useCallback, useMemo, useState } from "react";

import { useUserProjects } from "@/features/agent/hooks/useUserProjects";
import {
  readLastSaveProjectId,
  writeLastSaveProjectId,
} from "@/features/capabilities/utils/lastSaveProjectStore";
import { resolveSaveToProjectDefault } from "@/features/capabilities/utils/resolveSaveToProjectDefault";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

export interface SaveToProjectPickerState {
  readonly projects: readonly UserProjectRecord[];
  readonly isLoading: boolean;
  readonly selectedProjectId: string;
  readonly setSelectedProjectId: (projectId: string) => void;
  readonly rememberProject: (projectId: string) => void;
}

/** Project target for library saves (POST /api/capabilities/templates/save). */
export function useSaveToProjectPicker(
  contextProjectId?: string,
): SaveToProjectPickerState {
  const { projects, isLoading } = useUserProjects("");
  const [manualProjectId, setManualProjectId] = useState<string | null>(null);
  const defaultProjectId = useMemo(
    () =>
      resolveSaveToProjectDefault({
        projects,
        contextProjectId,
        lastUsedProjectId: readLastSaveProjectId(),
      }),
    [contextProjectId, projects],
  );

  const rememberProject = useCallback((projectId: string): void => {
    writeLastSaveProjectId(projectId);
  }, []);

  return {
    projects,
    isLoading,
    selectedProjectId: manualProjectId ?? defaultProjectId,
    setSelectedProjectId: setManualProjectId,
    rememberProject,
  };
}
