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
    <section className="mt-24" aria-labelledby="steps-heading">
      <MarketingSectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        headingId="steps-heading"
      />
      <MarketingCard as="section" className="mt-10" interactive>
        <ol className="grid gap-8 md:grid-cols-4">
          {copy.steps.map((step, index) => (
            <li
              key={step.title}
              className="group space-y-3 rounded-xl p-2 transition duration-200 hover:bg-slate-50/80"
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
              <Link href={step.href} className={MARKETING_TEXT_LINK_CLASSES}>
                Learn more →
              </Link>
            </li>
          ))}
        </ol>
      </MarketingCard>
    </section>
  );
}
