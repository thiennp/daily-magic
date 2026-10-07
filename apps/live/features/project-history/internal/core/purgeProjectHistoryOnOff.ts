import fs from "node:fs";

import { resolveProjectHistoryOffPurgeTargets } from "./projectHistoryOffPurgeTargets";
import { resolveProjectDataDir } from "./resolveProjectDataDir";

export type PurgeProjectHistoryOnOffResult = {
  readonly removedDrafts: boolean;
  readonly removedSkillgen: boolean;
  readonly removedOutcomes: boolean;
};

const rmIfExists = (target: string): boolean => {
  if (!fs.existsSync(target)) {
    return false;
  }
  fs.rmSync(target, { recursive: true, force: true });
  return true;
};

/**
 * History OFF purge cascade of history-DERIVED learning data only.
 *
 * Removes: `skills/_drafts/`, `skillgen/` (episodes, budget, metrics, learned
 * pitfalls, flags), and `outcomes/` (derived task-outcome index per LOCKED Q1).
 *
 * Never deletes: chat archive `history/` (messages + state.json + acks);
 * C1 primary `tasks/` AI session records (C1 keep-tasks lock); published skill
 * mirror `skills/<skillId>/`; `_tombstones/`.
 *
 * Soft note (Human): clear learning IDB caches on OFF when those stores exist;
 * chat/task body retention is separate. Neon package-cap prune = Dispatch.
 */
export const purgeProjectHistoryOnOff = (input: {
  readonly projectId: string;
}): PurgeProjectHistoryOnOffResult => {
  const targets = resolveProjectHistoryOffPurgeTargets(
    resolveProjectDataDir(input.projectId),
  );
  return {
    removedDrafts: rmIfExists(targets.drafts),
    removedSkillgen: rmIfExists(targets.skillgen),
    removedOutcomes: rmIfExists(targets.outcomes),
  };
};
