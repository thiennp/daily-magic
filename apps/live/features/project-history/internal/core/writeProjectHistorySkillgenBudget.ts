import path from "node:path";

import { atomicWriteFile0600 } from "./atomicWriteFile0600";
import type { ProjectHistorySkillgenBudgetRecord } from "./projectHistorySkillgenEpisode.type";
import {
  PROJECT_HISTORY_SKILLGEN_BUDGET_FILE_NAME,
  PROJECT_HISTORY_SKILLGEN_DIR_NAME,
} from "./projectHistoryPaths.constant";
import { ensureProjectDataTree } from "./resolveProjectDataDir";

/** Atomically writes `skillgen/budget.json` at mode 0600. */
export const writeProjectHistorySkillgenBudget = (input: {
  readonly projectId: string;
  readonly budget: ProjectHistorySkillgenBudgetRecord;
}): ProjectHistorySkillgenBudgetRecord => {
  const projectDataDir = ensureProjectDataTree(input.projectId);
  const filePath = path.join(
    projectDataDir,
    PROJECT_HISTORY_SKILLGEN_DIR_NAME,
    PROJECT_HISTORY_SKILLGEN_BUDGET_FILE_NAME,
  );
  const record: ProjectHistorySkillgenBudgetRecord = {
    ...input.budget,
    updatedAt: new Date().toISOString(),
  };
  atomicWriteFile0600(filePath, `${JSON.stringify(record)}\n`);
  return record;
};
