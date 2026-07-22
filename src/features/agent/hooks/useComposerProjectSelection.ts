"use client";

import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { useUserProjects } from "@/features/agent/hooks/useUserProjects";
import { applyProjectFolderToWorkflowFieldValues } from "@/lib/workflows/applyProjectFolderToWorkflowFieldValues";
import { workflowRequiresProjectSelection } from "@/lib/workflows/workflowProjectFields";
import { resolveDefaultUserProject } from "@/lib/projects/resolveDefaultUserProject";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

export function useComposerProjectSelection(input: {
  readonly workflowFields: readonly WorkflowFieldDefinition[];
  readonly deviceId: string;
}): {
  readonly requiresProjectSelection: boolean;
  readonly projects: readonly UserProjectRecord[];
  readonly isProjectsLoading: boolean;
  readonly selectedProjectId: string;
  readonly selectedProject: UserProjectRecord | null;
  readonly setSelectedProjectId: (projectId: string) => void;
  readonly clearSelectedProject: () => void;
  readonly addProject: (project: UserProjectRecord) => void;
  readonly removeProject: (projectId: string) => void;
  readonly mergeProjectIntoFieldValues: (
    values: Readonly<Record<string, string>>,
  ) => Record<string, string>;
} {
  const searchParams = useSearchParams();
  const urlProjectId = searchParams.get("projectId") ?? "";
  const [manualProjectId, setManualProjectId] = useState<string | null>(null);
  const { projects, isLoading, addProject, removeProject } = useUserProjects(
    input.deviceId,
  );
  const requiresProjectSelection = workflowRequiresProjectSelection(
    input.workflowFields,
  );
  const selectedProjectId = manualProjectId ?? urlProjectId;
  const defaultProject = useMemo(
    () => resolveDefaultUserProject(projects),
    [projects],
  );
  const effectiveSelectedProjectId =
    selectedProjectId.length > 0
      ? selectedProjectId
      : (defaultProject?.id ?? "");
  const selectedProject = useMemo(() => {
    if (effectiveSelectedProjectId.length === 0) {
      return defaultProject;
    }

    return (
      projects.find((project) => project.id === effectiveSelectedProjectId) ??
      defaultProject
    );
  }, [defaultProject, effectiveSelectedProjectId, projects]);

  const mergeProjectIntoFieldValues = (
    values: Readonly<Record<string, string>>,
  ): Record<string, string> => {
    if (selectedProject === null) {
      return { ...values };
    }

    return applyProjectFolderToWorkflowFieldValues(
      input.workflowFields,
      selectedProject.folderPath,
      values,
    );
  };

  return {
    requiresProjectSelection,
    projects,
    isProjectsLoading: isLoading,
    selectedProjectId: effectiveSelectedProjectId,
    selectedProject,
    setSelectedProjectId: setManualProjectId,
    clearSelectedProject: useCallback(() => {
      setManualProjectId(defaultProject?.id ?? "");
    }, [defaultProject?.id]),
    addProject,
    removeProject,
    mergeProjectIntoFieldValues,
  };
}
