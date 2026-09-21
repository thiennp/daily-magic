import { MARKETPLACE_RUN_OUTCOME_SURFACES } from "@/lib/marketplace/runRecipe/MarketplaceRunOutcomeSurface.constant";
import { resolveMarketplaceRunRecipeByTemplateId } from "@/lib/marketplace/runRecipe/resolveMarketplaceRunRecipeByTemplateId";

export const wrapPromptForMarketplaceRunWriteStage = (
  prompt: string,
  marketplaceTemplateId: string | null | undefined,
): string => {
  const recipe = resolveMarketplaceRunRecipeByTemplateId(marketplaceTemplateId);
  if (recipe === null) {
    return prompt.trim();
  }

  if (recipe.outcomeSurface !== MARKETPLACE_RUN_OUTCOME_SURFACES.REPORTS) {
    return prompt.trim();
  }

  return [
    prompt.trim(),
    "",
    "---",
    "Marketplace vibe-coding run — write/implement stage.",
    "Implement the feature slice on this Mac. Update the job report file as you work.",
    "Finish with one capability outcome for Library/Reports — not open-ended chat or quota UX.",
    "Do not emit [[NEXT_ACTIONS]]; the operator continues from Reports when needed.",
  ].join("\n");
};
