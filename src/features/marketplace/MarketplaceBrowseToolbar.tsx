"use client";

import MarketplaceBrowseTypeSeg from "@/features/marketplace/MarketplaceBrowseTypeSeg";
import {
  MARKETPLACE_SEARCH_LABEL,
  MARKETPLACE_SEARCH_PLACEHOLDER,
  MARKETPLACE_SORT_LABEL,
} from "@/features/marketplace/marketplaceCopy.constant";
import {
  MK_SEARCH_INPUT_CLASS,
  MK_SEARCH_WRAP_CLASS,
  MK_SORT_SELECT_CLASS,
  MK_SORT_WRAP_CLASS,
  MK_TOOLS_CLASS,
  MK_TOOLS_ROW_CLASS,
} from "@/features/marketplace/marketplaceBrowseClasses.constant";
import type {
  MarketplaceBrowseFilters,
  MarketplaceBrowseSort,
} from "@/features/marketplace/utils/filterSortMarketplaceListings";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

interface MarketplaceBrowseToolbarProps {
  readonly filters: MarketplaceBrowseFilters;
  readonly listings: readonly HarnessMarketplaceListing[];
  readonly onChange: (next: MarketplaceBrowseFilters) => void;
}

export default function MarketplaceBrowseToolbar({
  filters,
  listings,
  onChange,
}: MarketplaceBrowseToolbarProps) {
  return (
    <div className={MK_TOOLS_CLASS}>
      <div className={MK_TOOLS_ROW_CLASS}>
        <div className={MK_SEARCH_WRAP_CLASS}>
          <label className="sr-only" htmlFor="mk-q">
            {MARKETPLACE_SEARCH_LABEL}
          </label>
          <input
            id="mk-q"
            className={MK_SEARCH_INPUT_CLASS}
            type="search"
            placeholder={MARKETPLACE_SEARCH_PLACEHOLDER}
            autoComplete="off"
            spellCheck={false}
            value={filters.query}
            onChange={(event) =>
              onChange({ ...filters, query: event.target.value })
            }
          />
        </div>
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
            <option value="officialFirst">Free starters first</option>
            <option value="name">Name A to Z</option>
            <option value="newestName">Name Z to A</option>
          </select>
        </div>
      </div>
      <MarketplaceBrowseTypeSeg
        filters={filters}
        listings={listings}
        onChange={onChange}
      />
    </div>
  );
}
