type MarketplacePanelVariant = "embedded" | "page";

interface MarketplaceListingCounts {
  readonly officialCount: number;
  readonly teammateCount: number;
}

export const shouldShowMarketplaceVisitorEmptyState = (
  variant: MarketplacePanelVariant,
  isLoading: boolean,
  counts: MarketplaceListingCounts,
  isGuest: boolean,
): boolean =>
  variant === "page" &&
  counts.officialCount === 0 &&
  counts.teammateCount === 0 &&
  (!isLoading || isGuest);
