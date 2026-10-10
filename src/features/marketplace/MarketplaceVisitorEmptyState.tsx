"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import {
  buildMarketingGetStartedHref,
  buildSignInHrefFromSearchParams,
} from "@/features/empty-states/public-api/types";
import { HomeMarketingPopularPresetsGrid } from "@/features/home/components/public-api/presentation";
import resolveHomePopularPresets from "@/features/home/utils/resolveHomePopularPresets";
import { MarketingCtaLink } from "@/features/marketing/public-api/presentation";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";

export default function MarketplaceVisitorEmptyState() {
  const searchParams = useSearchParams();
  const createAccountHref = useMemo(
    () => buildMarketingGetStartedHref(searchParams),
    [searchParams],
  );
  const signInHref = useMemo(
    () => buildSignInHrefFromSearchParams(searchParams),
    [searchParams],
  );
  const presets = resolveHomePopularPresets();

  return (
    <section className="space-y-6" aria-labelledby="marketplace-empty-heading">
      <div>
        <h2
          id="marketplace-empty-heading"
          className={APP_SURFACE_SECTION_TITLE_CLASS}
        >
          Try a free starter Playbook
        </h2>
        <p
          className={`mt-2 max-w-2xl leading-relaxed ${APP_SURFACE_BODY_TEXT_CLASS}`}
        >
          Pick a ready-made starter below. Sign in to save it to your Library
          and run it as a Task on your computer.
        </p>
      </div>
      <HomeMarketingPopularPresetsGrid presets={presets} />
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <MarketingCtaLink href={createAccountHref}>
          Create free account
        </MarketingCtaLink>
        <MarketingCtaLink href={signInHref} variant="secondary">
          Sign in
        </MarketingCtaLink>
      </div>
    </section>
  );
}
