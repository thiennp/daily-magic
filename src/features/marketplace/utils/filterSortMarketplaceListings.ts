import {
  CapabilityType,
  type CapabilityTypeValue,
} from "@/lib/capabilities/CapabilityType.constant";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

export type MarketplaceBrowseTypeFilter = "all" | CapabilityTypeValue;

export type MarketplaceBrowseSort =
  | "name"
  | "officialFirst"
  | "newestName";

export interface MarketplaceBrowseFilters {
  readonly query: string;
  readonly type: MarketplaceBrowseTypeFilter;
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
    return a.name.localeCompare(b.name);
  }
  if (sort === "newestName") {
    return b.name.localeCompare(a.name);
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

export const MARKETPLACE_TYPE_FILTER_OPTIONS: readonly {
  readonly value: MarketplaceBrowseTypeFilter;
  readonly label: string;
}[] = [
  { value: "all", label: "All" },
  { value: CapabilityType.WORKFLOW, label: "Workflows" },
  { value: CapabilityType.AGENT, label: "Agents" },
] as const;
