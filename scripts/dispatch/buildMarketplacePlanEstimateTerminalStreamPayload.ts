import type { MarketplacePlanEstimatePreRunDiagnostics } from "../runAgentRunPreEstimate";

export const buildMarketplacePlanEstimateProgressChunk = (
  diagnostics: MarketplacePlanEstimatePreRunDiagnostics,
): string =>
  [
    "[[MARKETPLACE_PLAN_ESTIMATE]]",
    `marketplacePlanEstimateModelId=${diagnostics.catalogModelId ?? "null"}`,
    `marketplacePlanEstimateBackend=${diagnostics.backend}`,
  ].join("\n");

export const buildMarketplacePlanEstimateTerminalStreamPayload = (input: {
  readonly runId: string;
  readonly diagnostics: MarketplacePlanEstimatePreRunDiagnostics;
}): {
  readonly runId: string;
  readonly chunk: string;
  readonly marketplacePlanEstimateModelId: string | null;
  readonly marketplacePlanEstimateBackend: string;
} => ({
  runId: input.runId,
  chunk: buildMarketplacePlanEstimateProgressChunk(input.diagnostics),
  marketplacePlanEstimateModelId: input.diagnostics.catalogModelId,
  marketplacePlanEstimateBackend: input.diagnostics.backend,
});
