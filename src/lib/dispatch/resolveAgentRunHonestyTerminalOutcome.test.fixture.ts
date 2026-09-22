import { MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY } from "@/lib/marketplace/runRecipe/marketplacePlanEstimateReasonCode.constant";

export const buildWriterMissingCliFallbackFixtureOutput = (
  extraLines: readonly string[],
): string =>
  [
    "[[MARKETPLACE_PLAN_ESTIMATE]]",
    "marketplacePlanEstimateBackend=cli-fallback-missing-anthropic-writer-api-key",
    `marketplacePlanEstimateReasonCode=${MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY}`,
    ...extraLines,
  ].join("\n");
