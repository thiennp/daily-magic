import type { MarketplaceRunRecipe } from "@/lib/marketplace/runRecipe/types/MarketplaceRunRecipe.type";
import { VIBE_CODING_APP_FEATURE_MARKETPLACE_RUN_RECIPE } from "@/lib/marketplace/runRecipe/vibeCodingAppFeatureMarketplaceRunRecipe.constant";

const RECIPES_BY_TEMPLATE_ID: Record<string, MarketplaceRunRecipe> = {
  [VIBE_CODING_APP_FEATURE_MARKETPLACE_RUN_RECIPE.templateId]:
    VIBE_CODING_APP_FEATURE_MARKETPLACE_RUN_RECIPE,
};

export const resolveMarketplaceRunRecipeByTemplateId = (
  templateId: string | null | undefined,
): MarketplaceRunRecipe | null => {
  if (templateId === null || templateId === undefined) {
    return null;
  }

  const trimmed = templateId.trim();
  if (trimmed.length === 0) {
    return null;
  }

  return RECIPES_BY_TEMPLATE_ID[trimmed] ?? null;
};
