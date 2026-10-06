"use client";

import MarketplaceBrowseToolbar from "@/features/marketplace/MarketplaceBrowseToolbar";
import MarketplaceListingSections from "@/features/marketplace/MarketplaceListingSections";
import MarketplaceVisitorEmptyState from "@/features/marketplace/MarketplaceVisitorEmptyState";
import {
  MK_EMPTY_CLASS,
  MK_EMPTY_TITLE_CLASS,
  MK_PAGE_STACK_CLASS,
} from "@/features/marketplace/marketplaceBrowseClasses.constant";
import {
  MARKETPLACE_FILTERED_EMPTY_BODY,
  MARKETPLACE_FILTERED_EMPTY_TITLE,
} from "@/features/marketplace/marketplaceCopy.constant";
import {
  type MarketplaceBrowseFilters,
  marketplaceFiltersAreActive,
} from "@/features/marketplace/utils/filterSortMarketplaceListings";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

interface MarketplacePanelBodyProps {
  readonly variant: "embedded" | "page";
  readonly showVisitorEmptyState: boolean;
  readonly filters: MarketplaceBrowseFilters;
  readonly listings: readonly HarnessMarketplaceListing[];
  readonly resultCount: number;
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
  resultCount,
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

  const filtersActive = marketplaceFiltersAreActive(filters);
  const showFilteredEmpty =
    !isLoading &&
    !showVisitorEmptyState &&
    filtersActive &&
    officialListings.length === 0 &&
    teammateListings.length === 0 &&
    listings.length > 0;

  const panelBody = showVisitorEmptyState ? (
    <>
      <MarketplaceVisitorEmptyState />
      <MarketplaceListingSections
        {...sectionProps}
        sectionVisibility="teammatesOnly"
      />
    </>
  ) : showFilteredEmpty ? (
    <div className={MK_EMPTY_CLASS} role="status">
      <h4 className={MK_EMPTY_TITLE_CLASS}>{MARKETPLACE_FILTERED_EMPTY_TITLE}</h4>
      <p className="max-w-[42ch] text-sm">{MARKETPLACE_FILTERED_EMPTY_BODY}</p>
    </div>
  ) : (
    <MarketplaceListingSections {...sectionProps} />
  );

  return (
    <div className={variant === "page" ? MK_PAGE_STACK_CLASS : "space-y-6"}>
      {variant === "page" && !showVisitorEmptyState ? (
        <MarketplaceBrowseToolbar
          filters={filters}
          listings={listings}
          resultCount={resultCount}
          onChange={onFiltersChange}
        />
      ) : null}
      {panelBody}
    </div>
  );
}
