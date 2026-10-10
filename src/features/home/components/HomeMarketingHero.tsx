import Link from "next/link";

import { HOME_MARKETING_HERO_COPY } from "@/features/home/constants/public-api/types";
import HomeMarketingStatusPreview from "@/features/home/components/HomeMarketingStatusPreview";
import { MarketingAuthTrigger } from "@/features/marketing/public-api/presentation";
import {
  MARKETING_DISPLAY_HEADING_CLASSES,
  MARKETING_CTA_PRIMARY_CLASSES,
  MARKETING_CTA_SECONDARY_CLASSES,
  MARKETING_TEXT_SECONDARY_CLASSES,
  mergeMarketingClasses,
} from "@/features/marketing/public-api/types";

export default function HomeMarketingHero() {
  return (
    <section aria-labelledby="home-marketing-hero-heading">
      <header className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16 xl:gap-20">
        <div className="space-y-6 lg:pt-2">
          <div className="space-y-5">
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
          </div>

          <nav
            className="flex flex-wrap items-center gap-3"
            aria-label="Primary calls to action"
          >
            <MarketingAuthTrigger
              mode="up"
              fallbackHref="/#get-started"
              className={MARKETING_CTA_PRIMARY_CLASSES}
            >
              {HOME_MARKETING_HERO_COPY.cta}
            </MarketingAuthTrigger>
            <Link
              href={HOME_MARKETING_HERO_COPY.secondaryCtaHref}
              className={MARKETING_CTA_SECONDARY_CLASSES}
            >
              {HOME_MARKETING_HERO_COPY.secondaryCta}
            </Link>
          </nav>
        </div>

        <aside aria-label="Product preview">
          <HomeMarketingStatusPreview />
        </aside>
      </header>
    </section>
  );
}
