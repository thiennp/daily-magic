import { MARKETPLACE_RUN_PHASES } from "@/lib/marketplace/runRecipe/MarketplaceRunPhase.constant";
import type { MarketplaceRunPhase } from "@/lib/marketplace/runRecipe/MarketplaceRunPhase.constant";
import type { MarketplaceRunRecipe } from "@/lib/marketplace/runRecipe/types/MarketplaceRunRecipe.type";
import type { MarketplaceRunPhaseWriterRoute } from "@/lib/marketplace/runRecipe/types/MarketplaceRunPhaseWriterRoute.type";

const isRecipeStagePhase = (
  recipe: MarketplaceRunRecipe,
  phase: MarketplaceRunPhase,
): boolean => recipe.stages.some((stage) => stage.phase === phase);

export const resolveMarketplaceRunPhaseWriterRoute = (
  recipe: MarketplaceRunRecipe,
  phase: MarketplaceRunPhase,
): MarketplaceRunPhaseWriterRoute | null => {
  if (!isRecipeStagePhase(recipe, phase)) {
    return null;
  }

  // TODO(Pimi): resolve optional cheaper model for plan/estimate from org policy + writer API secrets.
  // Do not set Gemini, Magi, or other defaults here until Pimi contract lands.
  if (phase === MARKETPLACE_RUN_PHASES.PLAN_ESTIMATE) {
    return { phase, modelId: null };
  }

  return { phase, modelId: null };
};
