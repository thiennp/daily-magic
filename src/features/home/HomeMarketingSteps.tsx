import Link from "next/link";

import { APP_SURFACE_STEP_BADGE_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { HOME_MARKETING_STEPS_COPY } from "@/features/home/constants/homeMarketingLandingCopy.constant";
import MarketingCard from "@/features/marketing/MarketingCard";
import { MARKETING_TEXT_LINK_CLASSES } from "@/features/marketing/marketingInteractiveClasses.constant";
import {
  MARKETING_TEXT_PRIMARY_CLASSES,
  MARKETING_TEXT_SECONDARY_CLASSES,
} from "@/features/marketing/marketingSurfaceClasses.constant";
import MarketingSectionHeader from "@/features/marketing/MarketingSectionHeader";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

export default function HomeMarketingSteps() {
  const copy = HOME_MARKETING_STEPS_COPY;

  return (
    <section className="mt-16" aria-labelledby="steps-heading">
      <MarketingSectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        headingId="steps-heading"
      />
      <MarketingCard as="section" className="mt-8" interactive>
        <ol className="grid gap-6 md:grid-cols-4">
          {copy.steps.map((step, index) => (
            <li key={step.title}>
              <Link
                href={step.href}
                className="group flex h-full flex-col space-y-3 rounded-xl p-2 transition duration-200 hover:bg-brand-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/30 focus-visible:ring-offset-2"
              >
                <span
                  className={`h-9 w-9 shadow-sm transition duration-200 group-hover:scale-105 ${APP_SURFACE_STEP_BADGE_CLASS}`}
                >
                  {index + 1}
                </span>
                <p
                  className={mergeMarketingClasses(
                    "text-sm font-semibold",
                    MARKETING_TEXT_PRIMARY_CLASSES,
                  )}
                >
                  {step.title}
                </p>
                <p
                  className={mergeMarketingClasses(
                    "text-sm leading-relaxed",
                    MARKETING_TEXT_SECONDARY_CLASSES,
                  )}
                >
                  {step.body}
                </p>
                <span className={MARKETING_TEXT_LINK_CLASSES}>
                  Learn more →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </MarketingCard>
    </section>
  );
}
