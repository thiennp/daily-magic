"use client";

import { MARKETPLACE_FREE_STARTERS_SECTION_ID } from "@/features/empty-states/public-api/types";
import { useGuestSessionState } from "@/features/empty-states/public-api/presentation";
import {
  MarketplaceFreeStartersSectionBody,
  MarketplaceTeammatesSectionBody,
} from "@/features/marketplace/MarketplaceListingSectionBodies";
import {
  MARKETPLACE_FREE_STARTERS_TITLE,
  MARKETPLACE_TEAMMATES_DESCRIPTION,
  MARKETPLACE_TEAMMATES_TITLE,
} from "@/features/marketplace/marketplaceCopy.constant";
import {
  MK_SECTION_BODY_CLASS,
  MK_SECTION_TITLE_CLASS,
} from "@/features/marketplace/marketplaceBrowseClasses.constant";
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
          <h2 className={MK_SECTION_TITLE_CLASS}>
            {MARKETPLACE_FREE_STARTERS_TITLE}
          </h2>
          <p className={MK_SECTION_BODY_CLASS}>
            {MAC_WORKER_BENEFIT_COPY.freeStartersDescription}
          </p>
          <MarketplaceFreeStartersSectionBody {...sectionBodyProps} />
        </section>
      ) : null}
      {showTeammates ? (
        <section className={variant === "page" ? "mt-8" : "mt-6"}>
          <h2 className={MK_SECTION_TITLE_CLASS}>
            {MARKETPLACE_TEAMMATES_TITLE}
          </h2>
          <p className={MK_SECTION_BODY_CLASS}>
            {MARKETPLACE_TEAMMATES_DESCRIPTION}
          </p>
          <MarketplaceTeammatesSectionBody {...sectionBodyProps} />
        </section>
      ) : null}
    </>
  );
}
