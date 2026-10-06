import path from "node:path";

import { atomicWriteFile0600 } from "./atomicWriteFile0600";
import type { ProjectHistorySkillgenFlagsFile } from "./projectHistoryLearnedPitfall.type";
import {
  PROJECT_HISTORY_SKILLGEN_DIR_NAME,
  PROJECT_HISTORY_SKILLGEN_FLAGS_FILE_NAME,
} from "./projectHistoryPaths.constant";
import { ensureProjectDataTree } from "./resolveProjectDataDir";

/** Atomically writes skillgen/flags.json at 0600. */
export const writeProjectHistorySkillgenFlags = (input: {
  readonly projectId: string;
  readonly file: ProjectHistorySkillgenFlagsFile;
}): ProjectHistorySkillgenFlagsFile => {
  const projectDataDir = ensureProjectDataTree(input.projectId);
  const filePath = path.join(
    projectDataDir,
    PROJECT_HISTORY_SKILLGEN_DIR_NAME,
    PROJECT_HISTORY_SKILLGEN_FLAGS_FILE_NAME,
  );
  const record: ProjectHistorySkillgenFlagsFile = {
    historyLearnedPitfalls: input.file.historyLearnedPitfalls,
    skillgenDraftsReview: input.file.skillgenDraftsReview ?? null,
    updatedAt: new Date().toISOString(),
  };
  atomicWriteFile0600(filePath, `${JSON.stringify(record)}\n`);
  return record;
};
