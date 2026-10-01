import deriveProjectFolderSlug from "@/lib/projects/deriveProjectFolderSlug";
import { DEFAULT_USER_PROJECT_NAME } from "@/lib/projects/defaultUserProject.constants";
import isDefaultUserProject from "@/lib/projects/isDefaultUserProject";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

export interface ProjectListCardTitle {
  readonly primary: string;
  readonly secondaryLabel: string | null;
}

const resolveProjectListCardTitle = (
  project: Pick<UserProjectRecord, "name" | "folderPath">,
): ProjectListCardTitle => {
  const trimmedName = project.name.trim();
  const folderSlug = deriveProjectFolderSlug(project.folderPath);

  if (trimmedName.length === 0 || isDefaultUserProject(project)) {
    return {
      primary: folderSlug.length > 0 ? folderSlug : DEFAULT_USER_PROJECT_NAME,
      secondaryLabel: folderSlug.length > 0 ? DEFAULT_USER_PROJECT_NAME : null,
    };
  }

  return {
    primary: trimmedName,
    secondaryLabel: null,
  };
};

export default resolveProjectListCardTitle;
