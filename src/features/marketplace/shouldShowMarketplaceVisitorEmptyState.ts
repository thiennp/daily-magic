type MarketplacePanelVariant = "embedded" | "page";

interface MarketplaceListingCounts {
  readonly officialCount: number;
  readonly teammateCount: number;
}

export const shouldShowMarketplaceVisitorEmptyState = (
  variant: MarketplacePanelVariant,
  isLoading: boolean,
  counts: MarketplaceListingCounts,
): boolean =>
  variant === "page" &&
  !isLoading &&
  counts.officialCount === 0 &&
  counts.teammateCount === 0;
