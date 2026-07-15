"use client";

import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import MarketplaceList from "@/features/marketplace/MarketplaceList";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

interface MarketplaceListingSectionsProps {
  readonly officialListings: readonly HarnessMarketplaceListing[];
  readonly teammateListings: readonly HarnessMarketplaceListing[];
  readonly isLoading: boolean;
  readonly onBorrow: (capabilityId: string) => void;
  readonly variant?: "embedded" | "page";
}

export default function MarketplaceListingSections({
  officialListings,
  teammateListings,
  isLoading,
  onBorrow,
  variant = "embedded",
}: MarketplaceListingSectionsProps) {
  return (
    <>
      <section>
        <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>Free starters</h2>
        <p className={`mt-2 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
          Official preset agents and workflows with rules bundles. Preview one,
          save it to your library, or install the bundle on your Mac.
        </p>
        <MarketplaceList
          listings={officialListings}
          isLoading={isLoading}
          onBorrow={onBorrow}
          emptyMessage="No free starters available."
        />
      </section>
      <section className={variant === "page" ? "mt-8" : "mt-6"}>
        <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>From teammates</h2>
        <p className={`mt-2 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
          Browse agents and workflows teammates published for your company.
          Preview a listing, save a copy to your library, or install the linked
          rules bundle on your Mac.
        </p>
        <MarketplaceList
          listings={teammateListings}
          isLoading={isLoading}
          onBorrow={onBorrow}
          emptyMessage="No teammate listings yet. Publish a workflow or agent with rules for others to borrow."
        />
      </section>
    </>
  );
}
