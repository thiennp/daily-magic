import { MARKETPLACE_RUN_PHASES } from "@/lib/marketplace/runRecipe/MarketplaceRunPhase.constant";
import type { MarketplaceRunRecipe } from "@/lib/marketplace/runRecipe/types/MarketplaceRunRecipe.type";

/** Official marketplace preset: vibe-coding-app-feature (plan/estimate then write). */
export const VIBE_CODING_APP_FEATURE_MARKETPLACE_RUN_RECIPE: MarketplaceRunRecipe =
  {
    recipeId: "marketplace-vibe-coding-app-feature",
    templateId: "vibe-coding-app-feature",
    stages: [
      {
        phase: MARKETPLACE_RUN_PHASES.PLAN_ESTIMATE,
        usesWorkingEstimateMarker: true,
      },
      {
        phase: MARKETPLACE_RUN_PHASES.WRITE,
        usesWorkingEstimateMarker: false,
      },
    ],
  };
