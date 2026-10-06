import type { AgentWitchCloudApiConfig } from "../../../projects/internal/core/agentWitchCloudApi";

import { decideProjectHistoryOffPurge } from "./decideProjectHistoryOffPurge";
import {
  fetchProjectComputerHistoryCloudState,
  type ProjectComputerHistoryCloudStateRead,
} from "./fetchProjectComputerHistoryCloudState";
import { hasProjectHistoryPurgeTargets } from "./hasProjectHistoryPurgeTargets";
import { isLocalProjectHistoryOn } from "./isLocalProjectHistoryOn";
import {
  readLocalProjectHistoryState,
  writeLocalProjectHistoryState,
} from "./localProjectHistoryState";
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
  /** True when local state still says ON (default: reads `history/state.json`). */
  readonly isLocalOn?: (projectId: string) => boolean;
  /** Records the confirmed OFF locally (default: writes `state.json` = off). */
  readonly markLocalOff?: (projectId: string) => void;
};

/**
 * IO edge: read cloud History state, decide, purge on confirmed OFF.
 * On confirmed OFF a local ON state is first rewritten to `off` (the message
 * archive is kept, so state.json survives); that write recreates empty
 * derived dirs, which the purge then removes. Idempotent, no extra state file. Never throws; logs one outcome line with no
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
  const isLocalOn =
    input.deps?.isLocalOn ??
    ((projectId: string) =>
      isLocalProjectHistoryOn(readLocalProjectHistoryState(projectId)?.state));
  const markLocalOff =
    input.deps?.markLocalOff ??
    ((projectId: string) => {
      writeLocalProjectHistoryState({ projectId, state: "off" });
    });

  let outcome: ProjectHistoryOffPurgeOutcome;
  try {
    const cloudState: ProjectComputerHistoryCloudStateRead =
      input.cloudApi === null
        ? { kind: "unknown", reason: "no_cloud_api" }
        : await fetchCloudState({
            cloudApi: input.cloudApi,
            projectId: input.projectId,
          });
    const confirmedOff = cloudState.kind === "known" && cloudState.state === "off";
    const hadTargets = confirmedOff ? hasTargets(input.projectId) : false;
    const decision = decideProjectHistoryOffPurge({
      cloudState,
      hasPurgeTargets: hadTargets,
    });
    let markedOff = false;
    if (confirmedOff && isLocalOn(input.projectId)) {
      try {
        markLocalOff(input.projectId);
        markedOff = true;
      } catch (error: unknown) {
        console.error(LOG_PREFIX, "mark_off_failed", input.projectId, error);
      }
    }
    if (decision === "purge" || (decision === "nothing_to_purge" && markedOff)) {
      try {
        purge({ projectId: input.projectId });
        outcome = decision === "purge" ? "purged" : "nothing_to_purge";
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
