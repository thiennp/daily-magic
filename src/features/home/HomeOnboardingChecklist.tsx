"use client";

import { useEffect, useState } from "react";

import { useDemoPreview } from "@/features/demo/DemoPreviewContext";
import {
  loadOnboardingSteps,
  type OnboardingStep,
} from "@/features/home/loadOnboardingSteps";
import buildOnboardingStepStatusLabel from "@/features/home/utils/buildOnboardingStepStatusLabel";
import OnboardingStepStatusIcon from "@/features/home/OnboardingStepStatusIcon";

export default function HomeOnboardingChecklist() {
  const demoPreview = useDemoPreview();
  const [steps, setSteps] = useState<readonly OnboardingStep[]>(
    demoPreview?.onboardingSteps ?? [],
  );

  useEffect(() => {
    if (demoPreview) {
      return;
    }

    void loadOnboardingSteps().then(setSteps);
  }, [demoPreview]);

  if (steps.length === 0) {
    return null;
  }

  const completedCount = steps.filter((step) => step.done).length;

  if (completedCount === steps.length) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-brand-200 bg-brand-50/50 p-6 dark:border-brand-900/40 dark:bg-brand-950/20">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        Getting started ({completedCount}/{steps.length})
      </h2>
      <ul className="mt-4 space-y-3">
        {steps.map((step) => (
          <li key={step.id} className="flex items-center justify-between gap-3">
            <span className="flex min-w-0 items-center gap-3">
              <OnboardingStepStatusIcon step={step} />
              <span
                className={
                  step.done
                    ? "text-sm text-gray-500 line-through dark:text-gray-400"
                    : "text-sm text-gray-800 dark:text-white/90"
                }
              >
                {step.label}
              </span>
            </span>
            <span
              className={
                step.done
                  ? "text-xs font-medium text-success-600"
                  : "text-xs font-medium text-gray-500 dark:text-gray-400"
              }
            >
              {buildOnboardingStepStatusLabel(step)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
