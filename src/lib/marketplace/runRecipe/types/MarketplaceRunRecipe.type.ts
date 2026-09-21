import type { MarketplaceRunOutcomeSurface } from "@/lib/marketplace/runRecipe/MarketplaceRunOutcomeSurface.constant";
import type { MarketplaceRunPhase } from "@/lib/marketplace/runRecipe/MarketplaceRunPhase.constant";

export type MarketplaceRunRecipeStage = {
  readonly phase: MarketplaceRunPhase;
  /** Plan/estimate stage emits [[WORKING_ESTIMATE]]; write stage does not re-estimate by default. */
  readonly usesWorkingEstimateMarker: boolean;
  /** Plan/estimate: clarify + file list only — no repo writes. */
  readonly readOnlyRepo?: boolean;
  /** When true, plan/estimate may route to catalog cheap tier once model id is set. */
  readonly cheaperModelEligible?: boolean;
};

export type MarketplaceRunRecipe = {
  readonly recipeId: string;
  readonly templateId: string;
  /** One capability outcome in Library/Reports — not chat follow-ups or quota UX. */
  readonly outcomeSurface: MarketplaceRunOutcomeSurface;
  readonly stages: readonly MarketplaceRunRecipeStage[];
};
