import { describe, expect, it } from "vitest";

import { buildMarketplacePlanEstimateTerminalStreamPayload } from "./buildMarketplacePlanEstimateTerminalStreamPayload";

describe("buildMarketplacePlanEstimateTerminalStreamPayload", () => {
  it("includes WS observability fields for Testi retest", () => {
    const payload = buildMarketplacePlanEstimateTerminalStreamPayload({
      runId: "run-1",
      diagnostics: {
        backend: "anthropic-writer-api",
        catalogModelId: "claude-3-5-haiku-20241022",
        marketplaceTemplateId: "vibe-coding-app-feature",
        reasonCode: null,
      },
    });

    expect(payload.marketplacePlanEstimateModelId).toBe(
      "claude-3-5-haiku-20241022",
    );
    expect(payload.marketplacePlanEstimateBackend).toBe("anthropic-writer-api");
    expect(payload.chunk).toContain("[[MARKETPLACE_PLAN_ESTIMATE]]");
  });

  it("includes reasonCode on CLI fallback diagnostics", () => {
    const payload = buildMarketplacePlanEstimateTerminalStreamPayload({
      runId: "run-1",
      diagnostics: {
        backend: "cli-fallback-missing-anthropic-writer-api-key",
        catalogModelId: "claude-3-5-haiku-20241022",
        marketplaceTemplateId: "vibe-coding-app-feature",
        reasonCode:
          "MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY",
      },
    });

    expect(payload.marketplacePlanEstimateBackend).toBe(
      "cli-fallback-missing-anthropic-writer-api-key",
    );
    expect(payload.marketplacePlanEstimateReasonCode).toBe(
      "MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY",
    );
  });
});
