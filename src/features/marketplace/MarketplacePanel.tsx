"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import MarketplaceBorrowPreview from "@/features/marketplace/MarketplaceBorrowPreview";
import MarketplaceListingSections from "@/features/marketplace/MarketplaceListingSections";
import { useMarketplaceState } from "@/features/marketplace/hooks/useMarketplaceState";
import { useAgentWitchHarnessSocket } from "@/features/harness/hooks/useAgentWitchHarnessSocket";

type MarketplacePanelVariant = "embedded" | "page";

interface MarketplacePanelProps {
  readonly variant?: MarketplacePanelVariant;
}

export default function MarketplacePanel({
  variant = "embedded",
}: MarketplacePanelProps) {
  const harnessSocket = useAgentWitchHarnessSocket();
  const { listings, borrowed, isLoading, borrowListing } =
    useMarketplaceState();

  const officialListings = listings.filter(
    (listing) => listing.isOfficialPreset === true,
  );
  const teammateListings = listings.filter(
    (listing) => listing.isOfficialPreset !== true,
  );
  const macConnected = harnessSocket.pairingStatus === "paired";

  const listingSections = (
    <MarketplaceListingSections
      officialListings={officialListings}
      teammateListings={teammateListings}
      isLoading={isLoading}
      onBorrow={(capabilityId) => {
        void borrowListing(capabilityId);
      }}
      variant={variant}
    />
  );

  const preview =
    borrowed !== null ? (
      <MarketplaceBorrowPreview
        borrowed={borrowed}
        harnessSocket={harnessSocket}
        macConnected={macConnected}
      />
    ) : null;

  if (variant === "page") {
    return (
      <div className="space-y-8">
        <div
          className={
            borrowed !== null
              ? "grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start"
              : undefined
          }
        >
          <div className="space-y-8">{listingSections}</div>
          {preview}
        </div>
      </div>
    );
  }

  return (
    <AppPanel>
      {listingSections}
      {preview}
    </AppPanel>
  );
}
