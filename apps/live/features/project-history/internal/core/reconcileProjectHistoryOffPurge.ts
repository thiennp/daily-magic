import type { AgentWitchCloudApiConfig } from "../../../projects/internal/core/agentWitchCloudApi";

import { decideProjectHistoryOffPurge } from "./decideProjectHistoryOffPurge";
import {
  fetchProjectComputerHistoryCloudState,
  type ProjectComputerHistoryCloudStateRead,
} from "./fetchProjectComputerHistoryCloudState";
import { hasProjectHistoryPurgeTargets } from "./hasProjectHistoryPurgeTargets";
import { purgeProjectHistoryOnOff } from "./purgeProjectHistoryOnOff";

const LOG_PREFIX = "[project-history-off-purge]";

export type ProjectHistoryOffPurgeOutcome =
  | "purged"
  | "nothing_to_purge"
  | "skipped_unknown"
  | "history_on"
  | "purge_failed";

export type ReconcileProjectHistoryOffPurgeDeps = {
  readonly fetchCloudState?: (input: {
    readonly cloudApi: AgentWitchCloudApiConfig;
    readonly projectId: string;
  }) => Promise<ProjectComputerHistoryCloudStateRead>;
  readonly hasPurgeTargets?: (projectId: string) => boolean;
  readonly purge?: typeof purgeProjectHistoryOnOff;
};

/**
 * IO edge: read cloud History state, decide, purge on confirmed OFF.
 * Idempotent (no state file). Never throws; logs one outcome line with no
 * message content. A failed purge is retried on the next tick.
 */
export const reconcileProjectHistoryOffPurge = async (input: {
  readonly projectId: string;
  readonly cloudApi: AgentWitchCloudApiConfig | null;
  readonly deps?: ReconcileProjectHistoryOffPurgeDeps;
}): Promise<ProjectHistoryOffPurgeOutcome> => {
  const fetchCloudState =
    input.deps?.fetchCloudState ?? fetchProjectComputerHistoryCloudState;
  const hasTargets = input.deps?.hasPurgeTargets ?? hasProjectHistoryPurgeTargets;
  const purge = input.deps?.purge ?? purgeProjectHistoryOnOff;

  let outcome: ProjectHistoryOffPurgeOutcome;
  try {
    const cloudState: ProjectComputerHistoryCloudStateRead =
      input.cloudApi === null
        ? { kind: "unknown", reason: "no_cloud_api" }
        : await fetchCloudState({
            cloudApi: input.cloudApi,
            projectId: input.projectId,
          });
    const decision = decideProjectHistoryOffPurge({
      cloudState,
      hasPurgeTargets:
        cloudState.kind === "known" && cloudState.state === "off"
          ? hasTargets(input.projectId)
          : false,
    });
    if (decision === "purge") {
      try {
        purge({ projectId: input.projectId });
        outcome = "purged";
      } catch (error: unknown) {
        console.error(LOG_PREFIX, "purge_failed", input.projectId, error);
        outcome = "purge_failed";
      }
    } else {
      outcome = decision;
    }
  } catch (error: unknown) {
    console.error(LOG_PREFIX, "reconcile_failed", input.projectId, error);
    outcome = "skipped_unknown";
  }
  if (outcome !== "history_on") {
    console.info(LOG_PREFIX, `outcome=${outcome}`, `projectId=${input.projectId}`);
  }
  return outcome;
};
