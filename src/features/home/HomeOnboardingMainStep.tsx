"use client";

import Link from "next/link";

import AppHero from "@/components/surfaces/AppHero";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_CTA_PRIMARY_CLASS,
  APP_SURFACE_EYEBROW_TEXT_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import type { HomeOnboardingMainStepContent } from "@/features/home/constants/homeOnboardingMainStepContent.constant";
import type { OnboardingStep } from "@/features/home/loadOnboardingSteps";
import { resolveOnboardingStepHref } from "@/features/home/resolveOnboardingStepHref";
import { useAppPath } from "@/features/demo/DemoPreviewContext";

interface HomeOnboardingMainStepProps {
  readonly step: OnboardingStep;
  readonly content: HomeOnboardingMainStepContent;
}

export default function HomeOnboardingMainStep({
  step,
  content,
}: HomeOnboardingMainStepProps) {
  const appPath = useAppPath();

  return (
    <AppHero variant="neutral">
      <p className={APP_SURFACE_EYEBROW_TEXT_CLASS}>{content.eyebrow}</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white/90">
        {content.headline}
      </h1>
      <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>{content.detail}</p>
      <div className="mt-6">
        <Link
          href={resolveOnboardingStepHref(step.href, appPath)}
          className={APP_SURFACE_CTA_PRIMARY_CLASS}
        >
          {content.ctaLabel}
        </Link>
      </div>
    </AppHero>
  );
}
