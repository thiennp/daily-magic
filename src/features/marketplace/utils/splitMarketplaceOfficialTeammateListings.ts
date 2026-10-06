import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

export const splitMarketplaceOfficialTeammateListings = (
  listings: readonly HarnessMarketplaceListing[],
): {
  readonly officialListings: readonly HarnessMarketplaceListing[];
  readonly teammateListings: readonly HarnessMarketplaceListing[];
} => ({
  officialListings: listings.filter(
    (listing) => listing.isOfficialPreset === true,
  ),
  teammateListings: listings.filter(
    (listing) => listing.isOfficialPreset !== true,
  ),
});
