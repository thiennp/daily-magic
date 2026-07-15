"use client";

import MarketplaceListCard from "@/features/marketplace/MarketplaceListCard";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

interface MarketplaceListProps {
  readonly listings: readonly HarnessMarketplaceListing[];
  readonly isLoading: boolean;
  readonly onInstall: (listing: HarnessMarketplaceListing) => void;
  readonly emptyMessage?: string;
}

export default function MarketplaceList({
  listings,
  isLoading,
  onInstall,
  emptyMessage = "No listings yet.",
}: MarketplaceListProps) {
  if (isLoading) {
    return (
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Loading marketplace…
      </p>
    );
  }

  if (listings.length === 0) {
    return (
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {listings.map((listing) => (
        <MarketplaceListCard
          key={listing.capabilityId}
          listing={listing}
          onInstall={onInstall}
        />
      ))}
    </div>
  );
}
