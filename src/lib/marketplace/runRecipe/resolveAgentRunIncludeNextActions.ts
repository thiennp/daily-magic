import { MARKETPLACE_RUN_OUTCOME_SURFACES } from "@/lib/marketplace/runRecipe/MarketplaceRunOutcomeSurface.constant";
import { resolveMarketplaceRunRecipeByTemplateId } from "@/lib/marketplace/runRecipe/resolveMarketplaceRunRecipeByTemplateId";
import { isLocalMacAgentRunDispatch } from "@/lib/dispatch/isLocalMacAgentRunDispatch";

export const resolveAgentRunIncludeNextActions = (input: {
  readonly requesterUserId: string;
  readonly executorUserId: string;
  readonly groupId: string | null;
  readonly marketplaceTemplateId: string | null;
}): boolean => {
  const recipe = resolveMarketplaceRunRecipeByTemplateId(
    input.marketplaceTemplateId,
  );
  if (recipe?.outcomeSurface === MARKETPLACE_RUN_OUTCOME_SURFACES.REPORTS) {
    return false;
  }

  return isLocalMacAgentRunDispatch({
    requesterUserId: input.requesterUserId,
    executorUserId: input.executorUserId,
    groupId: input.groupId,
  });
};
