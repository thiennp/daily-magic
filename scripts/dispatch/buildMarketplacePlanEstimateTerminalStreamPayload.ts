import type { MarketplacePlanEstimatePreRunDiagnostics } from "../runAgentRunPreEstimate";

export const buildMarketplacePlanEstimateProgressChunk = (
  diagnostics: MarketplacePlanEstimatePreRunDiagnostics,
): string =>
  [
    "[[MARKETPLACE_PLAN_ESTIMATE]]",
    `marketplacePlanEstimateModelId=${diagnostics.catalogModelId ?? "null"}`,
    `marketplacePlanEstimateBackend=${diagnostics.backend}`,
    ...(diagnostics.reasonCode !== null
      ? [`marketplacePlanEstimateReasonCode=${diagnostics.reasonCode}`]
      : []),
  ].join("\n");

export const buildMarketplacePlanEstimateTerminalStreamPayload = (input: {
  readonly runId: string;
  readonly diagnostics: MarketplacePlanEstimatePreRunDiagnostics;
}): {
  readonly runId: string;
  readonly chunk: string;
  readonly marketplacePlanEstimateModelId: string | null;
  readonly marketplacePlanEstimateBackend: string;
  readonly marketplacePlanEstimateReasonCode?: string | null;
} => ({
  runId: input.runId,
  chunk: buildMarketplacePlanEstimateProgressChunk(input.diagnostics),
  marketplacePlanEstimateModelId: input.diagnostics.catalogModelId,
  marketplacePlanEstimateBackend: input.diagnostics.backend,
  ...(input.diagnostics.reasonCode !== null
    ? { marketplacePlanEstimateReasonCode: input.diagnostics.reasonCode }
    : {}),
});
