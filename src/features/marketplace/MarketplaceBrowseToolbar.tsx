"use client";

import MarketplaceBrowsePublisherSeg from "@/features/marketplace/MarketplaceBrowsePublisherSeg";
import MarketplaceBrowseSearchField from "@/features/marketplace/MarketplaceBrowseSearchField";
import MarketplaceBrowseTypeSeg from "@/features/marketplace/MarketplaceBrowseTypeSeg";
import {
  MARKETPLACE_RESULTS_COUNT_LABEL,
  MARKETPLACE_SORT_LABEL,
  MARKETPLACE_SORT_OPTIONS,
} from "@/features/marketplace/marketplaceCopy.constant";
import {
  MK_COUNT_CLASS,
  MK_FILTERS_CLASS,
  MK_SORT_SELECT_CLASS,
  MK_SORT_WRAP_CLASS,
  MK_SUB_CLASS,
  MK_TOOLS_CLASS,
  MK_TOP_CLASS,
} from "@/features/marketplace/marketplaceBrowseClasses.constant";
import type {
  MarketplaceBrowseFilters,
  MarketplaceBrowseSort,
} from "@/features/marketplace/utils/filterSortMarketplaceListings";
import { marketplaceFiltersAreActive } from "@/features/marketplace/utils/filterSortMarketplaceListings";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

interface MarketplaceBrowseToolbarProps {
  readonly filters: MarketplaceBrowseFilters;
  readonly listings: readonly HarnessMarketplaceListing[];
  readonly resultCount: number;
  readonly onChange: (next: MarketplaceBrowseFilters) => void;
}

export default function MarketplaceBrowseToolbar({
  filters,
  listings,
  resultCount,
  onChange,
}: MarketplaceBrowseToolbarProps) {
  return (
    <div className={MK_TOP_CLASS}>
      <div className={MK_TOOLS_CLASS}>
        <MarketplaceBrowseSearchField
          query={filters.query}
          onQueryChange={(query) => onChange({ ...filters, query })}
        />
        <div className={MK_SORT_WRAP_CLASS}>
          <label
            className="text-xs font-medium text-awc-fg-muted"
            htmlFor="mk-sort"
          >
            {MARKETPLACE_SORT_LABEL}
          </label>
          <select
            id="mk-sort"
            className={MK_SORT_SELECT_CLASS}
            value={filters.sort}
            onChange={(event) =>
              onChange({
                ...filters,
                sort: event.target.value as MarketplaceBrowseSort,
              })
            }
          >
            {MARKETPLACE_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={MK_SUB_CLASS}>
        <div className={MK_FILTERS_CLASS}>
          <MarketplaceBrowseTypeSeg
            filters={filters}
            listings={listings}
            onChange={onChange}
          />
          <MarketplaceBrowsePublisherSeg
            filters={filters}
            listings={listings}
            onChange={onChange}
          />
        </div>
        {marketplaceFiltersAreActive(filters) ? (
          <span className={MK_COUNT_CLASS} role="status">
            {MARKETPLACE_RESULTS_COUNT_LABEL(resultCount)}
          </span>
        ) : null}
      </div>
    </div>
  );
}
