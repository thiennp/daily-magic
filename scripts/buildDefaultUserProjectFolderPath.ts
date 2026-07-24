/** Install-safe default project path (no repo `../src` imports). */
import os from "node:os";

import {
  resolveAgentWitchLocalLayout,
  resolveAgentWitchProjectsDir,
} from "./resolveAgentWitchLocalLayout";

export const DEFAULT_USER_PROJECT_NAME = "Default";

const slugifyProjectName = (projectName: string): string =>
  projectName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);

const toTildePath = (absolutePath: string): string => {
  const homeDir = os.homedir();
  return absolutePath.startsWith(homeDir)
    ? `~${absolutePath.slice(homeDir.length)}`
    : absolutePath;
};

export const buildDefaultUserProjectFolderPath = (): string => {
  const layout = resolveAgentWitchLocalLayout();
  const projectsDir = resolveAgentWitchProjectsDir(layout);
  const slug = slugifyProjectName(DEFAULT_USER_PROJECT_NAME);

  return `${toTildePath(projectsDir)}/${slug.length > 0 ? slug : "project"}`;
};
