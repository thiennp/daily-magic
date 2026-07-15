import Link from "next/link";

import { HOME_MARKETING_FEATURES_COPY } from "@/features/home/constants/homeMarketingLandingCopy.constant";
import MarketingFeatureCard from "@/features/marketing/MarketingFeatureCard";
import { MARKETING_FEATURE_ITEMS } from "@/features/marketing/marketingFeatureItems.constant";
import { MARKETING_TEXT_LINK_CLASSES } from "@/features/marketing/marketingInteractiveClasses.constant";
import { MARKETING_TEXT_SECONDARY_CLASSES } from "@/features/marketing/marketingSurfaceClasses.constant";
import MarketingSectionHeader from "@/features/marketing/MarketingSectionHeader";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

export default function HomeMarketingFeatures() {
  const copy = HOME_MARKETING_FEATURES_COPY;

  return (
    <section className="mt-24" aria-labelledby="features-heading">
      <MarketingSectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        headingId="features-heading"
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {MARKETING_FEATURE_ITEMS.map((item) => (
          <MarketingFeatureCard key={item.title} item={item} />
        ))}
      </div>
      <p
        className={mergeMarketingClasses(
          "mt-8 text-sm",
          MARKETING_TEXT_SECONDARY_CLASSES,
        )}
      >
        {copy.footerPrefix}{" "}
        <Link href="/#get-started" className={MARKETING_TEXT_LINK_CLASSES}>
          {copy.footerLink}
        </Link>
        .
      </p>
    </section>
  );
}
