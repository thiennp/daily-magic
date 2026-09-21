import { describe, expect, it } from "vitest";

import { MARKETPLACE_RUN_PHASES } from "@/lib/marketplace/runRecipe/MarketplaceRunPhase.constant";
import { resolveMarketplaceRunPhaseWriterRoute } from "@/lib/marketplace/runRecipe/resolveMarketplaceRunPhaseWriterRoute";
import { VIBE_CODING_APP_FEATURE_MARKETPLACE_RUN_RECIPE } from "@/lib/marketplace/runRecipe/vibeCodingAppFeatureMarketplaceRunRecipe.constant";

describe("resolveMarketplaceRunPhaseWriterRoute (Pimi contract)", () => {
  it("plan/estimate is cheaper-model eligible with HOLD catalog id", () => {
    const route = resolveMarketplaceRunPhaseWriterRoute(
      VIBE_CODING_APP_FEATURE_MARKETPLACE_RUN_RECIPE,
      MARKETPLACE_RUN_PHASES.PLAN_ESTIMATE,
    );

    expect(route).toEqual({
      phase: MARKETPLACE_RUN_PHASES.PLAN_ESTIMATE,
      cheaperModelEligible: true,
      catalogModelId: null,
    });
  });

  it("write stage uses default quality routing (no catalog override)", () => {
    const route = resolveMarketplaceRunPhaseWriterRoute(
      VIBE_CODING_APP_FEATURE_MARKETPLACE_RUN_RECIPE,
      MARKETPLACE_RUN_PHASES.WRITE,
    );

    expect(route).toEqual({
      phase: MARKETPLACE_RUN_PHASES.WRITE,
      cheaperModelEligible: false,
      catalogModelId: null,
    });
  });
});
