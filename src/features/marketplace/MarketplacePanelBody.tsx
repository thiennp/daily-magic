"use client";

import MarketplaceBrowseToolbar from "@/features/marketplace/MarketplaceBrowseToolbar";
import MarketplaceListingSections from "@/features/marketplace/MarketplaceListingSections";
import MarketplaceVisitorEmptyState from "@/features/marketplace/MarketplaceVisitorEmptyState";
import { MK_PAGE_STACK_CLASS } from "@/features/marketplace/marketplaceBrowseClasses.constant";
import type { MarketplaceBrowseFilters } from "@/features/marketplace/utils/filterSortMarketplaceListings";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

interface MarketplacePanelBodyProps {
  readonly variant: "embedded" | "page";
  readonly showVisitorEmptyState: boolean;
  readonly filters: MarketplaceBrowseFilters;
  readonly listings: readonly HarnessMarketplaceListing[];
  readonly onFiltersChange: (next: MarketplaceBrowseFilters) => void;
  readonly officialListings: readonly HarnessMarketplaceListing[];
  readonly teammateListings: readonly HarnessMarketplaceListing[];
  readonly isLoading: boolean;
  readonly onInstall: (listing: HarnessMarketplaceListing) => void;
  readonly teamNavEnabled: boolean;
}

export default function MarketplacePanelBody({
  variant,
  showVisitorEmptyState,
  filters,
  listings,
  onFiltersChange,
  officialListings,
  teammateListings,
  isLoading,
  onInstall,
  teamNavEnabled,
}: MarketplacePanelBodyProps) {
  const sectionProps = {
    officialListings,
    teammateListings,
    isLoading,
    onInstall,
    variant,
    teamNavEnabled,
  } as const;

  const panelBody = showVisitorEmptyState ? (
    <>
      <MarketplaceVisitorEmptyState />
      <MarketplaceListingSections
        {...sectionProps}
        sectionVisibility="teammatesOnly"
      />
    </>
  ) : (
    <MarketplaceListingSections {...sectionProps} />
  );

  return (
    <div className={variant === "page" ? MK_PAGE_STACK_CLASS : "space-y-6"}>
      {variant === "page" && !showVisitorEmptyState ? (
        <MarketplaceBrowseToolbar
          filters={filters}
          listings={listings}
          onChange={onFiltersChange}
        />
      ) : null}
      {panelBody}
    </div>
  );
}
