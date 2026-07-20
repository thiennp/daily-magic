"use client";

import { useMemo, useState } from "react";

import { useUserProjects } from "@/features/agent/hooks/useUserProjects";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";
import { workflowRequiresProjectSelection } from "@/lib/workflows/workflowProjectFields";

export function useAutomationProjectSelection(
  workflowFields: readonly WorkflowFieldDefinition[],
): {
  readonly requiresProjectSelection: boolean;
  readonly projects: readonly UserProjectRecord[];
  readonly isProjectsLoading: boolean;
  readonly selectedProjectId: string;
  readonly selectedProject: UserProjectRecord | null;
  readonly setSelectedProjectId: (projectId: string) => void;
  readonly clearSelectedProject: () => void;
  readonly addProject: (project: UserProjectRecord) => void;
  readonly removeProject: (projectId: string) => void;
} {
  const requiresProjectSelection =
    workflowRequiresProjectSelection(workflowFields);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const { projects, isLoading, addProject, removeProject } =
    useUserProjects("");
  const selectedProject = useMemo(() => {
    if (!requiresProjectSelection || selectedProjectId.length === 0) {
      return null;
    }

    return projects.find((project) => project.id === selectedProjectId) ?? null;
  }, [projects, requiresProjectSelection, selectedProjectId]);

  return {
    requiresProjectSelection,
    projects,
    isProjectsLoading: isLoading,
    selectedProjectId,
    selectedProject,
    setSelectedProjectId,
    clearSelectedProject: () => {
      setSelectedProjectId("");
    },
    addProject,
    removeProject,
  };
}
