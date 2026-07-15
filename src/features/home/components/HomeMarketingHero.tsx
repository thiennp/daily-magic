import Link from "next/link";

import HomeMarketingAuthSection from "./HomeMarketingAuthSection";
import HomeMarketingHeroSteps from "./HomeMarketingHeroSteps";
import { HOME_MARKETING_HERO_COPY } from "@/features/home/constants/homeMarketingLandingCopy.constant";
import MarketingProductPreview from "@/features/marketing/MarketingProductPreview";
import MarketingTrustStrip from "@/features/marketing/MarketingTrustStrip";
import { MARKETING_CTA_GHOST_CLASSES } from "@/features/marketing/marketingInteractiveClasses.constant";
import {
  MARKETING_TEXT_PRIMARY_CLASSES,
  MARKETING_TEXT_SECONDARY_CLASSES,
} from "@/features/marketing/marketingSurfaceClasses.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

export default function HomeMarketingHero() {
  return (
    <header className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-20 xl:gap-24">
      <div className="space-y-8 lg:pt-2">
        <div className="space-y-6">
          <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">
            {HOME_MARKETING_HERO_COPY.eyebrow}
          </p>
          <h1
            className={mergeMarketingClasses(
              "text-4xl font-semibold tracking-[-0.02em] sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]",
              MARKETING_TEXT_PRIMARY_CLASSES,
            )}
          >
            {HOME_MARKETING_HERO_COPY.title}
          </h1>
          <p
            className={mergeMarketingClasses(
              "max-w-2xl text-lg leading-relaxed",
              MARKETING_TEXT_SECONDARY_CLASSES,
            )}
          >
            {HOME_MARKETING_HERO_COPY.description}
          </p>
          <HomeMarketingHeroSteps />
        </div>

        <nav aria-label="Jump to sign in">
          <Link
            href="#get-started"
            className={MARKETING_CTA_GHOST_CLASSES}
            aria-label="Jump to create a free account"
          >
            {HOME_MARKETING_HERO_COPY.cta}
          </Link>
        </nav>

        <div className="mt-8">
          <MarketingTrustStrip />
        </div>
      </div>

      <aside aria-label="Sign in and product preview" className="space-y-5">
        <HomeMarketingAuthSection />
        <MarketingProductPreview />
      </aside>
    </header>
  );
}
