import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { CapabilityVisibility } from "@/lib/capabilities/CapabilityVisibility.constant";
import type { CapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";
import {
  OFFICIAL_PRESET_MARKETPLACE_HOSTNAME,
  OFFICIAL_PRESET_MARKETPLACE_OWNER_EMAIL,
  OFFICIAL_PRESET_MARKETPLACE_OWNER_NAME,
  OFFICIAL_PRESET_MARKETPLACE_OWNER_USER_ID,
} from "@/lib/marketplace/officialPresetMarketplace.constants";
import { toPresetMarketplaceCapabilityId } from "@/lib/marketplace/presetMarketplaceCapabilityId";

const buildPresetMarketplaceListing = (
  template: CapabilityTemplate,
): HarnessMarketplaceListing => ({
  capabilityId: toPresetMarketplaceCapabilityId(template.id),
  ownerUserId: OFFICIAL_PRESET_MARKETPLACE_OWNER_USER_ID,
  ownerEmail: OFFICIAL_PRESET_MARKETPLACE_OWNER_EMAIL,
  ownerName: OFFICIAL_PRESET_MARKETPLACE_OWNER_NAME,
  type: template.type,
  name: template.name,
  description: template.description,
  exampleRequest: template.exampleRequest,
  visibility: CapabilityVisibility.PUBLIC,
  workflowFields:
    template.type === CapabilityType.WORKFLOW ? template.workflowFields : [],
  harnessSetSlug: template.harness.slug,
  harnessSetName: template.harness.name,
  harnessItemCount: template.harness.items.length,
  isOnline: true,
  hostname: OFFICIAL_PRESET_MARKETPLACE_HOSTNAME,
  isOfficialPreset: true,
});

export default buildPresetMarketplaceListing;
