"use client";

import MarketplaceBrowseToolbar from "@/features/marketplace/MarketplaceBrowseToolbar";
import MarketplaceListingSections from "@/features/marketplace/MarketplaceListingSections";
import MarketplaceNoMatch from "@/features/marketplace/MarketplaceNoMatch";
import MarketplaceLoadError from "@/features/marketplace/MarketplaceLoadError";
import MarketplaceVisitorEmptyState from "@/features/marketplace/MarketplaceVisitorEmptyState";
import { MK_PAGE_STACK_CLASS } from "@/features/marketplace/marketplaceBrowseClasses.constant";
import {} from "@/features/marketplace/marketplaceCopy.constant";
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
  readonly loadFailed: boolean;
  readonly onRetry: () => void;
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
  loadFailed,
  onRetry,
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
    !loadFailed &&
    !showVisitorEmptyState &&
    filtersActive &&
    officialListings.length === 0 &&
    teammateListings.length === 0 &&
    listings.length > 0;

  const clearFilters = () =>
    onFiltersChange({ ...filters, query: "", type: "all", publisher: "all" });

  const panelBody = loadFailed ? (
    <MarketplaceLoadError onRetry={onRetry} />
  ) : showVisitorEmptyState ? (
    <>
      <MarketplaceVisitorEmptyState />
      <MarketplaceListingSections
        {...sectionProps}
        sectionVisibility="teammatesOnly"
      />
    </>
  ) : showFilteredEmpty ? (
    <MarketplaceNoMatch query={filters.query} onClear={clearFilters} />
  ) : (
    <MarketplaceListingSections {...sectionProps} />
  );

  return (
    <div className={variant === "page" ? MK_PAGE_STACK_CLASS : "space-y-6"}>
      {variant === "page" && !showVisitorEmptyState ? (
        <MarketplaceBrowseToolbar
          disabled={isLoading || loadFailed}
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
