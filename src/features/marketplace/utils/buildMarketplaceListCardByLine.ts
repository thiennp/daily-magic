import { MARKETPLACE_BY_OFFICIAL } from "@/features/marketplace/marketplaceCopy.constant";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

export const buildMarketplaceListCardByLine = (
  listing: HarnessMarketplaceListing,
): string =>
  listing.isOfficialPreset === true
    ? MARKETPLACE_BY_OFFICIAL
    : `By ${listing.ownerName ?? listing.ownerEmail}`;
