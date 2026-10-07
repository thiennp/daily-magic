import fs from "node:fs";

import { listProjectHistoryOffPurgeTargetPaths } from "./projectHistoryOffPurgeTargets";
import { resolveProjectDataDir } from "./resolveProjectDataDir";

/**
 * True when any History OFF learning purge target exists: `skills/_drafts/`,
 * `skillgen/`, or `outcomes/`. The message archive `history/`, C1 `tasks/`,
 * mirror and tombstones never count.
 */
export const hasProjectHistoryPurgeTargets = (projectId: string): boolean => {
  const projectDataDir = resolveProjectDataDir(projectId);
  return listProjectHistoryOffPurgeTargetPaths(projectDataDir).some((target) =>
    fs.existsSync(target),
  );
};
