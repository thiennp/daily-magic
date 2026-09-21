import { getPublishedCapabilityById } from "@/lib/capabilities/capabilityQueries";
import { parsePresetMarketplaceTemplateId } from "@/lib/marketplace/presetMarketplaceCapabilityId";
import { resolveMarketplaceRunRecipeByTemplateId } from "@/lib/marketplace/runRecipe/resolveMarketplaceRunRecipeByTemplateId";
import type { MarketplaceRunRecipe } from "@/lib/marketplace/runRecipe/types/MarketplaceRunRecipe.type";
import { resolveTemplateIdFromHarnessSetSlug } from "@/lib/workflowOrchestration/resolveTemplateIdFromHarnessSetSlug";

export const resolveMarketplaceTemplateIdFromCapabilityId = (
  capabilityId: string | null | undefined,
): string | null => {
  if (capabilityId === null || capabilityId === undefined) {
    return null;
  }

  const presetTemplateId = parsePresetMarketplaceTemplateId(capabilityId);
  return presetTemplateId;
};

export const resolveMarketplaceTemplateIdForDispatch = async (input: {
  readonly capabilityId: string | null | undefined;
}): Promise<string | null> => {
  const presetTemplateId = resolveMarketplaceTemplateIdFromCapabilityId(
    input.capabilityId,
  );
  if (presetTemplateId !== null) {
    return presetTemplateId;
  }

  if (
    input.capabilityId === null ||
    input.capabilityId === undefined ||
    input.capabilityId.trim().length === 0
  ) {
    return null;
  }

  const capability = await getPublishedCapabilityById(
    input.capabilityId.trim(),
  );
  if (capability === null) {
    return null;
  }

  return resolveTemplateIdFromHarnessSetSlug(capability.harnessSetSlug);
};

export const resolveMarketplaceRunRecipeForDispatch = async (input: {
  readonly capabilityId: string | null | undefined;
}): Promise<MarketplaceRunRecipe | null> => {
  const templateId = await resolveMarketplaceTemplateIdForDispatch(input);
  return resolveMarketplaceRunRecipeByTemplateId(templateId);
};
