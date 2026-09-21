import { MARKETPLACE_CATALOG_PLAN_ESTIMATE_MODEL_ID_HOLD } from "@/lib/marketplace/runRecipe/marketplaceCatalogPlanEstimateModelIdHold.constant";
import { MARKETPLACE_RUN_PHASES } from "@/lib/marketplace/runRecipe/MarketplaceRunPhase.constant";
import type { MarketplaceRunPhase } from "@/lib/marketplace/runRecipe/MarketplaceRunPhase.constant";
import type { MarketplaceRunRecipe } from "@/lib/marketplace/runRecipe/types/MarketplaceRunRecipe.type";
import type { MarketplaceRunPhaseWriterRoute } from "@/lib/marketplace/runRecipe/types/MarketplaceRunPhaseWriterRoute.type";

const findRecipeStage = (
  recipe: MarketplaceRunRecipe,
  phase: MarketplaceRunPhase,
) => recipe.stages.find((stage) => stage.phase === phase);

export const resolveMarketplaceRunPhaseWriterRoute = (
  recipe: MarketplaceRunRecipe,
  phase: MarketplaceRunPhase,
): MarketplaceRunPhaseWriterRoute | null => {
  const stage = findRecipeStage(recipe, phase);
  if (stage === undefined) {
    return null;
  }

  if (phase === MARKETPLACE_RUN_PHASES.PLAN_ESTIMATE) {
    return {
      phase,
      cheaperModelEligible: stage.cheaperModelEligible === true,
      catalogModelId: MARKETPLACE_CATALOG_PLAN_ESTIMATE_MODEL_ID_HOLD,
    };
  }

  if (phase === MARKETPLACE_RUN_PHASES.WRITE) {
    return {
      phase,
      cheaperModelEligible: false,
      catalogModelId: null,
    };
  }

  return null;
};
