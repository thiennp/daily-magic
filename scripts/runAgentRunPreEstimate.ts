import {
  runHeadlessWriter,
  runMarketplacePlanEstimateHeadlessWriter,
  type AgentWitchHeadlessWriterConfig,
} from "@agent-witch/install-runtime-client";
import type { HarnessWriterAgentId } from "./buildWriterCliInvocation";
import { buildAgentRunPreEstimatePrompt } from "./dispatch/agentRunWorkingEstimate.constant";
import { extractUserTaskFromWrappedPrompt } from "./dispatch/extractUserTaskFromWrappedPrompt";
import { formatAgentRunEstimateSummary } from "./dispatch/formatAgentRunEstimateSummary";
import { parseAgentRunWorkingEstimateSeconds } from "./dispatch/parseAgentRunWorkingEstimateSeconds";
import { buildMarketplaceVibeCodingPlanEstimatePrompt } from "@/lib/marketplace/runRecipe/buildMarketplaceVibeCodingPlanEstimatePrompt";
import { MARKETPLACE_RUN_PHASES } from "@/lib/marketplace/runRecipe/MarketplaceRunPhase.constant";
import { resolveMarketplaceRunPhaseWriterRoute } from "@/lib/marketplace/runRecipe/resolveMarketplaceRunPhaseWriterRoute";
import { resolveMarketplaceRunRecipeByTemplateId } from "@/lib/marketplace/runRecipe/resolveMarketplaceRunRecipeByTemplateId";

import {
  AGENT_RUN_REPORT_STATUSES,
  upsertAgentRunReportFile,
} from "./agentWitchRunReport";

export type AgentRunPreEstimateResult = {
  readonly estimateSeconds: number | null;
  readonly estimateSummary: string;
  readonly estimateOutput: string;
};

const buildPreEstimatePrompt = (
  taskPrompt: string,
  marketplaceTemplateId: string | null | undefined,
): string => {
  const recipe = resolveMarketplaceRunRecipeByTemplateId(marketplaceTemplateId);
  if (recipe === null) {
    return buildAgentRunPreEstimatePrompt(taskPrompt);
  }

  return buildMarketplaceVibeCodingPlanEstimatePrompt(taskPrompt);
};

export const runAgentRunPreEstimate = async (input: {
  readonly config: AgentWitchHeadlessWriterConfig;
  readonly writerAgent: HarnessWriterAgentId;
  readonly wrappedPrompt: string;
  readonly reportKey: string;
  readonly agentRunId: string;
  readonly marketplaceTemplateId?: string | null;
}): Promise<AgentRunPreEstimateResult> => {
  const marketplaceRecipe = resolveMarketplaceRunRecipeByTemplateId(
    input.marketplaceTemplateId,
  );
  const planEstimateWriterRoute =
    marketplaceRecipe !== null
      ? resolveMarketplaceRunPhaseWriterRoute(
          marketplaceRecipe,
          MARKETPLACE_RUN_PHASES.PLAN_ESTIMATE,
        )
      : null;

  const taskPrompt = extractUserTaskFromWrappedPrompt(input.wrappedPrompt);
  const estimatePrompt = buildPreEstimatePrompt(
    taskPrompt,
    input.marketplaceTemplateId,
  );

  const catalogModelId = planEstimateWriterRoute?.catalogModelId ?? null;
  const useCatalogCheapModel =
    planEstimateWriterRoute?.cheaperModelEligible === true &&
    catalogModelId !== null &&
    catalogModelId.trim().length > 0;

  const headlessResult = useCatalogCheapModel
    ? await runMarketplacePlanEstimateHeadlessWriter(
        input.config,
        input.writerAgent,
        estimatePrompt,
        catalogModelId,
      )
    : await runHeadlessWriter(input.config, input.writerAgent, estimatePrompt);
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
