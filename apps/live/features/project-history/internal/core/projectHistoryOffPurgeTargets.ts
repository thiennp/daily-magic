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
 * Join path segments under projectDataDir for a History OFF purge target.
 *
 * Runtime guard (Arch soft / defense in depth): rejects empty or
 * whitespace-only segments so `path.join(projectDataDir, "")` can never
 * collapse to `projectDataDir` and rm the project root. Also rejects a
 * joined path that resolves to the project data dir itself.
 */
export const joinProjectHistoryOffPurgeTarget = (
  projectDataDir: string,
  ...segments: readonly string[]
): string => {
  if (typeof projectDataDir !== "string" || projectDataDir.trim().length === 0) {
    throw new Error("invalid_project_data_dir");
  }
  for (const segment of segments) {
    if (typeof segment !== "string" || segment.trim().length === 0) {
      throw new Error("empty_purge_path_segment");
    }
  }
  const joined = path.join(projectDataDir, ...segments);
  const rootResolved = path.resolve(projectDataDir);
  const joinedResolved = path.resolve(joined);
  if (joinedResolved === rootResolved) {
    throw new Error("purge_target_is_project_data_dir");
  }
  return joined;
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
  drafts: joinProjectHistoryOffPurgeTarget(
    projectDataDir,
    PROJECT_HISTORY_SKILLS_DIR_NAME,
    PROJECT_HISTORY_SKILLS_DRAFTS_DIR_NAME,
  ),
  skillgen: joinProjectHistoryOffPurgeTarget(
    projectDataDir,
    PROJECT_HISTORY_SKILLGEN_DIR_NAME,
  ),
  outcomes: joinProjectHistoryOffPurgeTarget(
    projectDataDir,
    PROJECT_HISTORY_OUTCOMES_DIR_NAME,
  ),
});

export const listProjectHistoryOffPurgeTargetPaths = (
  projectDataDir: string,
): readonly string[] => {
  const targets = resolveProjectHistoryOffPurgeTargets(projectDataDir);
  return [targets.drafts, targets.skillgen, targets.outcomes];
};
