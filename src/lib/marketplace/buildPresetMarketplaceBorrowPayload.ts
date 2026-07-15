import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import type { CapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";
import type { HarnessMarketplaceBorrowPayload } from "@/lib/harness/buildHarnessMarketplaceBorrowPayload";
import summarizeHarnessManifestSet from "@/lib/harness/summarizeHarnessManifestSet";
import buildPresetHarnessManifest from "@/lib/marketplace/buildPresetHarnessManifest";
import {
  OFFICIAL_PRESET_MARKETPLACE_HOSTNAME,
  OFFICIAL_PRESET_MARKETPLACE_OWNER_EMAIL,
  OFFICIAL_PRESET_MARKETPLACE_OWNER_NAME,
  OFFICIAL_PRESET_MARKETPLACE_OWNER_USER_ID,
} from "@/lib/marketplace/officialPresetMarketplace.constants";
import { toPresetMarketplaceCapabilityId } from "@/lib/marketplace/presetMarketplaceCapabilityId";

const buildPresetMarketplaceBorrowPayload = (
  template: CapabilityTemplate,
): HarnessMarketplaceBorrowPayload => {
  const updatedAt = new Date().toISOString();
  const manifest = buildPresetHarnessManifest(template.harness, updatedAt);
  const setSummary = summarizeHarnessManifestSet(
    manifest,
    template.harness.slug,
  );

  return {
    capabilityId: toPresetMarketplaceCapabilityId(template.id),
    type: template.type,
    name: template.name,
    description: template.description,
    exampleRequest: template.exampleRequest,
    workflowFields:
      template.type === CapabilityType.WORKFLOW ? template.workflowFields : [],
    ownerUserId: OFFICIAL_PRESET_MARKETPLACE_OWNER_USER_ID,
    ownerEmail: OFFICIAL_PRESET_MARKETPLACE_OWNER_EMAIL,
    ownerName: OFFICIAL_PRESET_MARKETPLACE_OWNER_NAME,
    hostname: OFFICIAL_PRESET_MARKETPLACE_HOSTNAME,
    visibility: "public",
    reportedAt: updatedAt,
    isOnline: true,
    harnessSetSlug: template.harness.slug,
    harnessSetName: setSummary.setName,
    harnessItemPaths: setSummary.itemPaths,
    activeSetSlugs: [template.harness.slug],
    manifest,
    isOfficialPreset: true,
    templateId: template.id,
  };
};

export default buildPresetMarketplaceBorrowPayload;
