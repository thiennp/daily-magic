import path from "node:path";

import { atomicWriteFile0600 } from "./atomicWriteFile0600";
import type { ProjectHistorySkillgenEpisodesFile } from "./projectHistorySkillgenEpisode.type";
import {
  PROJECT_HISTORY_SKILLGEN_DIR_NAME,
  PROJECT_HISTORY_SKILLGEN_EPISODES_FILE_NAME,
} from "./projectHistoryPaths.constant";
import { ensureProjectDataTree } from "./resolveProjectDataDir";

/**
 * Atomically writes `skillgen/episodes.json` at mode 0600.
 */
export const writeProjectHistorySkillgenEpisodes = (input: {
  readonly projectId: string;
  readonly file: ProjectHistorySkillgenEpisodesFile;
}): ProjectHistorySkillgenEpisodesFile => {
  const projectDataDir = ensureProjectDataTree(input.projectId);
  const filePath = path.join(
    projectDataDir,
    PROJECT_HISTORY_SKILLGEN_DIR_NAME,
    PROJECT_HISTORY_SKILLGEN_EPISODES_FILE_NAME,
  );
  const record: ProjectHistorySkillgenEpisodesFile = {
    ...input.file,
    updatedAt: new Date().toISOString(),
  };
  atomicWriteFile0600(filePath, `${JSON.stringify(record)}\n`);
  return record;
};
