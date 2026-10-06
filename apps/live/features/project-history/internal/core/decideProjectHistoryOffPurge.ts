import type { ProjectComputerHistoryCloudStateRead } from "./fetchProjectComputerHistoryCloudState";

export type ProjectHistoryOffPurgeDecision =
  | "purge"
  | "nothing_to_purge"
  | "skipped_unknown"
  | "history_on";

/**
 * Pure. Purge only on a confirmed OFF from a successful cloud read; an unknown
 * read (error, malformed, no cloud config) never wipes data.
 */
export const decideProjectHistoryOffPurge = (input: {
  readonly cloudState: ProjectComputerHistoryCloudStateRead;
  readonly hasPurgeTargets: boolean;
}): ProjectHistoryOffPurgeDecision => {
  if (input.cloudState.kind !== "known") {
    return "skipped_unknown";
  }
  if (input.cloudState.state !== "off") {
    return "history_on";
  }
  return input.hasPurgeTargets ? "purge" : "nothing_to_purge";
};
