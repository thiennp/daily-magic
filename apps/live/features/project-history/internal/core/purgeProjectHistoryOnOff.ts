import fs from "node:fs";
import path from "node:path";

import {
  PROJECT_HISTORY_DIR_NAME,
  PROJECT_HISTORY_SKILLGEN_DIR_NAME,
  PROJECT_HISTORY_SKILLS_DIR_NAME,
  PROJECT_HISTORY_SKILLS_DRAFTS_DIR_NAME,
} from "./projectHistoryPaths.constant";
import { resolveProjectDataDir } from "./resolveProjectDataDir";

export type PurgeProjectHistoryOnOffResult = {
  readonly removedHistory: boolean;
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
 * History OFF purge: delete `history/`, `skills/_drafts/`, and `skillgen/`.
 * Mirror (`skills/<skillId>/`) and tombstones are kept.
 */
export const purgeProjectHistoryOnOff = (input: {
  readonly projectId: string;
}): PurgeProjectHistoryOnOffResult => {
  const projectDataDir = resolveProjectDataDir(input.projectId);
  const removedHistory = rmIfExists(
    path.join(projectDataDir, PROJECT_HISTORY_DIR_NAME),
  );
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
  return { removedHistory, removedDrafts, removedSkillgen };
};
