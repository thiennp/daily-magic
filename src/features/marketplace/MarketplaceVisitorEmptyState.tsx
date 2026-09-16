"use client";

import HomeMarketingPopularPresetsGrid from "@/features/home/components/HomeMarketingPopularPresetsGrid";
import resolveHomePopularPresets from "@/features/home/utils/resolveHomePopularPresets";
import MarketingCtaLink from "@/features/marketing/MarketingCtaLink";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";

export default function MarketplaceVisitorEmptyState() {
  const presets = resolveHomePopularPresets();

  return (
    <section className="space-y-6" aria-labelledby="marketplace-empty-heading">
      <div>
        <h2
          id="marketplace-empty-heading"
          className={APP_SURFACE_SECTION_TITLE_CLASS}
        >
          Try a free starter workflow
        </h2>
        <p className={`mt-2 max-w-2xl ${APP_SURFACE_BODY_TEXT_CLASS}`}>
          Pick a ready-made workflow below. Sign in to save it to your Library
          and run it on your Mac.
        </p>
      </div>
      <HomeMarketingPopularPresetsGrid presets={presets} />
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <MarketingCtaLink href="/#get-started">
          Create free account
        </MarketingCtaLink>
        <MarketingCtaLink
          href="/login?callbackUrl=%2Fmarketplace"
          variant="secondary"
        >
          Sign in
        </MarketingCtaLink>
      </div>
    </section>
  );
}
