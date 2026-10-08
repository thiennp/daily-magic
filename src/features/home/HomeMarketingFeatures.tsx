import {
  HOME_MARKETING_FEATURES_COPY,
  HOME_MARKETING_SECURITY_COPY,
} from "@/features/home/constants/homeMarketingLandingCopy.constant";
import MarketingDarkBand from "@/features/marketing/MarketingDarkBand";
import MarketingCard from "@/features/marketing/MarketingCard";
import { MARKETING_TEXT_PRIMARY_CLASSES } from "@/features/marketing/marketingSurfaceClasses.constant";
import { MARKETING_TEXT_SECONDARY_CLASSES } from "@/features/marketing/marketingSurfaceClasses.constant";
import MarketingSectionHeader from "@/features/marketing/MarketingSectionHeader";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

export default function HomeMarketingFeatures() {
  const copy = HOME_MARKETING_FEATURES_COPY;

  return (
    <section className="mt-16" id="what" aria-labelledby="features-heading">
      <MarketingSectionHeader
        title={copy.title}
        description={copy.description}
        headingId="features-heading"
        width="full"
      />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {copy.items.map((item) => (
          <li key={item.title}>
            <MarketingCard as="div" className="h-full space-y-2">
              <h3
                className={mergeMarketingClasses(
                  "text-base font-semibold",
                  MARKETING_TEXT_PRIMARY_CLASSES,
                )}
              >
                {item.title}
              </h3>
              <p
                className={mergeMarketingClasses(
                  "text-sm leading-relaxed",
                  MARKETING_TEXT_SECONDARY_CLASSES,
                )}
              >
                {item.body}
              </p>
            </MarketingCard>
          </li>
        ))}
      </ul>
      <div id="security">
        <MarketingDarkBand
          eyebrow="Your files"
          title={HOME_MARKETING_SECURITY_COPY.title}
          description={HOME_MARKETING_SECURITY_COPY.body}
        />
      </div>
    </section>
  );
}
