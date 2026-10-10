import { HOME_MARKETING_FEATURES_COPY } from "@/features/home/constants/public-api/types";
import {
  MarketingCard,
  MarketingSectionHeader,
} from "@/features/marketing/public-api/presentation";
import {
  MARKETING_TEXT_PRIMARY_CLASSES,
  MARKETING_TEXT_SECONDARY_CLASSES,
  mergeMarketingClasses,
} from "@/features/marketing/public-api/types";

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
    </section>
  );
}
