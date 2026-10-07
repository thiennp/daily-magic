import path from "node:path";

import {
  PROJECT_HISTORY_OUTCOMES_DIR_NAME,
  PROJECT_HISTORY_SKILLGEN_DIR_NAME,
  PROJECT_HISTORY_SKILLS_DIR_NAME,
  PROJECT_HISTORY_SKILLS_DRAFTS_DIR_NAME,
} from "./projectHistoryPaths.constant";

export type ProjectHistoryOffPurgeTargets = {
  readonly drafts: string;
  readonly skillgen: string;
  readonly outcomes: string;
};

/**
 * Absolute paths of History OFF learning-only purge targets under a project
 * data dir. Single source for hasTargets + purge (cascade).
 *
 * PURGED (LOCKED Q1 learning): skills/_drafts/, skillgen/, outcomes/
 * KEPT: history/ (chats), tasks/ (C1 primary), skills/<id>/ mirror, _tombstones/
 *
 * Soft note for Human: when learning IDB caches appear, History OFF must also
 * clear them (shared clearLearningCaches). Chat/task IDB bodies follow
 * retention — not wiped by this AWL disk cascade. Neon meta caps = Dispatch.
 */
export const resolveProjectHistoryOffPurgeTargets = (
  projectDataDir: string,
): ProjectHistoryOffPurgeTargets => ({
  drafts: path.join(
    projectDataDir,
    PROJECT_HISTORY_SKILLS_DIR_NAME,
    PROJECT_HISTORY_SKILLS_DRAFTS_DIR_NAME,
  ),
  skillgen: path.join(projectDataDir, PROJECT_HISTORY_SKILLGEN_DIR_NAME),
  outcomes: path.join(projectDataDir, PROJECT_HISTORY_OUTCOMES_DIR_NAME),
});

export const listProjectHistoryOffPurgeTargetPaths = (
  projectDataDir: string,
): readonly string[] => {
  const targets = resolveProjectHistoryOffPurgeTargets(projectDataDir);
  return [targets.drafts, targets.skillgen, targets.outcomes];
};
