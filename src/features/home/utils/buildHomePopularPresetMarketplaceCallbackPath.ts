import { toPresetMarketplaceCapabilityId } from "@/lib/marketplace/presetMarketplaceCapabilityId";

/** Post-auth destination for a homepage popular preset (official marketplace listing). */
export const buildHomePopularPresetMarketplaceCallbackPath = (
  templateId: string,
): string => {
  const capabilityId = toPresetMarketplaceCapabilityId(templateId);
  const query = new URLSearchParams({ capabilityId });

  return `/marketplace?${query.toString()}`;
};
