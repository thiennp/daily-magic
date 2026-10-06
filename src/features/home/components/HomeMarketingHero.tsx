import Link from "next/link";

import HomeMarketingAuthSection from "./HomeMarketingAuthSection";
import HomeMarketingHeroSteps from "./HomeMarketingHeroSteps";
import { HOME_MARKETING_HERO_COPY } from "@/features/home/constants/homeMarketingLandingCopy.constant";
import HomeMarketingStatusPreview from "@/features/home/components/HomeMarketingStatusPreview";
import MarketingTrustStrip from "@/features/marketing/MarketingTrustStrip";
import { MARKETING_DISPLAY_HEADING_CLASSES } from "@/features/marketing/marketingDesignSystem.constant";
import {
  MARKETING_CTA_PRIMARY_CLASSES,
  MARKETING_CTA_SECONDARY_CLASSES,
} from "@/features/marketing/marketingInteractiveClasses.constant";
import {
  MARKETING_EYEBROW_TEXT_CLASSES,
  MARKETING_TEXT_SECONDARY_CLASSES,
} from "@/features/marketing/marketingSurfaceClasses.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

export default function HomeMarketingHero() {
  return (
    <section
      aria-labelledby="home-marketing-hero-heading"
      className="space-y-10"
    >
      <header className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16 xl:gap-20">
        <div className="space-y-6 lg:pt-2">
          <div className="space-y-5">
            <p
              className={mergeMarketingClasses(
                "text-sm font-medium uppercase tracking-wider",
                MARKETING_EYEBROW_TEXT_CLASSES,
              )}
            >
              {HOME_MARKETING_HERO_COPY.eyebrow}
            </p>
            <h1
              id="home-marketing-hero-heading"
              className={mergeMarketingClasses(
                "text-4xl sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]",
                MARKETING_DISPLAY_HEADING_CLASSES,
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

          <nav
            className="flex flex-wrap items-center gap-3"
            aria-label="Primary calls to action"
          >
            <Link
              href="#get-started"
              className={MARKETING_CTA_PRIMARY_CLASSES}
              aria-label="Jump to Create free account"
            >
              {HOME_MARKETING_HERO_COPY.cta}
            </Link>
            <Link
              href={HOME_MARKETING_HERO_COPY.secondaryCtaHref}
              className={MARKETING_CTA_SECONDARY_CLASSES}
            >
              {HOME_MARKETING_HERO_COPY.secondaryCta}
            </Link>
          </nav>
        </div>

        <aside aria-label="Sign in and product preview" className="space-y-5">
          <HomeMarketingAuthSection />
          <HomeMarketingStatusPreview />
        </aside>
      </header>

      <div className="hidden md:block">
        <MarketingTrustStrip />
      </div>
    </section>
  );
}
