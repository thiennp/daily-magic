import { parsePresetMarketplaceTemplateId } from "@/lib/marketplace/presetMarketplaceCapabilityId";

/** Mac dispatch may receive template id explicitly or only preset capabilityId on payload. */
export const resolveMarketplaceTemplateIdForMacClient = (
  marketplaceTemplateId: string | null | undefined,
  capabilityId: string | null | undefined,
): string | null => {
  const explicit = marketplaceTemplateId?.trim() ?? "";
  if (explicit.length > 0) {
    return explicit;
  }

  const fromCapability = capabilityId?.trim() ?? "";
  if (fromCapability.length === 0) {
    return null;
  }

  return parsePresetMarketplaceTemplateId(fromCapability);
};
