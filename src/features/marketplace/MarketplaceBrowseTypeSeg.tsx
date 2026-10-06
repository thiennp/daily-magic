"use client";

import { MARKETPLACE_TYPE_FILTER_LABEL } from "@/features/marketplace/marketplaceCopy.constant";
import {
  MK_SEG_BTN_ACTIVE_CLASS,
  MK_SEG_BTN_CLASS,
  MK_SEG_CLASS,
  MK_SEG_COUNT_CLASS,
} from "@/features/marketplace/marketplaceBrowseClasses.constant";
import {
  MARKETPLACE_TYPE_FILTER_OPTIONS,
  type MarketplaceBrowseFilters,
  type MarketplaceBrowseTypeFilter,
  countMarketplaceListingsByType,
} from "@/features/marketplace/utils/filterSortMarketplaceListings";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

interface MarketplaceBrowseTypeSegProps {
  readonly filters: MarketplaceBrowseFilters;
  readonly listings: readonly HarnessMarketplaceListing[];
  readonly onChange: (next: MarketplaceBrowseFilters) => void;
}

export default function MarketplaceBrowseTypeSeg({
  filters,
  listings,
  onChange,
}: MarketplaceBrowseTypeSegProps) {
  return (
    <div
      className={MK_SEG_CLASS}
      role="group"
      aria-label={MARKETPLACE_TYPE_FILTER_LABEL}
    >
      {MARKETPLACE_TYPE_FILTER_OPTIONS.map((option) => {
        const pressed = filters.type === option.value;
        return (
          <button
            key={option.value}
            type="button"
            className={
              pressed
                ? `${MK_SEG_BTN_CLASS} ${MK_SEG_BTN_ACTIVE_CLASS}`
                : MK_SEG_BTN_CLASS
            }
            aria-pressed={pressed}
            onClick={() =>
              onChange({
                ...filters,
                type: option.value as MarketplaceBrowseTypeFilter,
              })
            }
          >
            {option.label}
            <span className={MK_SEG_COUNT_CLASS}>
              {countMarketplaceListingsByType(listings, option.value)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
