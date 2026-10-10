import { HOME_MARKETING_STEPS_COPY } from "@/features/home/constants/homeMarketingBotsFaqCopy.constant";
import {
  MarketingCard,
  MarketingSectionHeader,
} from "@/features/marketing/public-api/presentation";
import {
  MARKETING_TEXT_PRIMARY_CLASSES,
  MARKETING_TEXT_SECONDARY_CLASSES,
  mergeMarketingClasses,
} from "@/features/marketing/public-api/types";

export default function HomeMarketingSteps() {
  const copy = HOME_MARKETING_STEPS_COPY;

  return (
    <section className="mt-16" id="bots" aria-labelledby="steps-heading">
      <MarketingSectionHeader
        title={copy.title}
        description={copy.description}
        headingId="steps-heading"
      />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {copy.steps.map((step) => (
          <li key={step.title}>
            <MarketingCard as="div" className="flex h-full flex-col gap-3">
              <span className="w-fit rounded-full border border-awc-border px-2 py-0.5 text-xs font-medium text-awc-fg-muted">
                {step.chip}
              </span>
              <h3
                className={mergeMarketingClasses(
                  "text-base font-semibold",
                  MARKETING_TEXT_PRIMARY_CLASSES,
                )}
              >
                {step.title}
              </h3>
              <p
                className={mergeMarketingClasses(
                  "text-sm leading-relaxed",
                  MARKETING_TEXT_SECONDARY_CLASSES,
                )}
              >
                {step.body}
              </p>
            </MarketingCard>
          </li>
        ))}
      </ul>
    </section>
  );
}
