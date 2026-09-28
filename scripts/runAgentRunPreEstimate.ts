import {
  AGENT_RUN_REPORT_STATUSES,
  upsertAgentRunReportFile,
} from "./agentWitchRunReport";
import { buildAgentRunPreEstimatePrompt } from "./dispatch/agentRunWorkingEstimate.constant";
import { extractUserTaskFromWrappedPrompt } from "./dispatch/extractUserTaskFromWrappedPrompt";
import { formatAgentRunEstimateSummary } from "./dispatch/formatAgentRunEstimateSummary";
import { parseOllamaTaskEstimateSeconds } from "./dispatch/parseOllamaTaskEstimateSeconds";
import {
  queryAgentRunEstimateHistoryForPrompt,
  rememberAgentRunEstimate,
} from "./agentRunEstimateHistory";
import { requestOllamaTaskEstimate } from "./requestOllamaTaskEstimate";

export type MarketplacePlanEstimatePreRunBackend =
  | "anthropic-writer-api"
  | "cli-fallback-missing-anthropic-writer-api-key"
  | "cli-empty-catalog-model-id"
  | "cli-non-marketplace-pre-estimate";

export type MarketplacePlanEstimatePreRunDiagnostics = {
  readonly backend: MarketplacePlanEstimatePreRunBackend;
  readonly catalogModelId: string | null;
  readonly marketplaceTemplateId: string | null;
  readonly reasonCode: string | null;
};

export type AgentRunPreEstimateResult = {
  readonly estimateSeconds: number | null;
  readonly estimateSummary: string;
  readonly estimateOutput: string;
  readonly marketplacePlanEstimate: MarketplacePlanEstimatePreRunDiagnostics | null;
};

export type AgentRunPreEstimateDraft = {
  readonly estimateOutput: string | null;
  readonly task: string;
  readonly writerLabel: string;
  readonly embedding: readonly number[] | null;
};

export const beginAgentRunPreEstimate = async (input: {
  readonly wrappedPrompt: string;
  readonly writerLabel: string;
  readonly reportsDir: string;
  readonly estimateModel?: string | null;
  readonly capabilityNote?: string;
}): Promise<AgentRunPreEstimateDraft> => {
  const task = extractUserTaskFromWrappedPrompt(input.wrappedPrompt);
  const history = queryAgentRunEstimateHistoryForPrompt(input.reportsDir);
  const estimateOutput = await requestOllamaTaskEstimate(
    buildAgentRunPreEstimatePrompt(
      task,
      input.writerLabel,
      history.table,
      input.capabilityNote ?? "",
    ),
    input.estimateModel,
  );
  return {
    estimateOutput,
    task,
    writerLabel: input.writerLabel,
    embedding: history.embedding,
  };
};

export const storeAgentRunTimeEstimateHistory = (input: {
  readonly estimateOutput: string;
  readonly agentRunId: string;
  readonly reportsDir: string;
  readonly task: string;
  readonly writerLabel: string;
  readonly embedding: readonly number[] | null;
}): void => {
  const estimateSeconds = parseOllamaTaskEstimateSeconds(input.estimateOutput);
  if (estimateSeconds === null) {
    return;
  }

  rememberAgentRunEstimate({
    reportsDir: input.reportsDir,
    agentRunId: input.agentRunId,
    task: input.task,
    writerLabel: input.writerLabel,
    estimateSeconds,
    embedding: input.embedding,
  });
};

export const recordAgentRunPreEstimateOutput = (input: {
  readonly estimateOutput: string;
  readonly reportKey: string;
  readonly agentRunId: string;
  readonly reportsDir: string;
  readonly task: string;
  readonly writerLabel: string;
  readonly embedding: readonly number[] | null;
}): AgentRunPreEstimateResult => {
  const estimateSeconds = parseOllamaTaskEstimateSeconds(input.estimateOutput);
  if (estimateSeconds === null) {
    return {
      estimateSeconds: null,
      estimateSummary: "",
      estimateOutput: input.estimateOutput,
      marketplacePlanEstimate: null,
    };
  }

  const estimateSummary = formatAgentRunEstimateSummary(estimateSeconds);
  upsertAgentRunReportFile({
    reportKey: input.reportKey,
    agentRunId: input.agentRunId,
    status: AGENT_RUN_REPORT_STATUSES.IN_PROGRESS,
    userSummary: estimateSummary,
    details: input.estimateOutput.trim(),
    estimateSeconds,
  });
  rememberAgentRunEstimate({
    reportsDir: input.reportsDir,
    agentRunId: input.agentRunId,
    task: input.task,
    writerLabel: input.writerLabel,
    estimateSeconds,
    embedding: input.embedding,
  });

  return {
    estimateSeconds,
    estimateSummary,
    estimateOutput: input.estimateOutput,
    marketplacePlanEstimate: null,
  };
};

export const runAgentRunPreEstimate = async (input: {
  readonly wrappedPrompt: string;
  readonly reportKey: string;
  readonly agentRunId: string;
  readonly writerLabel: string;
  readonly reportsDir: string;
}): Promise<AgentRunPreEstimateResult> => {
  const draft = await beginAgentRunPreEstimate(input);
  return recordAgentRunPreEstimateOutput({
    estimateOutput: draft.estimateOutput ?? "",
    reportKey: input.reportKey,
    agentRunId: input.agentRunId,
    reportsDir: input.reportsDir,
    task: draft.task,
    writerLabel: draft.writerLabel,
    embedding: draft.embedding,
  });
};
