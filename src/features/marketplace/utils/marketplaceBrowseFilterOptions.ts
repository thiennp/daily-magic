import {
  CapabilityType,
  type CapabilityTypeValue,
} from "@/lib/capabilities/CapabilityType.constant";
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
