import {
  AGENT_RUN_REPORT_STATUSES,
  upsertAgentRunReportFile,
} from "./agentWitchRunReport";
import { buildAgentRunPreEstimatePrompt } from "./dispatch/agentRunWorkingEstimate.constant";
import { extractUserTaskFromWrappedPrompt } from "./dispatch/extractUserTaskFromWrappedPrompt";
import { formatAgentRunEstimateSummary } from "./dispatch/formatAgentRunEstimateSummary";
import { parseOllamaTaskEstimateSeconds } from "./dispatch/parseOllamaTaskEstimateSeconds";
import { requestOllamaTaskEstimate } from "./requestOllamaTaskEstimate";

export type MarketplacePlanEstimatePreRunBackend =
  | MarketplacePlanEstimateHeadlessWriterExecution["backend"]
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

const buildPreEstimatePrompt = (
  taskPrompt: string,
  marketplaceTemplateId: string | null,
): string => {
  const recipe = resolveMarketplaceRunRecipeByTemplateId(marketplaceTemplateId);
  if (recipe === null) {
    return buildAgentRunPreEstimatePrompt(taskPrompt);
  }

  return buildMarketplaceVibeCodingPlanEstimatePrompt(taskPrompt);
};

const buildPlanEstimateReportNote = (
  diagnostics: MarketplacePlanEstimatePreRunDiagnostics,
): string | null => {
  if (diagnostics.backend === "anthropic-writer-api") {
    return `Plan/estimate used Anthropic Writer API (modelOverride=${diagnostics.catalogModelId ?? "unknown"}).`;
  }
  if (diagnostics.backend === "cli-fallback-missing-anthropic-writer-api-key") {
    return "Plan/estimate fell back to claude-cli because no Anthropic Writer API key is in writer-api-secrets.json on this Mac.";
  }
  return null;
};

export const beginAgentRunPreEstimate = (input: {
  readonly wrappedPrompt: string;
  readonly writerLabel: string;
}): Promise<string | null> =>
  requestOllamaTaskEstimate(
    buildAgentRunPreEstimatePrompt(
      extractUserTaskFromWrappedPrompt(input.wrappedPrompt),
      input.writerLabel,
    ),
  );

export const recordAgentRunPreEstimateOutput = (input: {
  readonly estimateOutput: string;
  readonly reportKey: string;
  readonly agentRunId: string;
}): AgentRunPreEstimateResult => {
  const estimateSeconds = parseOllamaTaskEstimateSeconds(input.estimateOutput);
  if (estimateSeconds === null) {
    return {
      estimateSeconds: null,
      estimateSummary: "",
      estimateOutput: input.estimateOutput,
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

  return {
    estimateSeconds,
    estimateSummary,
    estimateOutput: input.estimateOutput,
  };
};

export const runAgentRunPreEstimate = async (input: {
  readonly wrappedPrompt: string;
  readonly reportKey: string;
  readonly agentRunId: string;
  readonly writerLabel: string;
}): Promise<AgentRunPreEstimateResult> => {
  const estimateOutput = (await beginAgentRunPreEstimate(input)) ?? "";
  return recordAgentRunPreEstimateOutput({
    estimateOutput,
    reportKey: input.reportKey,
    agentRunId: input.agentRunId,
  });
};
