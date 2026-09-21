import { describe, expect, it } from "vitest";

import { MARKETPLACE_RUN_PHASES } from "@/lib/marketplace/runRecipe/MarketplaceRunPhase.constant";
import { resolveMarketplaceRunPhaseWriterRoute } from "@/lib/marketplace/runRecipe/resolveMarketplaceRunPhaseWriterRoute";
import { VIBE_CODING_APP_FEATURE_MARKETPLACE_RUN_RECIPE } from "@/lib/marketplace/runRecipe/vibeCodingAppFeatureMarketplaceRunRecipe.constant";

describe("resolveMarketplaceRunPhaseWriterRoute (P1.3 scaffold)", () => {
  it("returns null modelId for plan/estimate until Pimi contract", () => {
    const route = resolveMarketplaceRunPhaseWriterRoute(
      VIBE_CODING_APP_FEATURE_MARKETPLACE_RUN_RECIPE,
      MARKETPLACE_RUN_PHASES.PLAN_ESTIMATE,
    );

    expect(route).toEqual({
      phase: MARKETPLACE_RUN_PHASES.PLAN_ESTIMATE,
      modelId: null,
    });
  });

  it("returns null for unknown phase on recipe", () => {
    expect(
      resolveMarketplaceRunPhaseWriterRoute(
        VIBE_CODING_APP_FEATURE_MARKETPLACE_RUN_RECIPE,
        "unknown" as typeof MARKETPLACE_RUN_PHASES.PLAN_ESTIMATE,
      ),
    ).toBeNull();
  });
});
