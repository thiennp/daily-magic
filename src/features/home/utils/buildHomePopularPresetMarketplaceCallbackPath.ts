import { buildPostAuthReturn } from "@/lib/auth/buildPostAuthReturn";
import { toPresetMarketplaceCapabilityId } from "@/lib/marketplace/presetMarketplaceCapabilityId";

/** Post-auth destination for a homepage popular preset (official marketplace listing). */
export const buildHomePopularPresetMarketplaceCallbackPath = (
  templateId: string,
): string =>
  buildPostAuthReturn({
    next: "/marketplace",
    capabilityId: toPresetMarketplaceCapabilityId(templateId),
  });
