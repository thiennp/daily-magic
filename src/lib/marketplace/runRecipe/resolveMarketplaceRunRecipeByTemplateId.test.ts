import { describe, expect, it } from "vitest";

import { MARKETPLACE_RUN_OUTCOME_SURFACES } from "@/lib/marketplace/runRecipe/MarketplaceRunOutcomeSurface.constant";
import { MARKETPLACE_RUN_PHASES } from "@/lib/marketplace/runRecipe/MarketplaceRunPhase.constant";
import { resolveAgentRunIncludeNextActions } from "@/lib/marketplace/runRecipe/resolveAgentRunIncludeNextActions";
import { resolveMarketplaceRunExecutionStages } from "@/lib/marketplace/runRecipe/resolveMarketplaceRunExecutionStages";
import { resolveMarketplaceRunRecipeByTemplateId } from "@/lib/marketplace/runRecipe/resolveMarketplaceRunRecipeByTemplateId";

describe("vibe-coding marketplace run recipe (Pimi contract)", () => {
  it("resolves recipe by template id with Reports outcome surface", () => {
    const recipe = resolveMarketplaceRunRecipeByTemplateId(
      "vibe-coding-app-feature",
    );
    expect(recipe?.outcomeSurface).toBe(
      MARKETPLACE_RUN_OUTCOME_SURFACES.REPORTS,
    );
  });

  it("stages plan/estimate → write → report", () => {
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
      MARKETPLACE_RUN_PHASES.REPORT,
    ]);
    expect(stages[0]?.readOnlyRepo).toBe(true);
    expect(stages[0]?.cheaperModelEligible).toBe(true);
  });

  it("disables [[NEXT_ACTIONS]] for Reports outcome recipes on local Mac", () => {
    expect(
      resolveAgentRunIncludeNextActions({
        requesterUserId: "u1",
        executorUserId: "u1",
        groupId: null,
        marketplaceTemplateId: "vibe-coding-app-feature",
      }),
    ).toBe(false);
  });
});
