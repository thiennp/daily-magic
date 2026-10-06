import fs from "node:fs";
import path from "node:path";

import {
  PROJECT_HISTORY_DIR_NAME,
  PROJECT_HISTORY_SKILLGEN_DIR_NAME,
  PROJECT_HISTORY_SKILLS_DIR_NAME,
  PROJECT_HISTORY_SKILLS_DRAFTS_DIR_NAME,
} from "./projectHistoryPaths.constant";
import { resolveProjectDataDir } from "./resolveProjectDataDir";

/**
 * True when any History OFF purge target exists: `history/`,
 * `skills/_drafts/`, or `skillgen/`. Mirror and tombstones never count.
 */
export const hasProjectHistoryPurgeTargets = (projectId: string): boolean => {
  const projectDataDir = resolveProjectDataDir(projectId);
  return [
    path.join(projectDataDir, PROJECT_HISTORY_DIR_NAME),
    path.join(
      projectDataDir,
      PROJECT_HISTORY_SKILLS_DIR_NAME,
      PROJECT_HISTORY_SKILLS_DRAFTS_DIR_NAME,
    ),
    path.join(projectDataDir, PROJECT_HISTORY_SKILLGEN_DIR_NAME),
  ].some((target) => fs.existsSync(target));
};
