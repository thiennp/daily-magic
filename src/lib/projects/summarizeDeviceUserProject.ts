export const summarizeDeviceUserProject = (project: {
  readonly id: string;
  readonly name: string;
  readonly folderPath: string;
  readonly repoUrls: readonly string[];
  readonly defaultBranch: string | null;
}) => ({
  id: project.id,
  name: project.name,
  folderPath: project.folderPath,
  repoUrls: project.repoUrls,
  defaultBranch: project.defaultBranch,
});
