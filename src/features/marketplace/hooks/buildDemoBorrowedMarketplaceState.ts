import {
  demoHarnessMarketplaceBorrowManifest,
  demoHarnessMarketplaceListings,
} from "@/features/demo/mock/demoHarnessMarketplace";
import type { BorrowedMarketplaceListingState } from "@/features/marketplace/hooks/borrowedMarketplaceListingState.type";
import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import summarizeHarnessManifestSet from "@/lib/harness/summarizeHarnessManifestSet";
import buildPresetMarketplaceBorrowPayload from "@/lib/marketplace/buildPresetMarketplaceBorrowPayload";
import { parsePresetMarketplaceTemplateId } from "@/lib/marketplace/presetMarketplaceCapabilityId";

export default function buildDemoBorrowedMarketplaceState(
  capabilityId: string,
): BorrowedMarketplaceListingState | null {
  const presetTemplateId = parsePresetMarketplaceTemplateId(capabilityId);

  if (presetTemplateId !== null) {
    const template = findCapabilityTemplateById(presetTemplateId);

    if (template === undefined) {
      return null;
    }

    return buildPresetMarketplaceBorrowPayload(template);
  }

  const listing = demoHarnessMarketplaceListings.find(
    (entry) => entry.capabilityId === capabilityId,
  );
  const manifest = demoHarnessMarketplaceBorrowManifest[capabilityId];

  if (listing === undefined || manifest === undefined) {
    return null;
  }

  const setSummary = summarizeHarnessManifestSet(
    manifest,
    listing.harnessSetSlug,
  );

  return {
    capabilityId: listing.capabilityId,
    type: listing.type,
    name: listing.name,
    description: listing.description,
    exampleRequest: listing.exampleRequest,
    workflowFields: listing.workflowFields,
    ownerUserId: listing.ownerUserId,
    ownerEmail: listing.ownerEmail,
    ownerName: listing.ownerName,
    hostname: listing.hostname ?? "demo.local",
    isOnline: listing.isOnline,
    harnessSetSlug: listing.harnessSetSlug,
    harnessSetName: setSummary.setName,
    harnessItemPaths: setSummary.itemPaths,
    activeSetSlugs: [listing.harnessSetSlug],
    manifest,
  };
}
