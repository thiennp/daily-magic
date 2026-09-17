import Link from "next/link";

import { HOME_MARKETING_FEATURES_COPY } from "@/features/home/constants/homeMarketingLandingCopy.constant";
import MarketingDarkBand from "@/features/marketing/MarketingDarkBand";
import MarketingFeatureCard from "@/features/marketing/MarketingFeatureCard";
import { MARKETING_FEATURE_ITEMS } from "@/features/marketing/marketingFeatureItems.constant";
import { MARKETING_GROUPED_CARD_SHELL_CLASSES } from "@/features/marketing/marketingDesignSystem.constant";
import { MARKETING_TEXT_LINK_CLASSES } from "@/features/marketing/marketingInteractiveClasses.constant";
import { MARKETING_TEXT_SECONDARY_CLASSES } from "@/features/marketing/marketingSurfaceClasses.constant";
import MarketingSectionHeader from "@/features/marketing/MarketingSectionHeader";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

export default function HomeMarketingFeatures() {
  const copy = HOME_MARKETING_FEATURES_COPY;
  const securityFeature = MARKETING_FEATURE_ITEMS.find(
    (item) => item.preview === "approve",
  );

  return (
    <section className="mt-16" aria-labelledby="features-heading">
      <MarketingSectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        headingId="features-heading"
        width="full"
      />
      <div
        className={mergeMarketingClasses(
          MARKETING_GROUPED_CARD_SHELL_CLASSES,
          "mt-8 grid sm:grid-cols-3",
        )}
      >
        {MARKETING_FEATURE_ITEMS.map((item) => (
          <MarketingFeatureCard key={item.title} item={item} grouped />
        ))}
      </div>
      {securityFeature !== undefined ? (
        <MarketingDarkBand
          eyebrow="Security & governance"
          title={securityFeature.title}
          description={securityFeature.body}
        />
      ) : null}
      <p
        className={mergeMarketingClasses(
          "mt-6 text-sm",
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
