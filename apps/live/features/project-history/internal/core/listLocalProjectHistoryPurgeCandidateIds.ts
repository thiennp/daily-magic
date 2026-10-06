import fs from "node:fs";

import { resolveAgentWitchLocalLayout } from "@agent-witch/install-layout";

import { hasProjectHistoryPurgeTargets } from "./hasProjectHistoryPurgeTargets";
import { isValidProjectComputerHistoryProjectId } from "./isValidProjectComputerHistoryProjectId";

/**
 * Projects under project-data that still hold History data on disk, whatever
 * their local state says. The tick asks AWC about each so an OFF toggle is
 * seen even though AWL never receives an OFF push.
 */
export const listLocalProjectHistoryPurgeCandidateIds = (): readonly string[] => {
  const root = resolveAgentWitchLocalLayout().projectDataDir;
  if (!fs.existsSync(root)) {
    return [];
  }
  const ids: string[] = [];
  for (const name of fs.readdirSync(root)) {
    if (!isValidProjectComputerHistoryProjectId(name)) {
      continue;
    }
    if (hasProjectHistoryPurgeTargets(name)) {
      ids.push(name);
    }
  }
  return ids;
};
