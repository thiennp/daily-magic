import type { MarketplaceRunPhaseWriterRoute } from "@/lib/marketplace/runRecipe/types/MarketplaceRunPhaseWriterRoute.type";
import type { MarketplaceRunRecipeStage } from "@/lib/marketplace/runRecipe/types/MarketplaceRunRecipe.type";
import type { MarketplaceRunRecipe } from "@/lib/marketplace/runRecipe/types/MarketplaceRunRecipe.type";
import { resolveMarketplaceRunPhaseWriterRoute } from "@/lib/marketplace/runRecipe/resolveMarketplaceRunPhaseWriterRoute";

export type MarketplaceRunExecutionStage = MarketplaceRunRecipeStage & {
  readonly writerRoute: MarketplaceRunPhaseWriterRoute | null;
};

/** Ordered plan/estimate → write stages for a marketplace recipe (scaffold). */
export const resolveMarketplaceRunExecutionStages = (
  recipe: MarketplaceRunRecipe,
): readonly MarketplaceRunExecutionStage[] =>
  recipe.stages.map((stage) => ({
    ...stage,
    writerRoute: resolveMarketplaceRunPhaseWriterRoute(recipe, stage.phase),
  }));
