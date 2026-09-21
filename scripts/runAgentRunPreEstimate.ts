import {
  runHeadlessWriter,
  type AgentWitchHeadlessWriterConfig,
} from "./agentWitchHeadlessWriterRun";
import type { HarnessWriterAgentId } from "./buildWriterCliInvocation";
import { buildAgentRunPreEstimatePrompt } from "./dispatch/agentRunWorkingEstimate.constant";
import { extractUserTaskFromWrappedPrompt } from "./dispatch/extractUserTaskFromWrappedPrompt";
import { formatAgentRunEstimateSummary } from "./dispatch/formatAgentRunEstimateSummary";
import { parseAgentRunWorkingEstimateSeconds } from "./dispatch/parseAgentRunWorkingEstimateSeconds";
import { resolveMarketplaceRunExecutionStages } from "@/lib/marketplace/runRecipe/resolveMarketplaceRunExecutionStages";
import { resolveMarketplaceRunPhaseWriterRoute } from "@/lib/marketplace/runRecipe/resolveMarketplaceRunPhaseWriterRoute";
import { resolveMarketplaceRunRecipeByTemplateId } from "@/lib/marketplace/runRecipe/resolveMarketplaceRunRecipeByTemplateId";
import { MARKETPLACE_RUN_PHASES } from "@/lib/marketplace/runRecipe/MarketplaceRunPhase.constant";

import {
  AGENT_RUN_REPORT_STATUSES,
  upsertAgentRunReportFile,
} from "./agentWitchRunReport";

export type AgentRunPreEstimateResult = {
  readonly estimateSeconds: number | null;
  readonly estimateSummary: string;
  readonly estimateOutput: string;
};

export const runAgentRunPreEstimate = async (input: {
  readonly config: AgentWitchHeadlessWriterConfig;
  readonly writerAgent: HarnessWriterAgentId;
  readonly wrappedPrompt: string;
  readonly reportKey: string;
  readonly agentRunId: string;
  /** When set, applies marketplace run-recipe plan/estimate hooks (P1.3 scaffold). */
  readonly marketplaceTemplateId?: string | null;
}): Promise<AgentRunPreEstimateResult> => {
  const marketplaceRecipe = resolveMarketplaceRunRecipeByTemplateId(
    input.marketplaceTemplateId,
  );
  const planEstimateStage =
    marketplaceRecipe !== null
      ? resolveMarketplaceRunExecutionStages(marketplaceRecipe).find(
          (stage) => stage.phase === MARKETPLACE_RUN_PHASES.PLAN_ESTIMATE,
        )
      : undefined;
  const planEstimateWriterRoute =
    marketplaceRecipe !== null
      ? resolveMarketplaceRunPhaseWriterRoute(
          marketplaceRecipe,
          MARKETPLACE_RUN_PHASES.PLAN_ESTIMATE,
        )
      : null;

  // TODO(Pimi): when planEstimateWriterRoute?.modelId is set, route headless plan/estimate to that model.
  void planEstimateStage;
  void planEstimateWriterRoute;

  const taskPrompt = extractUserTaskFromWrappedPrompt(input.wrappedPrompt);
  const estimatePrompt = buildAgentRunPreEstimatePrompt(taskPrompt);
  const headlessResult = await runHeadlessWriter(
    input.config,
    input.writerAgent,
    estimatePrompt,
  );
  const estimateSeconds = parseAgentRunWorkingEstimateSeconds(
    headlessResult.output,
  );
  const estimateSummary = formatAgentRunEstimateSummary(estimateSeconds);

  upsertAgentRunReportFile({
    reportKey: input.reportKey,
    agentRunId: input.agentRunId,
    status: AGENT_RUN_REPORT_STATUSES.IN_PROGRESS,
    userSummary: estimateSummary,
    ...(headlessResult.output.trim().length > 0
      ? { details: headlessResult.output.trim() }
      : {}),
    ...(estimateSeconds !== null ? { estimateSeconds } : {}),
  });

  return {
    estimateSeconds,
    estimateSummary,
    estimateOutput: headlessResult.output,
  };
};
