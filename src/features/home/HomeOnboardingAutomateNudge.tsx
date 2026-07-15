"use client";

import Link from "next/link";

import AppAccentPanel from "@/components/surfaces/AppAccentPanel";
import {
  APP_SURFACE_SECTION_TITLE_CLASS,
  APP_SURFACE_TEXT_LINK_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import useOnboardingSteps from "@/features/home/hooks/useOnboardingSteps";
import useOnboardingSetupAcknowledged from "@/features/home/hooks/useOnboardingSetupAcknowledged";
import shouldShowOnboardingAutomateNudge from "@/features/home/utils/shouldShowOnboardingAutomateNudge";

export default function HomeOnboardingAutomateNudge() {
  const { steps } = useOnboardingSteps();
  const { isSetupAcknowledged } = useOnboardingSetupAcknowledged();

  if (!shouldShowOnboardingAutomateNudge(steps, isSetupAcknowledged)) {
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
