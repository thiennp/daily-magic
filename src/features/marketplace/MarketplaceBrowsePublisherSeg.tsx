"use client";

import {
  MARKETPLACE_PUBLISHER_FILTER_LABEL,
  MARKETPLACE_PUBLISHER_FILTER_TIP,
} from "@/features/marketplace/marketplaceCopy.constant";
import {
  MK_FILTER_GROUP_CLASS,
  MK_FILTER_LAB_CLASS,
  MK_SEG_BTN_ACTIVE_CLASS,
  MK_SEG_BTN_CLASS,
  MK_SEG_CLASS,
  MK_SEG_COUNT_CLASS,
} from "@/features/marketplace/marketplaceBrowseClasses.constant";
import {
  MARKETPLACE_PUBLISHER_FILTER_OPTIONS,
  type MarketplaceBrowseFilters,
  type MarketplaceBrowsePublisherFilter,
  countMarketplaceListingsByPublisher,
} from "@/features/marketplace/utils/filterSortMarketplaceListings";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

interface MarketplaceBrowsePublisherSegProps {
  readonly filters: MarketplaceBrowseFilters;
  readonly listings: readonly HarnessMarketplaceListing[];
  readonly onChange: (next: MarketplaceBrowseFilters) => void;
}

export default function MarketplaceBrowsePublisherSeg({
  filters,
  listings,
  onChange,
}: MarketplaceBrowsePublisherSegProps) {
  return (
    <div className={MK_FILTER_GROUP_CLASS}>
      <span className={MK_FILTER_LAB_CLASS} id="mk-pub-l" title={MARKETPLACE_PUBLISHER_FILTER_TIP}>
        {MARKETPLACE_PUBLISHER_FILTER_LABEL}
      </span>
      <div
        className={MK_SEG_CLASS}
        role="group"
        aria-labelledby="mk-pub-l"
      >
        {MARKETPLACE_PUBLISHER_FILTER_OPTIONS.map((option) => {
          const pressed = filters.publisher === option.value;
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
                  publisher: option.value as MarketplaceBrowsePublisherFilter,
                })
              }
            >
              {option.label}
              <span className={MK_SEG_COUNT_CLASS}>
                {countMarketplaceListingsByPublisher(listings, option.value)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
