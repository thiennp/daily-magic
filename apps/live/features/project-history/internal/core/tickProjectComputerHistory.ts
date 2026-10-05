import {
  pullPublishedProjectSkillsToMirror,
  type PullPublishedProjectSkillsToMirror,
} from "@agent-witch/shared/projectSkills";
import { readAgentWitchRunConfig } from "@agent-witch/install-runtime-client";

import {
  resolveAgentWitchCloudApiConfig,
  type AgentWitchCloudApiConfig,
} from "../../../projects/internal/core/agentWitchCloudApi";

import { createHttpProjectSkillAwcPublishedSource } from "./createHttpProjectSkillAwcPublishedSource";
import { createProjectSkillHistoryPort } from "./createProjectSkillHistoryPort";
import { listLocalHistoryActiveProjectIds } from "./localProjectHistoryState";

const LOG_PREFIX = "[project-history-tick]";

export type TickProjectComputerHistoryDeps = {
  readonly listProjectIds?: () => readonly string[];
  readonly cloudApi?: AgentWitchCloudApiConfig | null;
  readonly pullSkills?: PullPublishedProjectSkillsToMirror;
};

/**
 * One History tick: shared published-skill pull (mirror) with real HTTP listPublished.
 * Pull errors are caught, logged, retried next tick — never affect ack/delete.
 */
export const tickProjectComputerHistory = async (
  deps: TickProjectComputerHistoryDeps = {},
): Promise<void> => {
  const projectIds = deps.listProjectIds?.() ?? listLocalHistoryActiveProjectIds();
  if (projectIds.length === 0) {
    return;
  }

  const runConfig = readAgentWitchRunConfig();
  const cloudApi =
    deps.cloudApi !== undefined
      ? deps.cloudApi
      : runConfig === null
        ? null
        : resolveAgentWitchCloudApiConfig({
            wsUrl: runConfig.wsUrl,
            pairingToken: runConfig.pairingToken,
          });

  const historyPort = createProjectSkillHistoryPort();
  const pull = deps.pullSkills ?? pullPublishedProjectSkillsToMirror;

  for (const projectId of projectIds) {
    // Skill pull — failures isolated from ack/delete.
    if (cloudApi === null) {
      console.error(LOG_PREFIX, "pull_skipped_no_cloud_api", projectId);
      continue;
    }
    try {
      await pull({
        projectId,
        deps: {
          history: historyPort,
          awcPublished: createHttpProjectSkillAwcPublishedSource(cloudApi),
        },
      });
    } catch (error: unknown) {
      console.error(LOG_PREFIX, "pull_failed", projectId, error);
    }
  }
};
