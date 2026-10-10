"use client";

import { useMemo, useState } from "react";

import AppPanel from "@/components/surfaces/AppPanel";
import { useGuestSessionState } from "@/features/empty-states/useGuestSessionState";
import MarketplaceInstallModal from "@/features/marketplace/MarketplaceInstallModal";
import MarketplacePanelBody from "@/features/marketplace/MarketplacePanelBody";
import { useMarketplaceInstallFromCapabilityIdQuery } from "@/features/marketplace/hooks/useMarketplaceInstallFromCapabilityIdQuery";
import { useMarketplaceState } from "@/features/marketplace/hooks/useMarketplaceState";
import { shouldShowMarketplaceVisitorEmptyState } from "@/features/marketplace/shouldShowMarketplaceVisitorEmptyState";
import {
  type MarketplaceBrowseFilters,
  filterSortMarketplaceListings,
} from "@/features/marketplace/utils/filterSortMarketplaceListings";
import { splitMarketplaceOfficialTeammateListings } from "@/features/marketplace/utils/splitMarketplaceOfficialTeammateListings";
import { useShellNavContext } from "@/features/shell/hooks/public-api/presentation";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

type MarketplacePanelVariant = "embedded" | "page";

interface MarketplacePanelProps {
  readonly variant?: MarketplacePanelVariant;
}

const DEFAULT_FILTERS: MarketplaceBrowseFilters = {
  query: "",
  type: "all",
  publisher: "all",
  sort: "officialFirst",
};

export default function MarketplacePanel({
  variant = "embedded",
}: MarketplacePanelProps) {
  const { listings, isLoading, loadFailed, retry } = useMarketplaceState();
  const { sessionState } = useGuestSessionState();
  const { teamNavEnabled } = useShellNavContext();
  const isGuest = sessionState !== "signed_in";
  const [installListing, setInstallListing] =
    useState<HarnessMarketplaceListing | null>(null);
  const [filters, setFilters] =
    useState<MarketplaceBrowseFilters>(DEFAULT_FILTERS);

  useMarketplaceInstallFromCapabilityIdQuery(
    listings,
    isLoading,
    setInstallListing,
  );

  const filtered = useMemo(
    () => filterSortMarketplaceListings(listings, filters),
    [listings, filters],
  );
  const { officialListings, teammateListings } =
    splitMarketplaceOfficialTeammateListings(filtered);
  const rawSplit = splitMarketplaceOfficialTeammateListings(listings);

  const showVisitorEmptyState = shouldShowMarketplaceVisitorEmptyState(
    variant,
    isLoading,
    {
      officialCount: rawSplit.officialListings.length,
      teammateCount: rawSplit.teammateListings.length,
    },
    isGuest,
  );

  const stack = (
    <MarketplacePanelBody
      variant={variant}
      showVisitorEmptyState={showVisitorEmptyState}
      filters={filters}
      listings={listings}
      resultCount={filtered.length}
      onFiltersChange={setFilters}
      officialListings={officialListings}
      teammateListings={teammateListings}
      isLoading={isLoading}
      loadFailed={loadFailed}
      onRetry={retry}
      onInstall={setInstallListing}
      teamNavEnabled={teamNavEnabled}
    />
  );

  return (
    <>
      {variant === "page" ? stack : <AppPanel>{stack}</AppPanel>}
      <MarketplaceInstallModal
        key={installListing?.capabilityId ?? "closed"}
        listing={installListing}
        onClose={() => setInstallListing(null)}
      />
    </>
  );
}
