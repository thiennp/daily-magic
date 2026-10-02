import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import type { ProjectRepoMetadata } from "@/lib/projects/validateProjectRepoUrls";

export const readProjectRepoMetadata = (
  project: UserProjectRecord,
): ProjectRepoMetadata => ({
  repoUrls: [...project.repoUrls],
  defaultBranch: project.defaultBranch,
});

export const buildProjectRepoMetadataKey = (
  project: UserProjectRecord,
): string =>
  `${project.id}\0${project.repoUrls.join("\n")}\0${project.defaultBranch ?? ""}`;
