import {
  demoHarnessMarketplaceBorrowManifest,
  demoHarnessMarketplaceListings,
} from "@/features/demo/mock/demoHarnessMarketplace";
import type { BorrowedMarketplaceListingState } from "@/features/marketplace/hooks/borrowedMarketplaceListingState.type";
import summarizeHarnessManifestSet from "@/lib/harness/summarizeHarnessManifestSet";

export default function buildDemoBorrowedMarketplaceState(
  capabilityId: string,
): BorrowedMarketplaceListingState | null {
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
