import { describe, expect, it } from "vitest";

import { MARKETPLACE_RUN_PHASES } from "@/lib/marketplace/runRecipe/MarketplaceRunPhase.constant";
import { resolveMarketplaceRunExecutionStages } from "@/lib/marketplace/runRecipe/resolveMarketplaceRunExecutionStages";
import { resolveMarketplaceRunRecipeByTemplateId } from "@/lib/marketplace/runRecipe/resolveMarketplaceRunRecipeByTemplateId";
import { VIBE_CODING_APP_FEATURE_MARKETPLACE_RUN_RECIPE } from "@/lib/marketplace/runRecipe/vibeCodingAppFeatureMarketplaceRunRecipe.constant";

describe("marketplace vibe-coding run recipe (P1.3 scaffold)", () => {
  it("resolves recipe by template id", () => {
    expect(
      resolveMarketplaceRunRecipeByTemplateId("vibe-coding-app-feature"),
    ).toBe(VIBE_CODING_APP_FEATURE_MARKETPLACE_RUN_RECIPE);
  });

  it("stages plan/estimate before write with WORKING_ESTIMATE on first stage only", () => {
    const recipe = resolveMarketplaceRunRecipeByTemplateId(
      "vibe-coding-app-feature",
    );
    expect(recipe).not.toBeNull();
    if (recipe === null) {
      return;
    }

    const stages = resolveMarketplaceRunExecutionStages(recipe);
    expect(stages.map((stage) => stage.phase)).toEqual([
      MARKETPLACE_RUN_PHASES.PLAN_ESTIMATE,
      MARKETPLACE_RUN_PHASES.WRITE,
    ]);
    expect(stages[0]?.usesWorkingEstimateMarker).toBe(true);
    expect(stages[1]?.usesWorkingEstimateMarker).toBe(false);
    expect(stages[0]?.writerRoute?.modelId).toBeNull();
  });
});
