import { buildAgentRunTokenPreEstimatePrompt } from "./dispatch/agentRunWorkingTokenEstimate.constant";
import { extractUserTaskFromWrappedPrompt } from "./dispatch/extractUserTaskFromWrappedPrompt";
import { parseOllamaTaskEstimateTokens } from "./dispatch/parseOllamaTaskEstimateTokens";
import {
  queryAgentRunTokenEstimateHistoryForPrompt,
  rememberAgentRunTokenEstimate,
} from "./agentRunEstimateHistory";
import { requestOllamaTaskEstimate } from "./requestOllamaTaskEstimate";

export type AgentRunTokenPreEstimateDraft = {
  readonly estimateOutput: string | null;
  readonly task: string;
  readonly writerLabel: string;
};

export const beginAgentRunTokenPreEstimate = async (input: {
  readonly wrappedPrompt: string;
  readonly writerLabel: string;
  readonly reportsDir: string;
  readonly estimateModel?: string | null;
  readonly capabilityNote?: string;
}): Promise<AgentRunTokenPreEstimateDraft> => {
  const task = extractUserTaskFromWrappedPrompt(input.wrappedPrompt);
  const historyTable = queryAgentRunTokenEstimateHistoryForPrompt(
    input.reportsDir,
  );
  const estimateOutput = await requestOllamaTaskEstimate(
    buildAgentRunTokenPreEstimatePrompt(
      task,
      input.writerLabel,
      historyTable,
      input.capabilityNote ?? "",
    ),
    input.estimateModel,
  );
  return {
    estimateOutput,
    task,
    writerLabel: input.writerLabel,
  };
};

export const recordAgentRunTokenPreEstimateOutput = (input: {
  readonly estimateOutput: string;
  readonly agentRunId: string;
  readonly reportsDir: string;
  readonly task: string;
  readonly writerLabel: string;
}): number | null => {
  const estimateTokens = parseOllamaTaskEstimateTokens(input.estimateOutput);
  if (estimateTokens === null) {
    return null;
  }

  rememberAgentRunTokenEstimate({
    reportsDir: input.reportsDir,
    agentRunId: input.agentRunId,
    task: input.task,
    writerLabel: input.writerLabel,
    estimateTokens,
  });
  return estimateTokens;
};
