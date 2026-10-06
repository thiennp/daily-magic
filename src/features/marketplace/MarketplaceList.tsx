"use client";

import MarketplaceListCard from "@/features/marketplace/MarketplaceListCard";
import MarketplaceSectionSkeleton from "@/features/marketplace/MarketplaceSectionSkeleton";
import {
  MK_EMPTY_CLASS,
  MK_EMPTY_TITLE_CLASS,
  MK_GRID_CLASS,
} from "@/features/marketplace/marketplaceBrowseClasses.constant";
import {
  MARKETPLACE_FILTERED_EMPTY_BODY,
  MARKETPLACE_FILTERED_EMPTY_TITLE,
} from "@/features/marketplace/marketplaceCopy.constant";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

interface MarketplaceListProps {
  readonly listings: readonly HarnessMarketplaceListing[];
  readonly isLoading: boolean;
  readonly onInstall: (listing: HarnessMarketplaceListing) => void;
  readonly emptyMessage?: string;
  readonly filteredEmpty?: boolean;
}

export default function MarketplaceList({
  listings,
  isLoading,
  onInstall,
  emptyMessage = "No listings yet.",
  filteredEmpty = false,
}: MarketplaceListProps) {
  if (isLoading) {
    return <MarketplaceSectionSkeleton />;
  }

  if (listings.length === 0) {
    if (filteredEmpty) {
      return (
        <div className={MK_EMPTY_CLASS} role="status">
          <h4 className={MK_EMPTY_TITLE_CLASS}>
            {MARKETPLACE_FILTERED_EMPTY_TITLE}
          </h4>
          <p className="max-w-[42ch] text-sm">{MARKETPLACE_FILTERED_EMPTY_BODY}</p>
        </div>
      );
    }
    return (
      <p className="mt-4 text-sm text-awc-fg-muted">{emptyMessage}</p>
    );
  }

  return (
    <ul className={MK_GRID_CLASS}>
      {listings.map((listing) => (
        <li key={listing.capabilityId} className="min-w-0">
          <MarketplaceListCard listing={listing} onInstall={onInstall} />
        </li>
      ))}
    </ul>
  );
}
