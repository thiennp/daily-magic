"use client";

import AppAccentPanel from "@/components/surfaces/AppAccentPanel";
import { APP_SURFACE_SECTION_TITLE_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import useOnboardingSteps from "@/features/home/hooks/useOnboardingSteps";
import useOnboardingSetupAcknowledged from "@/features/home/hooks/useOnboardingSetupAcknowledged";
import OnboardingStepStatusIcon from "@/features/home/OnboardingStepStatusIcon";
import { listRequiredOnboardingSteps } from "@/features/home/utils/listRequiredOnboardingSteps";
import shouldShowOnboardingChecklist from "@/features/home/utils/shouldShowOnboardingChecklist";

export default function HomeOnboardingChecklist() {
  const { steps } = useOnboardingSteps();
  const { isSetupAcknowledged } = useOnboardingSetupAcknowledged();

  if (!shouldShowOnboardingChecklist(steps, isSetupAcknowledged)) {
    return null;
  }

  const requiredSteps = listRequiredOnboardingSteps(steps);
  const completedRequiredCount = requiredSteps.filter(
    (step) => step.done,
  ).length;

  return (
    <AppAccentPanel>
      <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>
        Getting started ({completedRequiredCount}/{requiredSteps.length})
      </h2>
      <ul className="mt-4 space-y-3">
        {requiredSteps.map((step) => (
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
