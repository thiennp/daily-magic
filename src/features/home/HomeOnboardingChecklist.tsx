"use client";

import { useEffect, useState } from "react";

import AppAccentPanel from "@/components/surfaces/AppAccentPanel";
import { APP_SURFACE_SECTION_TITLE_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { useDemoPreview } from "@/features/demo/DemoPreviewContext";
import { useOptionalPairedDeviceContext } from "@/features/home/PairedDeviceContext";
import {
  loadOnboardingSteps,
  type OnboardingStep,
} from "@/features/home/loadOnboardingSteps";
import buildOnboardingStepStatusLabel from "@/features/home/utils/buildOnboardingStepStatusLabel";
import isConnectMacOnboardingStepDone from "@/features/home/utils/isConnectMacOnboardingStepDone";
import OnboardingStepStatusIcon from "@/features/home/OnboardingStepStatusIcon";

const ONBOARDING_STEPS_POLL_INTERVAL_MS = 5_000;

export default function HomeOnboardingChecklist() {
  const demoPreview = useDemoPreview();
  const pairedDeviceContext = useOptionalPairedDeviceContext();
  const hasPairedDevice = pairedDeviceContext?.hasPairedDevice ?? false;
  const [steps, setSteps] = useState<readonly OnboardingStep[]>(
    demoPreview?.onboardingSteps ?? [],
  );

  useEffect(() => {
    if (demoPreview) {
      return;
    }

    void loadOnboardingSteps().then(setSteps);
  }, [demoPreview]);

  useEffect(() => {
    if (demoPreview || !hasPairedDevice) {
      return;
    }

    void loadOnboardingSteps().then(setSteps);
  }, [demoPreview, hasPairedDevice]);

  const isConnectStepDone = isConnectMacOnboardingStepDone(steps);

  useEffect(() => {
    if (demoPreview || isConnectStepDone) {
      return;
    }

    const timer = setInterval(() => {
      void loadOnboardingSteps().then(setSteps);
    }, ONBOARDING_STEPS_POLL_INTERVAL_MS);

    return () => {
      clearInterval(timer);
    };
  }, [demoPreview, isConnectStepDone]);

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
    </AppAccentPanel>
  );
}
