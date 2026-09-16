"use client";

import MarketplaceListCard from "@/features/marketplace/MarketplaceListCard";
import { MARKETING_TEXT_MUTED_CLASSES } from "@/features/marketing/marketingSurfaceClasses.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";
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
      <p
        className={mergeMarketingClasses(
          "mt-4 text-sm",
          MARKETING_TEXT_MUTED_CLASSES,
        )}
      >
        Loading marketplace…
      </p>
    );
  }

  if (listings.length === 0) {
    return (
      <p
        className={mergeMarketingClasses(
          "mt-4 text-sm",
          MARKETING_TEXT_MUTED_CLASSES,
        )}
      >
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
