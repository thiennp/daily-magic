"use client";

import { useState } from "react";

import AppPanel from "@/components/surfaces/AppPanel";
import MarketplaceInstallModal from "@/features/marketplace/MarketplaceInstallModal";
import MarketplaceListingSections from "@/features/marketplace/MarketplaceListingSections";
import { useMarketplaceState } from "@/features/marketplace/hooks/useMarketplaceState";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

type MarketplacePanelVariant = "embedded" | "page";

interface MarketplacePanelProps {
  readonly variant?: MarketplacePanelVariant;
}

export default function MarketplacePanel({
  variant = "embedded",
}: MarketplacePanelProps) {
  const { listings, isLoading } = useMarketplaceState();
  const [installListing, setInstallListing] =
    useState<HarnessMarketplaceListing | null>(null);

  const officialListings = listings.filter(
    (listing) => listing.isOfficialPreset === true,
  );
  const teammateListings = listings.filter(
    (listing) => listing.isOfficialPreset !== true,
  );

  const listingSections = (
    <MarketplaceListingSections
      officialListings={officialListings}
      teammateListings={teammateListings}
      isLoading={isLoading}
      onInstall={setInstallListing}
      variant={variant}
    />
  );

  return (
    <>
      {variant === "page" ? (
        <div className="space-y-8">{listingSections}</div>
      ) : (
        <AppPanel>{listingSections}</AppPanel>
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
