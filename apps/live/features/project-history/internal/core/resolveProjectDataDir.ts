import path from "node:path";

import { resolveAgentWitchLocalLayout } from "@agent-witch/install-layout";

import { isValidProjectComputerHistoryProjectId } from "./isValidProjectComputerHistoryProjectId";
import {
  ensureDir0700,
} from "./atomicWriteFile0600";
import {
  PROJECT_HISTORY_DIR_NAME,
  PROJECT_HISTORY_SKILLS_DIR_NAME,
  PROJECT_HISTORY_SKILLS_DRAFTS_DIR_NAME,
  PROJECT_HISTORY_SKILLS_TOMBSTONES_DIR_NAME,
  PROJECT_HISTORY_SKILLGEN_DIR_NAME,
  PROJECT_HISTORY_TASKS_DIR_NAME,
} from "./projectHistoryPaths.constant";

export { isValidProjectComputerHistoryProjectId };

/**
 * `<profileDir>/project-data/<projectId>/`.
 * Does not use the deprecated local projects registry or projectFolderPath.
 */
export const resolveProjectDataDir = (projectId: string): string => {
  if (!isValidProjectComputerHistoryProjectId(projectId)) {
    throw new Error("invalid_project_id");
  }
  const layout = resolveAgentWitchLocalLayout();
  return path.join(layout.projectDataDir, projectId);
};

export const ensureProjectDataTree = (projectId: string): string => {
  const projectDataDir = resolveProjectDataDir(projectId);
  ensureDir0700(projectDataDir);
  ensureDir0700(path.join(projectDataDir, PROJECT_HISTORY_DIR_NAME));
  const skillsDir = path.join(projectDataDir, PROJECT_HISTORY_SKILLS_DIR_NAME);
  ensureDir0700(skillsDir);
  ensureDir0700(path.join(skillsDir, PROJECT_HISTORY_SKILLS_DRAFTS_DIR_NAME));
  ensureDir0700(
    path.join(skillsDir, PROJECT_HISTORY_SKILLS_TOMBSTONES_DIR_NAME),
  );
  ensureDir0700(path.join(projectDataDir, PROJECT_HISTORY_SKILLGEN_DIR_NAME));
  ensureDir0700(path.join(projectDataDir, PROJECT_HISTORY_TASKS_DIR_NAME));
  return projectDataDir;
};
