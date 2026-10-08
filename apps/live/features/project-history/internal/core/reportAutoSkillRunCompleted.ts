import type { HarnessWriterAgentId } from "../../../../adapters/writerDispatch";
import type { AgentWitchCloudApiConfig } from "../../../projects/internal/core/agentWitchCloudApi";

import type { AutoSkillRunRecord } from "./autoSkill.types";
import {
  createAgentAutoSkillCompleter,
  probeSignedInAutoSkillAgent,
} from "./autoSkillAgent";
import { createHttpAutoSkillCloud } from "./autoSkillCloud";
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

/**
 * Production wiring for the "completed run" hook: real cloud, Ollama probe,
 * signed-in CLI probe. Fire-and-forget safe (never throws).
 */
export const reportAutoSkillRunCompleted = async (input: {
  readonly cloudApi: AgentWitchCloudApiConfig;
  readonly projectId: string;
  readonly run: AutoSkillRunRecord;
  readonly folderPath?: string;
}): Promise<AutoSkillOutcome> =>
  onAutoSkillRunCompleted(
    {
      projectId: input.projectId,
      run: input.run,
      ...(input.folderPath !== undefined
        ? { folderPath: input.folderPath }
        : {}),
    },
    {
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
      probeAvailability: async (writerOfRun) => ({
        ollamaModel: await probeAutoSkillOllamaModel(),
        agentWriter: await probeSignedInAutoSkillAgent(writerOfRun),
        botName: null,
      }),
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
