import CAPABILITY_TEMPLATES from "@/lib/capabilities/templates/listCapabilityTemplates";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";
import buildPresetMarketplaceListing from "@/lib/marketplace/buildPresetMarketplaceListing";

const listPresetMarketplaceListings =
  (): readonly HarnessMarketplaceListing[] =>
    CAPABILITY_TEMPLATES.map(buildPresetMarketplaceListing);

export default listPresetMarketplaceListings;
