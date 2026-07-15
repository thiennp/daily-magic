import { PRESET_MARKETPLACE_CAPABILITY_ID_PREFIX } from "@/lib/marketplace/officialPresetMarketplace.constants";

export const toPresetMarketplaceCapabilityId = (templateId: string): string =>
  `${PRESET_MARKETPLACE_CAPABILITY_ID_PREFIX}${templateId}`;

export const parsePresetMarketplaceTemplateId = (
  capabilityId: string,
): string | null => {
  if (!capabilityId.startsWith(PRESET_MARKETPLACE_CAPABILITY_ID_PREFIX)) {
    return null;
  }

  const templateId = capabilityId.slice(
    PRESET_MARKETPLACE_CAPABILITY_ID_PREFIX.length,
  );

  return templateId.length > 0 ? templateId : null;
};

export const isOfficialPresetMarketplaceCapabilityId = (
  capabilityId: string,
): boolean => parsePresetMarketplaceTemplateId(capabilityId) !== null;
