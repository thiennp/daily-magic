import path from "node:path";

import { atomicWriteFile0600 } from "./atomicWriteFile0600";
import type { ProjectHistoryLearnedPitfallsFile } from "./projectHistoryLearnedPitfall.type";
import {
  PROJECT_HISTORY_SKILLGEN_DIR_NAME,
  PROJECT_HISTORY_SKILLGEN_LEARNED_PITFALLS_FILE_NAME,
} from "./projectHistoryPaths.constant";
import { ensureProjectDataTree } from "./resolveProjectDataDir";

/** Atomically writes skillgen/learned-pitfalls.json at 0600. */
export const writeProjectHistoryLearnedPitfalls = (input: {
  readonly projectId: string;
  readonly file: ProjectHistoryLearnedPitfallsFile;
}): ProjectHistoryLearnedPitfallsFile => {
  const projectDataDir = ensureProjectDataTree(input.projectId);
  const filePath = path.join(
    projectDataDir,
    PROJECT_HISTORY_SKILLGEN_DIR_NAME,
    PROJECT_HISTORY_SKILLGEN_LEARNED_PITFALLS_FILE_NAME,
  );
  const record: ProjectHistoryLearnedPitfallsFile = {
    ...input.file,
    updatedAt: new Date().toISOString(),
  };
  atomicWriteFile0600(filePath, `${JSON.stringify(record)}\n`);
  return record;
};
