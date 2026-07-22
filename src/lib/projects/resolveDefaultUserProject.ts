import { DEFAULT_USER_PROJECT_NAME } from "@/lib/projects/defaultUserProject.constants";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

export const resolveDefaultUserProject = (
  projects: readonly UserProjectRecord[],
): UserProjectRecord | null =>
  projects.find(
    (project) =>
      project.name.trim().toLowerCase() ===
      DEFAULT_USER_PROJECT_NAME.toLowerCase(),
  ) ??
  projects[0] ??
  null;
