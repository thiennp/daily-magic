import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

export const findMarketplaceListingByCapabilityId = (
  listings: readonly HarnessMarketplaceListing[],
  capabilityId: string,
): HarnessMarketplaceListing | null =>
  listings.find((listing) => listing.capabilityId === capabilityId) ?? null;
