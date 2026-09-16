import MarketplaceList from "@/features/marketplace/MarketplaceList";
import MarketplaceSectionSkeleton from "@/features/marketplace/MarketplaceSectionSkeleton";
import {
  MarketplaceFreeStartersGuestEmptyPanel,
  MarketplaceFreeStartersSignedInEmptyPanel,
  MarketplaceTeammatesGuestEmptyPanel,
  MarketplaceTeammatesSoloUpsellPanel,
  MarketplaceTeammatesTeamEmptyPanel,
} from "@/features/marketplace/marketplaceListingEmptyPanels";
import type { TeammatesMarketplaceView } from "@/features/marketplace/resolveTeammatesMarketplaceView";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

interface MarketplaceListingSectionBodiesProps {
  readonly sectionLoading: boolean;
  readonly isSignedIn: boolean;
  readonly officialListings: readonly HarnessMarketplaceListing[];
  readonly teammateListings: readonly HarnessMarketplaceListing[];
  readonly teammatesView: TeammatesMarketplaceView;
  readonly onInstall: (listing: HarnessMarketplaceListing) => void;
}

export function MarketplaceFreeStartersSectionBody({
  sectionLoading,
  isSignedIn,
  officialListings,
  onInstall,
}: MarketplaceListingSectionBodiesProps) {
  if (sectionLoading) {
    return <MarketplaceSectionSkeleton />;
  }

  if (officialListings.length === 0) {
    const panel = isSignedIn ? (
      <MarketplaceFreeStartersSignedInEmptyPanel />
    ) : (
      <MarketplaceFreeStartersGuestEmptyPanel />
    );
    return <div className="mt-4">{panel}</div>;
  }

  return (
    <MarketplaceList
      listings={officialListings}
      isLoading={false}
      onInstall={onInstall}
    />
  );
}

export function MarketplaceTeammatesSectionBody({
  sectionLoading,
  teammateListings,
  teammatesView,
  onInstall,
}: MarketplaceListingSectionBodiesProps) {
  if (sectionLoading) {
    return <MarketplaceSectionSkeleton />;
  }

  if (teammatesView === "guest_auth") {
    return (
      <div className="mt-4">
        <MarketplaceTeammatesGuestEmptyPanel />
      </div>
    );
  }

  if (teammatesView === "signed_in_empty_team") {
    return (
      <div className="mt-4">
        <MarketplaceTeammatesTeamEmptyPanel />
      </div>
    );
  }

  if (teammatesView === "signed_in_empty_solo") {
    return (
      <div className="mt-4">
        <MarketplaceTeammatesSoloUpsellPanel />
      </div>
    );
  }

  return (
    <MarketplaceList
      listings={teammateListings}
      isLoading={false}
      onInstall={onInstall}
    />
  );
}
