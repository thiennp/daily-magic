import { DEFAULT_USER_PROJECT_NAME } from "@/lib/projects/defaultUserProject.constants";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

const PERSONAL_PROJECT_NAME = "Personal";

const findByName = (
  projects: readonly UserProjectRecord[],
  name: string,
): UserProjectRecord | undefined =>
  projects.find(
    (project) => project.name.trim().toLowerCase() === name.toLowerCase(),
  );

/**
 * Default target for "Save to which project?":
 * current project context → last-used project → Default → Personal → first.
 * Returns "" when the user has no projects.
 */
export const resolveSaveToProjectDefault = (input: {
  readonly projects: readonly UserProjectRecord[];
  readonly contextProjectId?: string | null;
  readonly lastUsedProjectId?: string | null;
}): string => {
  const contextProjectId = input.contextProjectId?.trim() ?? "";
  // The context project counts only when it is one the caller may save into (the list is filtered).
  if (
    contextProjectId.length > 0 &&
    input.projects.some((project) => project.id === contextProjectId)
  ) {
    return contextProjectId;
  }

  const lastUsedProjectId = input.lastUsedProjectId?.trim() ?? "";
  if (
    lastUsedProjectId.length > 0 &&
    input.projects.some((project) => project.id === lastUsedProjectId)
  ) {
    return lastUsedProjectId;
  }

  return (
    findByName(input.projects, DEFAULT_USER_PROJECT_NAME)?.id ??
    findByName(input.projects, PERSONAL_PROJECT_NAME)?.id ??
    input.projects[0]?.id ??
    ""
  );
};
