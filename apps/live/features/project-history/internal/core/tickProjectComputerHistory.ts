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
import { listLocalProjectHistoryPurgeCandidateIds } from "./listLocalProjectHistoryPurgeCandidateIds";
import type { OwnerLlmDraftWriter } from "./ownerLlmDraftWriter.port";
import { isConfirmedProjectHistoryOffOutcome } from "./isConfirmedProjectHistoryOffOutcome";
import {
  reconcileProjectHistoryOffPurge,
  type ProjectHistoryOffPurgeOutcome,
} from "./reconcileProjectHistoryOffPurge";

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
  /** Projects with History data on disk (any local state); checked for cloud OFF. */
  readonly listPurgeCandidateIds?: () => readonly string[];
  /** History OFF purge reconcile (DI). Default reads AWC and purges on confirmed OFF. */
  readonly reconcileOffPurge?: (input: {
    readonly projectId: string;
    readonly cloudApi: AgentWitchCloudApiConfig | null;
  }) => Promise<ProjectHistoryOffPurgeOutcome>;
};

/**
 * One History tick, per project:
 * 1. OFF purge reconcile — AWL never gets an OFF push, so every ON project and
 *    every project still holding derived data asks AWC; a confirmed `off`
 *    marks local state off, purges `skills/_drafts/` + `skillgen/` (message
 *    archive `history/`, mirror and tombstones kept) and skips the rest.
 *    Unknown/error reads never purge.
 * 2. Optional skillgen mining (DI), then shared published-skill pull — ON projects only.
 * Errors are caught, logged, retried next tick — never affect ack/delete.
 */
export const tickProjectComputerHistory = async (
  deps: TickProjectComputerHistoryDeps = {},
): Promise<void> => {
  const activeIds = deps.listProjectIds?.() ?? listLocalHistoryActiveProjectIds();
  const purgeCandidateIds =
    deps.listPurgeCandidateIds?.() ?? listLocalProjectHistoryPurgeCandidateIds();
  const activeSet = new Set(activeIds);
  const projectIds = [
    ...activeIds,
    ...purgeCandidateIds.filter((id) => !activeSet.has(id)),
  ];
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

  const reconcileOffPurge =
    deps.reconcileOffPurge ?? reconcileProjectHistoryOffPurge;

  for (const projectId of projectIds) {
    // History OFF purge — confirmed cloud OFF only; never crashes the tick.
    let offOutcome: ProjectHistoryOffPurgeOutcome = "skipped_unknown";
    try {
      offOutcome = await reconcileOffPurge({ projectId, cloudApi });
    } catch (error: unknown) {
      console.error(LOG_PREFIX, "off_purge_failed", projectId, error);
    }
    if (isConfirmedProjectHistoryOffOutcome(offOutcome)) {
      continue;
    }
    if (!activeSet.has(projectId)) {
      continue;
    }

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
