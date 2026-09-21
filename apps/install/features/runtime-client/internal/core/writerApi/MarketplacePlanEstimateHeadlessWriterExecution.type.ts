export type MarketplacePlanEstimateHeadlessWriterBackend =
  | "anthropic-writer-api"
  | "failed-missing-anthropic-writer-api-key"
  | "failed-empty-catalog-model-id";

export type MarketplacePlanEstimateHeadlessWriterExecution = {
  readonly backend: MarketplacePlanEstimateHeadlessWriterBackend;
  readonly modelOverride: string | null;
  readonly reasonCode: string | null;
};
