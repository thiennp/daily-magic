import fs from "node:fs";
import path from "node:path";

import { ensureDir0700 } from "./atomicWriteFile0600";
import {
  PROJECT_HISTORY_FILE_MODE,
  PROJECT_HISTORY_SKILLGEN_DIR_NAME,
  PROJECT_HISTORY_SKILLGEN_METRICS_FILE_NAME,
} from "./projectHistoryPaths.constant";
import type { ProjectHistorySkillgenMetricsEvent } from "./recordProjectHistorySkillgenMetrics";
import { ensureProjectDataTree } from "./resolveProjectDataDir";

/**
 * Appends one metrics JSONL line (counts/costs only). Never writes message bodies.
 * Uses appendFileSync with 0600 create mode; dir ensured 0700.
 */
export const appendProjectHistorySkillgenMetrics = (input: {
  readonly projectId: string;
  readonly events: readonly ProjectHistorySkillgenMetricsEvent[];
}): void => {
  if (input.events.length === 0) {
    return;
  }
  const projectDataDir = ensureProjectDataTree(input.projectId);
  const dir = path.join(projectDataDir, PROJECT_HISTORY_SKILLGEN_DIR_NAME);
  ensureDir0700(dir);
  const filePath = path.join(dir, PROJECT_HISTORY_SKILLGEN_METRICS_FILE_NAME);
  const lines = `${input.events.map((event) => JSON.stringify(event)).join("\n")}\n`;
  fs.appendFileSync(filePath, lines, { mode: PROJECT_HISTORY_FILE_MODE });
  try {
    fs.chmodSync(filePath, PROJECT_HISTORY_FILE_MODE);
  } catch {
    // best effort
  }
};
