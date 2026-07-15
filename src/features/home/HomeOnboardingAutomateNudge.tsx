"use client";

import Link from "next/link";

import AppAccentPanel from "@/components/surfaces/AppAccentPanel";
import {
  APP_SURFACE_SECTION_TITLE_CLASS,
  APP_SURFACE_TEXT_LINK_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import useOnboardingSteps from "@/features/home/hooks/useOnboardingSteps";
import isOnboardingAutomateStep from "@/features/home/utils/isOnboardingAutomateStep";
import { listRequiredOnboardingSteps } from "@/features/home/utils/listRequiredOnboardingSteps";

export default function HomeOnboardingAutomateNudge() {
  const { steps } = useOnboardingSteps();
  const requiredSteps = listRequiredOnboardingSteps(steps);
  const automateStep = steps.find((step) => isOnboardingAutomateStep(step.id));

  if (
    requiredSteps.length === 0 ||
    automateStep === undefined ||
    automateStep.done
  ) {
    return null;
  }

  const requiredComplete = requiredSteps.every((step) => step.done);

  if (!requiredComplete) {
    return null;
  }

  return (
    <AppAccentPanel className="mt-4">
      <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>Optional next step</h2>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
        Run the same workflow on a schedule — hourly, daily, or weekdays — on
        your Mac.
      </p>
      <Link
        href="/automations"
        className={`mt-3 inline-block ${APP_SURFACE_TEXT_LINK_CLASS}`}
      >
        Open Automations →
      </Link>
    </AppAccentPanel>
  );
}
