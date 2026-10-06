import {
  CapabilityType,
  type CapabilityTypeValue,
} from "@/lib/capabilities/CapabilityType.constant";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";
import { resolveMarketplaceListingTypeChrome } from "@/features/marketplace/marketplaceListingTypeChrome.constant";

export type MarketplaceBrowseTypeFilter = "all" | CapabilityTypeValue;

export type MarketplaceBrowsePublisherFilter = "all" | "official" | "team";

export type MarketplaceBrowseSort = "name" | "officialFirst";

export interface MarketplaceBrowseFilters {
  readonly query: string;
  readonly type: MarketplaceBrowseTypeFilter;
  readonly publisher: MarketplaceBrowsePublisherFilter;
  readonly sort: MarketplaceBrowseSort;
}

const matchesQuery = (
  listing: HarnessMarketplaceListing,
  query: string,
): boolean => {
  if (query.length === 0) {
    return true;
  }
  const haystack = [
    listing.name,
    listing.description,
    listing.ownerName ?? "",
    listing.ownerEmail,
    listing.type,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
};

const matchesPublisher = (
  listing: HarnessMarketplaceListing,
  publisher: MarketplaceBrowsePublisherFilter,
): boolean => {
  if (publisher === "all") {
    return true;
  }
  const isOfficial = listing.isOfficialPreset === true;
  return publisher === "official" ? isOfficial : !isOfficial;
};

const compareListings = (
  a: HarnessMarketplaceListing,
  b: HarnessMarketplaceListing,
  sort: MarketplaceBrowseSort,
): number => {
  if (sort === "officialFirst") {
    const aOfficial = a.isOfficialPreset === true ? 0 : 1;
    const bOfficial = b.isOfficialPreset === true ? 0 : 1;
    if (aOfficial !== bOfficial) {
      return aOfficial - bOfficial;
    }
  }
  return a.name.localeCompare(b.name);
};

export const filterSortMarketplaceListings = (
  listings: readonly HarnessMarketplaceListing[],
  filters: MarketplaceBrowseFilters,
): readonly HarnessMarketplaceListing[] => {
  const query = filters.query.trim().toLowerCase();
  const filtered = listings.filter((listing) => {
    if (filters.type !== "all" && listing.type !== filters.type) {
      return false;
    }
    if (!matchesPublisher(listing, filters.publisher)) {
      return false;
    }
    return matchesQuery(listing, query);
  });
  return [...filtered].sort((a, b) => compareListings(a, b, filters.sort));
};

export const countMarketplaceListingsByType = (
  listings: readonly HarnessMarketplaceListing[],
  type: MarketplaceBrowseTypeFilter,
): number => {
  if (type === "all") {
    return listings.length;
  }
  return listings.filter((listing) => listing.type === type).length;
};

export const countMarketplaceListingsByPublisher = (
  listings: readonly HarnessMarketplaceListing[],
  publisher: MarketplaceBrowsePublisherFilter,
): number => listings.filter((listing) => matchesPublisher(listing, publisher)).length;

export const MARKETPLACE_TYPE_FILTER_OPTIONS: readonly {
  readonly value: MarketplaceBrowseTypeFilter;
  readonly label: string;
}[] = [
  { value: "all", label: "All" },
  {
    value: CapabilityType.WORKFLOW,
    label: resolveMarketplaceListingTypeChrome(CapabilityType.WORKFLOW).plural,
  },
  {
    value: CapabilityType.AGENT,
    label: resolveMarketplaceListingTypeChrome(CapabilityType.AGENT).plural,
  },
] as const;

export const MARKETPLACE_PUBLISHER_FILTER_OPTIONS: readonly {
  readonly value: MarketplaceBrowsePublisherFilter;
  readonly label: string;
}[] = [
  { value: "all", label: "All" },
  { value: "official", label: "Official" },
  { value: "team", label: "Teammates" },
] as const;

export const marketplaceFiltersAreActive = (
  filters: MarketplaceBrowseFilters,
): boolean =>
  filters.query.trim().length > 0 ||
  filters.type !== "all" ||
  filters.publisher !== "all";
