"use client";

import AppAccentPanel from "@/components/surfaces/AppAccentPanel";
import { APP_SURFACE_SECTION_TITLE_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import useOnboardingSteps from "@/features/home/hooks/useOnboardingSteps";
import OnboardingStepStatusIcon from "@/features/home/OnboardingStepStatusIcon";

export default function HomeOnboardingChecklist() {
  const { steps } = useOnboardingSteps();

  if (steps.length === 0) {
    return null;
  }

  const completedCount = steps.filter((step) => step.done).length;

  if (completedCount === steps.length) {
    return null;
  }

  return (
    <AppAccentPanel>
      <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>
        Getting started ({completedCount}/{steps.length})
      </h2>
      <ul className="mt-4 space-y-3">
        {steps.map((step) => (
          <li key={step.id} className="flex items-center gap-3">
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
          </li>
        ))}
      </ul>
    </AppAccentPanel>
  );
}
