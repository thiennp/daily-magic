import type { MarketplaceRunPhase } from "@/lib/marketplace/runRecipe/MarketplaceRunPhase.constant";

export type MarketplaceRunRecipeStage = {
  readonly phase: MarketplaceRunPhase;
  /** Plan/estimate stage emits [[WORKING_ESTIMATE]]; write stage does not re-estimate by default. */
  readonly usesWorkingEstimateMarker: boolean;
};

export type MarketplaceRunRecipe = {
  readonly recipeId: string;
  readonly templateId: string;
  readonly stages: readonly MarketplaceRunRecipeStage[];
};
