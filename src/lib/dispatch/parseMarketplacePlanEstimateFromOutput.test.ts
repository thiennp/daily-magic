import { describe, expect, it } from "vitest";

import { parseMarketplacePlanEstimateFromOutput } from "@/lib/dispatch/parseMarketplacePlanEstimateFromOutput";
import { MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY } from "@/lib/marketplace/runRecipe/marketplacePlanEstimateReasonCode.constant";

describe("parseMarketplacePlanEstimateFromOutput", () => {
  it("parses backend and reason code from stream chunk", () => {
    const parsed = parseMarketplacePlanEstimateFromOutput(
      [
        "noise",
        "[[MARKETPLACE_PLAN_ESTIMATE]]",
        "marketplacePlanEstimateModelId=null",
        "marketplacePlanEstimateBackend=cli-fallback-missing-anthropic-writer-api-key",
        `marketplacePlanEstimateReasonCode=${MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY}`,
      ].join("\n"),
    );

    expect(parsed).toEqual({
      backend: "cli-fallback-missing-anthropic-writer-api-key",
      reasonCode: MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY,
      catalogModelId: null,
    });
  });
});
