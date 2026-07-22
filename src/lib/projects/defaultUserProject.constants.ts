import buildDefaultProjectFolderPath from "@/lib/projects/buildDefaultProjectFolderPath";

export const DEFAULT_USER_PROJECT_NAME = "Default";

export const buildDefaultUserProjectFolderPath = (): string =>
  buildDefaultProjectFolderPath(DEFAULT_USER_PROJECT_NAME);
