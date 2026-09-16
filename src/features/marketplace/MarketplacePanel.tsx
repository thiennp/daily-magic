"use client";

import { useState } from "react";

import AppPanel from "@/components/surfaces/AppPanel";
import MarketplaceInstallModal from "@/features/marketplace/MarketplaceInstallModal";
import MarketplaceListingSections from "@/features/marketplace/MarketplaceListingSections";
import MarketplaceVisitorEmptyState from "@/features/marketplace/MarketplaceVisitorEmptyState";
import { shouldShowMarketplaceVisitorEmptyState } from "@/features/marketplace/shouldShowMarketplaceVisitorEmptyState";
import { useMarketplaceInstallFromCapabilityIdQuery } from "@/features/marketplace/hooks/useMarketplaceInstallFromCapabilityIdQuery";
import { useMarketplaceState } from "@/features/marketplace/hooks/useMarketplaceState";
import { useGuestSessionState } from "@/features/empty-states/useGuestSessionState";
import useShellNavContext from "@/features/shell/hooks/useShellNavContext";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

type MarketplacePanelVariant = "embedded" | "page";

interface MarketplacePanelProps {
  readonly variant?: MarketplacePanelVariant;
}

export default function MarketplacePanel({
  variant = "embedded",
}: MarketplacePanelProps) {
  const { listings, isLoading } = useMarketplaceState();
  const { sessionState } = useGuestSessionState();
  const { teamNavEnabled } = useShellNavContext();
  const isGuest = sessionState !== "signed_in";
  const [installListing, setInstallListing] =
    useState<HarnessMarketplaceListing | null>(null);

  useMarketplaceInstallFromCapabilityIdQuery(
    listings,
    isLoading,
    setInstallListing,
  );

  const officialListings = listings.filter(
    (listing) => listing.isOfficialPreset === true,
  );
  const teammateListings = listings.filter(
    (listing) => listing.isOfficialPreset !== true,
  );

  const showVisitorEmptyState = shouldShowMarketplaceVisitorEmptyState(
    variant,
    isLoading,
    {
      officialCount: officialListings.length,
      teammateCount: teammateListings.length,
    },
    isGuest,
  );

  const listingSections = (
    <MarketplaceListingSections
      officialListings={officialListings}
      teammateListings={teammateListings}
      isLoading={isLoading}
      onInstall={setInstallListing}
      variant={variant}
      teamNavEnabled={teamNavEnabled}
    />
  );

  const teammatesOnlySections = (
    <MarketplaceListingSections
      officialListings={officialListings}
      teammateListings={teammateListings}
      isLoading={isLoading}
      onInstall={setInstallListing}
      variant={variant}
      teamNavEnabled={teamNavEnabled}
      sectionVisibility="teammatesOnly"
    />
  );

  const panelBody = showVisitorEmptyState ? (
    <>
      <MarketplaceVisitorEmptyState />
      {teammatesOnlySections}
    </>
  ) : (
    listingSections
  );

  return (
    <>
      {variant === "page" ? (
        <div className="space-y-8">{panelBody}</div>
      ) : (
        <AppPanel>{panelBody}</AppPanel>
      )}
      <MarketplaceInstallModal
        key={installListing?.capabilityId ?? "closed"}
        listing={installListing}
        onClose={() => {
          setInstallListing(null);
        }}
      />
    </>
  );
}
