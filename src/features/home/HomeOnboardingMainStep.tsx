"use client";

import Link from "next/link";

import AppHero from "@/components/surfaces/AppHero";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_CTA_PRIMARY_CLASS,
  APP_SURFACE_EYEBROW_TEXT_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import type { HomeOnboardingMainStepContent } from "@/features/home/constants/homeOnboardingMainStepContent.constant";
import HomeOnboardingPriorStepSection from "@/features/home/HomeOnboardingPriorStepSection";
import type { OnboardingStep } from "@/features/home/loadOnboardingSteps";
import { resolveOnboardingStepHref } from "@/features/home/resolveOnboardingStepHref";

interface HomeOnboardingMainStepProps {
  readonly step: OnboardingStep;
  readonly content: HomeOnboardingMainStepContent;
  readonly priorStep?: OnboardingStep;
}

export default function HomeOnboardingMainStep({
  step,
  content,
  priorStep,
}: HomeOnboardingMainStepProps) {
  return (
    <AppHero variant="neutral">
      <p className={APP_SURFACE_EYEBROW_TEXT_CLASS}>{content.eyebrow}</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white/90">
        {content.headline}
      </h1>
      <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>{content.detail}</p>
      <div className="mt-6">
        <Link
          href={resolveOnboardingStepHref(step.href)}
          className={APP_SURFACE_CTA_PRIMARY_CLASS}
        >
          {content.ctaLabel}
        </Link>
      </div>
      {priorStep ? <HomeOnboardingPriorStepSection step={priorStep} /> : null}
    </AppHero>
  );
}
