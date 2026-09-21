export type MarketplacePlanEstimateHeadlessWriterBackend =
  | "anthropic-writer-api"
  | "cli-fallback-missing-anthropic-writer-api-key"
  | "cli-empty-catalog-model-id";

export type MarketplacePlanEstimateHeadlessWriterExecution = {
  readonly backend: MarketplacePlanEstimateHeadlessWriterBackend;
  readonly modelOverride: string | null;
  readonly reasonCode: string | null;
};
