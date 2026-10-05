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
import { createDefaultProjectHistorySkillgenRunner } from "./createDefaultProjectHistorySkillgenRunner";
import { listLocalHistoryActiveProjectIds } from "./localProjectHistoryState";
import type { OwnerLlmDraftWriter } from "./ownerLlmDraftWriter.port";

const LOG_PREFIX = "[project-history-tick]";

export type TickProjectComputerHistoryDeps = {
  readonly listProjectIds?: () => readonly string[];
  readonly cloudApi?: AgentWitchCloudApiConfig | null;
  readonly pullSkills?: PullPublishedProjectSkillsToMirror;
  /**
   * Optional skillgen mining hook. When omitted, the default disk-backed runner
   * runs (History ON only). Pass a no-op to skip mining in pull-focused tests.
   * Failures are isolated from skill pull and never affect ack/delete.
   */
  readonly runSkillgen?: (input: {
    readonly projectId: string;
  }) => void | Promise<void>;
  /** Injected owner-LLM writer for the default skillgen runner (null = stop before EXTRACT). */
  readonly ownerLlm?: OwnerLlmDraftWriter | null;
};

/**
 * One History tick: optional skillgen mining (DI) then shared published-skill pull.
 * Skillgen and pull errors are caught, logged, retried next tick — never affect ack/delete.
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
  const runSkillgen =
    deps.runSkillgen ??
    createDefaultProjectHistorySkillgenRunner({
      ownerLlm: deps.ownerLlm ?? null,
    });

  for (const projectId of projectIds) {
    // Skillgen mining — failures isolated from pull and ack/delete.
    try {
      await runSkillgen({ projectId });
    } catch (error: unknown) {
      console.error(LOG_PREFIX, "skillgen_failed", projectId, error);
    }

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
