/** Install-safe default project path (no repo `../src` imports). */
export const DEFAULT_USER_PROJECT_NAME = "Default";

const AGENT_WITCH_PROJECTS_HOME_PATH = "~/.agent-witch/projects";

const slugifyProjectName = (projectName: string): string =>
  projectName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);

export const buildDefaultUserProjectFolderPath = (): string => {
  const slug = slugifyProjectName(DEFAULT_USER_PROJECT_NAME);

  return `${AGENT_WITCH_PROJECTS_HOME_PATH}/${slug.length > 0 ? slug : "project"}`;
};
