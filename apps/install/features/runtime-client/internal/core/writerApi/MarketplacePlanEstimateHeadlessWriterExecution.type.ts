export type MarketplacePlanEstimateHeadlessWriterBackend =
  | "anthropic-writer-api"
  | "cli-fallback-missing-anthropic-key"
  | "cli-empty-catalog-model";

export type MarketplacePlanEstimateHeadlessWriterExecution = {
  readonly backend: MarketplacePlanEstimateHeadlessWriterBackend;
  readonly modelOverride: string | null;
};
