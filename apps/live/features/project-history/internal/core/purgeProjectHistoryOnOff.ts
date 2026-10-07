import fs from "node:fs";
import path from "node:path";

import {
  PROJECT_HISTORY_SKILLGEN_DIR_NAME,
  PROJECT_HISTORY_SKILLS_DIR_NAME,
  PROJECT_HISTORY_SKILLS_DRAFTS_DIR_NAME,
} from "./projectHistoryPaths.constant";
import { resolveProjectDataDir } from "./resolveProjectDataDir";

export type PurgeProjectHistoryOnOffResult = {
  readonly removedDrafts: boolean;
  readonly removedSkillgen: boolean;
};

const rmIfExists = (target: string): boolean => {
  if (!fs.existsSync(target)) {
    return false;
  }
  fs.rmSync(target, { recursive: true, force: true });
  return true;
};

/**
 * History OFF purge of history-DERIVED data only: delete `skills/_drafts/` and
 * `skillgen/` (episodes, budget, metrics, learned pitfalls, flags).
 * Chat-retention rule: the local message archive `history/` (message records
 * and `state.json`) is never deleted. Mirror (`skills/<skillId>/`) and
 * tombstones are kept.
 * C1 `tasks/` AI session records are PRIMARY source records (like messages),
 * not derived data — they are kept on OFF. Flag for Lead if Product wants
 * otherwise.
 */
export const purgeProjectHistoryOnOff = (input: {
  readonly projectId: string;
}): PurgeProjectHistoryOnOffResult => {
  const projectDataDir = resolveProjectDataDir(input.projectId);
  const removedDrafts = rmIfExists(
    path.join(
      projectDataDir,
      PROJECT_HISTORY_SKILLS_DIR_NAME,
      PROJECT_HISTORY_SKILLS_DRAFTS_DIR_NAME,
    ),
  );
  const removedSkillgen = rmIfExists(
    path.join(projectDataDir, PROJECT_HISTORY_SKILLGEN_DIR_NAME),
  );
  return { removedDrafts, removedSkillgen };
};
