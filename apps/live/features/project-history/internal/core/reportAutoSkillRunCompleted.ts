import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import type { HarnessWriterAgentId } from "../../../../adapters/writerDispatch";
import {
  embedKnowledgeQuery,
  getKnowledgeDb,
} from "../../../knowledge/public-api/infrastructure";
import type { AgentWitchCloudApiConfig } from "../../../projects/internal/core/agentWitchCloudApi";

import type {
  AutoSkillAvailability,
  AutoSkillRunRecord,
} from "./autoSkill.types";
import {
  createAgentAutoSkillCompleter,
  probeSignedInAutoSkillAgent,
} from "./autoSkillAgent";
import { createHttpAutoSkillCloud } from "./autoSkillCloud";
import { ensureAutoSkillModuleSchema } from "./autoSkillModuleSchema";
import {
  createOllamaAutoSkillCompleter,
  probeAutoSkillOllamaModel,
} from "./autoSkillOllama";
import { readAutoSkillState, writeAutoSkillState } from "./autoSkillStore";
import { isLocalProjectHistoryOn } from "./isLocalProjectHistoryOn";
import { readLocalProjectHistoryState } from "./localProjectHistoryState";
import {
  onAutoSkillRunCompleted,
  type AutoSkillOutcome,
} from "./onAutoSkillRunCompleted";

const EMBED_TIMEOUT_MS = 5_000;

/**
 * Production wiring for the "completed run" hook: real cloud, Ollama probe,
 * signed-in CLI probe. Fire-and-forget safe (never throws).
 */
export const reportAutoSkillRunCompleted = async (input: {
  readonly cloudApi: AgentWitchCloudApiConfig;
  readonly projectId: string;
  readonly run: AutoSkillRunRecord;
  readonly folderPath?: string;
  /** Local layout: locates knowledge.db for the module store. */
  readonly layout?: AgentWitchLocalLayout;
  /** Agent output; its [[WAVE_PLAN]] block is the preferred module source. */
  readonly agentOutput?: string;
  /** Progress line the strip shows while a scan works through runs. */
  readonly statusNote?: string;
  /** Manual scan: judge this run alone, without waiting for a second occurrence. */
  readonly evaluateEachRun?: boolean;
  /** Judge availability probed once by the caller (a scan), so each run skips its own probe. */
  readonly availability?: AutoSkillAvailability;
}): Promise<AutoSkillOutcome> =>
  onAutoSkillRunCompleted(
    {
      projectId: input.projectId,
      run: input.run,
      ...(input.folderPath !== undefined
        ? { folderPath: input.folderPath }
        : {}),
      ...(input.agentOutput !== undefined
        ? { agentOutput: input.agentOutput }
        : {}),
      ...(input.statusNote !== undefined
        ? { statusNote: input.statusNote }
        : {}),
      ...(input.evaluateEachRun === true ? { evaluateEachRun: true } : {}),
    },
    {
      openModuleDb: () => {
        const db =
          input.layout === undefined ? null : getKnowledgeDb(input.layout);
        if (db !== null) {
          ensureAutoSkillModuleSchema(db);
        }
        return db;
      },
      embed: (text) => embedKnowledgeQuery(text, EMBED_TIMEOUT_MS),
      isHistoryOn: (projectId) =>
        isLocalProjectHistoryOn(readLocalProjectHistoryState(projectId)?.state),
      cloud: createHttpAutoSkillCloud(input.cloudApi),
      loadState: readAutoSkillState,
      // Unknown or OFF history counts as OFF: store only hashes + previews.
      saveState: (projectId, state) =>
        writeAutoSkillState(
          projectId,
          state,
          isLocalProjectHistoryOn(
            readLocalProjectHistoryState(projectId)?.state,
          ),
        ),
      probeAvailability: async (writerOfRun, judgeAgent) =>
        input.availability ?? {
          ollamaModel: await probeAutoSkillOllamaModel(),
          agentWriter: await probeSignedInAutoSkillAgent(
            writerOfRun,
            undefined,
            judgeAgent,
          ),
          botName: null,
        },
      makeCompleter: (kind, availability) => {
        if (kind === "ollama" && availability.ollamaModel !== null) {
          return createOllamaAutoSkillCompleter(availability.ollamaModel);
        }
        if (kind === "agent" && availability.agentWriter !== null) {
          return createAgentAutoSkillCompleter(
            availability.agentWriter as HarnessWriterAgentId,
            input.folderPath,
          );
        }
        return async () => ({ ok: false, reason: "judge_unavailable" });
      },
    },
  );
