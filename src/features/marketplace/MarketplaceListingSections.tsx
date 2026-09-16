"use client";

import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import { MARKETPLACE_FREE_STARTERS_SECTION_ID } from "@/features/empty-states/buildGuestAuthHrefs";
import { useGuestSessionState } from "@/features/empty-states/useGuestSessionState";
import MarketplaceList from "@/features/marketplace/MarketplaceList";
import MarketplaceSectionSkeleton from "@/features/marketplace/MarketplaceSectionSkeleton";
import {
  MarketplaceFreeStartersGuestEmptyPanel,
  MarketplaceFreeStartersSignedInEmptyPanel,
  MarketplaceTeammatesGuestEmptyPanel,
  MarketplaceTeammatesSoloUpsellPanel,
  MarketplaceTeammatesTeamEmptyPanel,
} from "@/features/marketplace/marketplaceListingEmptyPanels";
import { resolveTeammatesMarketplaceView } from "@/features/marketplace/resolveTeammatesMarketplaceView";
import { MAC_WORKER_BENEFIT_COPY } from "@/lib/copy/macWorkerBenefitCopy.constant";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

interface MarketplaceListingSectionsProps {
  readonly officialListings: readonly HarnessMarketplaceListing[];
  readonly teammateListings: readonly HarnessMarketplaceListing[];
  readonly isLoading: boolean;
  readonly onInstall: (listing: HarnessMarketplaceListing) => void;
  readonly variant?: "embedded" | "page";
  readonly teamNavEnabled: boolean;
}

export default function MarketplaceListingSections({
  officialListings,
  teammateListings,
  isLoading,
  onInstall,
  variant = "embedded",
  teamNavEnabled,
}: MarketplaceListingSectionsProps) {
  const { sessionState, isSignedIn } = useGuestSessionState();
  const authLoading = sessionState === "loading";
  const sectionLoading = authLoading || isLoading;

  const teammatesView = resolveTeammatesMarketplaceView({
    isSignedIn,
    listingCount: teammateListings.length,
    teamNavEnabled,
  });

  const renderFreeStartersBody = () => {
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
  };

  const renderTeammatesBody = () => {
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
  };

  return (
    <>
      <section id={MARKETPLACE_FREE_STARTERS_SECTION_ID}>
        <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>Free starters</h2>
        <p className={`mt-2 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
          {MAC_WORKER_BENEFIT_COPY.freeStartersDescription}
        </p>
        {renderFreeStartersBody()}
      </section>
      <section className={variant === "page" ? "mt-8" : "mt-6"}>
        <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>From teammates</h2>
        <p className={`mt-2 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
          Agents and workflows your teammates shared.
        </p>
        {renderTeammatesBody()}
      </section>
    </>
  );
}
