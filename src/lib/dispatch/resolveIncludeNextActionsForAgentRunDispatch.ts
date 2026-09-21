import { resolveAgentRunIncludeNextActions } from "@/lib/marketplace/runRecipe/resolveAgentRunIncludeNextActions";
import { resolveMarketplaceTemplateIdForDispatch } from "@/lib/marketplace/runRecipe/resolveMarketplaceRunRecipeForDispatch";

export const resolveMarketplaceTemplateIdForAgentRunDispatch = async (input: {
  readonly capabilityId: string | null;
  readonly payload: Readonly<Record<string, unknown>>;
}): Promise<string | null> => {
  const capabilityIdFromPayload =
    typeof input.payload.capabilityId === "string"
      ? input.payload.capabilityId
      : null;

  return resolveMarketplaceTemplateIdForDispatch({
    capabilityId: input.capabilityId ?? capabilityIdFromPayload,
  });
};

export const resolveIncludeNextActionsForAgentRunDispatch = async (input: {
  readonly requesterUserId: string;
  readonly executorUserId: string;
  readonly groupId: string | null;
  readonly capabilityId: string | null;
  readonly payload: Readonly<Record<string, unknown>>;
}): Promise<boolean> => {
  const controls = await resolveMarketplaceRunDispatchControls(input);
  return controls.includeNextActions;
};

export const resolveMarketplaceRunDispatchControls = async (input: {
  readonly requesterUserId: string;
  readonly executorUserId: string;
  readonly groupId: string | null;
  readonly capabilityId: string | null;
  readonly payload: Readonly<Record<string, unknown>>;
}): Promise<{
  readonly marketplaceTemplateId: string | null;
  readonly includeNextActions: boolean;
}> => {
  const marketplaceTemplateId =
    await resolveMarketplaceTemplateIdForAgentRunDispatch({
      capabilityId: input.capabilityId,
      payload: input.payload,
    });

  return {
    marketplaceTemplateId,
    includeNextActions: resolveAgentRunIncludeNextActions({
      requesterUserId: input.requesterUserId,
      executorUserId: input.executorUserId,
      groupId: input.groupId,
      marketplaceTemplateId,
    }),
  };
};
