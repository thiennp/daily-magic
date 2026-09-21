import {
  runHeadlessWriter,
  runMarketplacePlanEstimateHeadlessWriter,
  type AgentWitchHeadlessWriterConfig,
  type MarketplacePlanEstimateHeadlessWriterExecution,
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
import { resolveMarketplaceTemplateIdForMacClient } from "@/lib/marketplace/runRecipe/resolveMarketplaceTemplateIdForMacClient";

import {
  AGENT_RUN_REPORT_STATUSES,
  upsertAgentRunReportFile,
} from "./agentWitchRunReport";

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
  readonly planEstimateStageFailed: boolean;
  readonly planEstimateReasonCode: string | null;
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

export const runAgentRunPreEstimate = async (input: {
  readonly config: AgentWitchHeadlessWriterConfig;
  readonly writerAgent: HarnessWriterAgentId;
  readonly wrappedPrompt: string;
  readonly reportKey: string;
  readonly agentRunId: string;
  readonly marketplaceTemplateId?: string | null;
  readonly capabilityId?: string | null;
}): Promise<AgentRunPreEstimateResult> => {
  const resolvedMarketplaceTemplateId =
    resolveMarketplaceTemplateIdForMacClient(
      input.marketplaceTemplateId,
      input.capabilityId,
    );

  const marketplaceRecipe = resolveMarketplaceRunRecipeByTemplateId(
    resolvedMarketplaceTemplateId,
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
    resolvedMarketplaceTemplateId,
  );

  const catalogModelId = planEstimateWriterRoute?.catalogModelId ?? null;
  const useCatalogCheapModel =
    planEstimateWriterRoute?.cheaperModelEligible === true &&
    catalogModelId !== null &&
    catalogModelId.trim().length > 0;

  const { headlessResult, marketplacePlanEstimate } = useCatalogCheapModel
    ? await (async () => {
        const cheapResult = await runMarketplacePlanEstimateHeadlessWriter(
          input.config,
          input.writerAgent,
          estimatePrompt,
          catalogModelId,
        );
        return {
          headlessResult: cheapResult,
          marketplacePlanEstimate: {
            backend: cheapResult.execution.backend,
            catalogModelId,
            marketplaceTemplateId: resolvedMarketplaceTemplateId,
            reasonCode: cheapResult.execution.reasonCode,
          } satisfies MarketplacePlanEstimatePreRunDiagnostics,
        };
      })()
    : await (async () => {
        if (resolvedMarketplaceTemplateId !== null) {
          console.log(
            `[agent-witch] marketplace plan/estimate skipped cheap model (recipe=${resolvedMarketplaceTemplateId}, cheaperModelEligible=${String(planEstimateWriterRoute?.cheaperModelEligible === true)}, catalogModelId=${catalogModelId ?? "null"}) — using CLI headless pre-estimate`,
          );
        }
        return {
          headlessResult: await runHeadlessWriter(
            input.config,
            input.writerAgent,
            estimatePrompt,
          ),
          marketplacePlanEstimate:
            resolvedMarketplaceTemplateId !== null
              ? {
                  backend: "cli-non-marketplace-pre-estimate" as const,
                  catalogModelId,
                  marketplaceTemplateId: resolvedMarketplaceTemplateId,
                  reasonCode: null,
                }
              : null,
        };
      })();

  const planEstimateStageFailed =
    useCatalogCheapModel && headlessResult.exitCode !== 0;
  const planEstimateReasonCode =
    marketplacePlanEstimate?.reasonCode ??
    (planEstimateStageFailed ? "MARKETPLACE_PLAN_ESTIMATE_FAILED" : null);

  const estimateSeconds = planEstimateStageFailed
    ? null
    : parseAgentRunWorkingEstimateSeconds(headlessResult.output);
  const estimateSummary = planEstimateStageFailed
    ? headlessResult.output.trim()
    : formatAgentRunEstimateSummary(estimateSeconds);

  upsertAgentRunReportFile({
    reportKey: input.reportKey,
    agentRunId: input.agentRunId,
    status: planEstimateStageFailed
      ? AGENT_RUN_REPORT_STATUSES.FAILED
      : AGENT_RUN_REPORT_STATUSES.IN_PROGRESS,
    userSummary: planEstimateStageFailed
      ? "Plan/estimate stage failed on your Mac."
      : estimateSummary,
    ...(headlessResult.output.trim().length > 0
      ? { details: headlessResult.output.trim() }
      : {}),
    ...(estimateSeconds !== null ? { estimateSeconds } : {}),
  });

  return {
    estimateSeconds,
    estimateSummary,
    estimateOutput: headlessResult.output,
    marketplacePlanEstimate,
    planEstimateStageFailed,
    planEstimateReasonCode,
  };
};
