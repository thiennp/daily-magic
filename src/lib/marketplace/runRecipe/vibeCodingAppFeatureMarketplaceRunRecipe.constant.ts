import { MARKETPLACE_RUN_OUTCOME_SURFACES } from "@/lib/marketplace/runRecipe/MarketplaceRunOutcomeSurface.constant";
import { MARKETPLACE_RUN_PHASES } from "@/lib/marketplace/runRecipe/MarketplaceRunPhase.constant";
import type { MarketplaceRunRecipe } from "@/lib/marketplace/runRecipe/types/MarketplaceRunRecipe.type";

/** Official marketplace preset: vibe-coding-app-feature (plan → write → report outcome). */
export const VIBE_CODING_APP_FEATURE_MARKETPLACE_RUN_RECIPE: MarketplaceRunRecipe =
  {
    recipeId: "marketplace-vibe-coding-app-feature",
    templateId: "vibe-coding-app-feature",
    outcomeSurface: MARKETPLACE_RUN_OUTCOME_SURFACES.REPORTS,
    stages: [
      {
        phase: MARKETPLACE_RUN_PHASES.PLAN_ESTIMATE,
        usesWorkingEstimateMarker: true,
        readOnlyRepo: true,
        cheaperModelEligible: true,
      },
      {
        phase: MARKETPLACE_RUN_PHASES.WRITE,
        usesWorkingEstimateMarker: false,
      },
      {
        phase: MARKETPLACE_RUN_PHASES.REPORT,
        usesWorkingEstimateMarker: false,
      },
    ],
  };
