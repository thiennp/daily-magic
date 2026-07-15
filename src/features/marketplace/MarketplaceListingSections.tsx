"use client";

import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import { MAC_WORKER_BENEFIT_COPY } from "@/lib/copy/macWorkerBenefitCopy.constant";
import MarketplaceList from "@/features/marketplace/MarketplaceList";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

interface MarketplaceListingSectionsProps {
  readonly officialListings: readonly HarnessMarketplaceListing[];
  readonly teammateListings: readonly HarnessMarketplaceListing[];
  readonly isLoading: boolean;
  readonly onInstall: (listing: HarnessMarketplaceListing) => void;
  readonly variant?: "embedded" | "page";
}

export default function MarketplaceListingSections({
  officialListings,
  teammateListings,
  isLoading,
  onInstall,
  variant = "embedded",
}: MarketplaceListingSectionsProps) {
  return (
    <>
      <section>
        <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>Free starters</h2>
        <p className={`mt-2 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
          {MAC_WORKER_BENEFIT_COPY.freeStartersDescription}
        </p>
        <MarketplaceList
          listings={officialListings}
          isLoading={isLoading}
          onInstall={onInstall}
          emptyMessage="No free starters available."
        />
      </section>
      <section className={variant === "page" ? "mt-8" : "mt-6"}>
        <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>From teammates</h2>
        <p className={`mt-2 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
          Agents and workflows your teammates shared.
        </p>
        <MarketplaceList
          listings={teammateListings}
          isLoading={isLoading}
          onInstall={onInstall}
          emptyMessage="No teammate listings yet."
        />
      </section>
    </>
  );
}
