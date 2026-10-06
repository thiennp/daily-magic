"use client";

import { useState } from "react";

import AppPanel from "@/components/surfaces/AppPanel";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_CTA_SECONDARY_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import HomeSetupMiniBar from "@/features/home/HomeSetupMiniBar";
import useOnboardingSteps from "@/features/home/hooks/useOnboardingSteps";
import useOnboardingSetupAcknowledged from "@/features/home/hooks/useOnboardingSetupAcknowledged";
import OnboardingStepStatusIcon from "@/features/home/OnboardingStepStatusIcon";
import { listRequiredOnboardingSteps } from "@/features/home/utils/listRequiredOnboardingSteps";
import shouldShowOnboardingChecklist from "@/features/home/utils/shouldShowOnboardingChecklist";

/** Design Setup card. */
export default function HomeOnboardingChecklist() {
  const { steps } = useOnboardingSteps();
  const { isSetupAcknowledged } = useOnboardingSetupAcknowledged();
  const [isHidden, setIsHidden] = useState(false);
  if (!shouldShowOnboardingChecklist(steps, isSetupAcknowledged)) {
    return null;
  }

  const requiredSteps = listRequiredOnboardingSteps(steps);
  const done = requiredSteps.filter((step) => step.done).length;
  const allDone = done === requiredSteps.length && requiredSteps.length > 0;

  if (isHidden) {
    return (
      <HomeSetupMiniBar
        done={done}
        total={requiredSteps.length}
        allDone={allDone}
        onShow={() => setIsHidden(false)}
      />
    );
  }

  const progressWidth =
    requiredSteps.length === 0 ? "0%" : `${(done / requiredSteps.length) * 100}%`;

  return (
    <AppPanel as="section" aria-labelledby="home-setup-heading">
      <div className="flex items-start justify-between gap-3">
        <h2 id="home-setup-heading" className={APP_SURFACE_SECTION_TITLE_CLASS}>
          Setup{" "}
          <span
            className={`ml-2 align-middle text-sm font-normal ${
              allDone
                ? "font-medium text-emerald-700 dark:text-emerald-300"
                : APP_SURFACE_BODY_TEXT_CLASS
            }`}
          >
            {allDone ? "All done" : `${done} of ${requiredSteps.length}`}
          </span>
        </h2>
        <button
          type="button"
          className={APP_SURFACE_CTA_SECONDARY_CLASS}
          onClick={() => setIsHidden(true)}
        >
          Hide
        </button>
      </div>
      <div
        className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800"
        role="progressbar"
        aria-label="Setup progress"
        aria-valuemin={0}
        aria-valuemax={requiredSteps.length}
        aria-valuenow={done}
      >
        <i
          className={`block h-full rounded-full ${allDone ? "bg-emerald-500" : "bg-brand-600"}`}
          style={{ width: progressWidth }}
        />
      </div>
      <ol className="mt-4 space-y-3">
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
      </ol>
    </AppPanel>
  );
}
