"use client";

import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import { MARKETPLACE_FREE_STARTERS_SECTION_ID } from "@/features/empty-states/buildGuestAuthHrefs";
import { useGuestSessionState } from "@/features/empty-states/useGuestSessionState";
import {
  MarketplaceFreeStartersSectionBody,
  MarketplaceTeammatesSectionBody,
} from "@/features/marketplace/MarketplaceListingSectionBodies";
import { resolveTeammatesMarketplaceView } from "@/features/marketplace/resolveTeammatesMarketplaceView";
import { MAC_WORKER_BENEFIT_COPY } from "@/lib/copy/macWorkerBenefitCopy.constant";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

type MarketplaceSectionVisibility =
  "all" | "teammatesOnly" | "freeStartersOnly";

interface MarketplaceListingSectionsProps {
  readonly officialListings: readonly HarnessMarketplaceListing[];
  readonly teammateListings: readonly HarnessMarketplaceListing[];
  readonly isLoading: boolean;
  readonly onInstall: (listing: HarnessMarketplaceListing) => void;
  readonly variant?: "embedded" | "page";
  readonly teamNavEnabled: boolean;
  readonly sectionVisibility?: MarketplaceSectionVisibility;
}

export default function MarketplaceListingSections({
  officialListings,
  teammateListings,
  isLoading,
  onInstall,
  variant = "embedded",
  teamNavEnabled,
  sectionVisibility = "all",
}: MarketplaceListingSectionsProps) {
  const { sessionState, isSignedIn } = useGuestSessionState();
  const sectionLoading =
    sessionState === "loading" || (isSignedIn && isLoading);

  const teammatesView = resolveTeammatesMarketplaceView({
    isSignedIn,
    listingCount: teammateListings.length,
    teamNavEnabled,
  });

  const sectionBodyProps = {
    sectionLoading,
    isSignedIn,
    officialListings,
    teammateListings,
    teammatesView,
    onInstall,
  };

  const showFreeStarters =
    sectionVisibility === "all" || sectionVisibility === "freeStartersOnly";
  const showTeammates =
    sectionVisibility === "all" || sectionVisibility === "teammatesOnly";

  return (
    <>
      {showFreeStarters ? (
        <section id={MARKETPLACE_FREE_STARTERS_SECTION_ID}>
          <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>Free starters</h2>
          <p className={`mt-2 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
            {MAC_WORKER_BENEFIT_COPY.freeStartersDescription}
          </p>
          <MarketplaceFreeStartersSectionBody {...sectionBodyProps} />
        </section>
      ) : null}
      {showTeammates ? (
        <section className={variant === "page" ? "mt-8" : "mt-6"}>
          <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>From teammates</h2>
          <p className={`mt-2 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
            Agents and workflows your teammates shared.
          </p>
          <MarketplaceTeammatesSectionBody {...sectionBodyProps} />
        </section>
      ) : null}
    </>
  );
}
