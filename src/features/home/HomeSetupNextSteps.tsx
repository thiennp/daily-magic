"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import useHomeConnectedMacs from "@/features/home/hooks/useHomeConnectedMacs";
import buildHomeSetupNextStep, {
  HOME_SETUP_FLOW_STEPS,
} from "@/features/home/utils/buildHomeSetupNextStep";

export default function HomeSetupNextSteps() {
  const { devices, isLoading } = useHomeConnectedMacs();
  const hasPairedDevice = !isLoading && devices.length > 0;
  const nextStep = buildHomeSetupNextStep({ hasPairedDevice });
  const activeStepIndex = HOME_SETUP_FLOW_STEPS.findIndex(
    (step) => step.id === nextStep.activeStep,
  );

  return (
    <AppPanel
      as="section"
      padding="compact"
      className="border-brand-200 bg-brand-50 text-left dark:border-brand-500/30 dark:bg-brand-500/10"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-300">
        What to do next
      </p>
      <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white/90">
        {nextStep.headline}
      </p>
      <p className={`mt-2 ${APP_SURFACE_BODY_TEXT_CLASS}`}>{nextStep.detail}</p>

      <ol className="mt-4 flex flex-wrap gap-2">
        {HOME_SETUP_FLOW_STEPS.map((step, index) => {
          const isActive = index === activeStepIndex;
          const isComplete = index < activeStepIndex;

          return (
            <li
              key={step.id}
              className={
                isActive
                  ? "rounded-full bg-brand-500 px-3 py-1 text-xs font-medium text-white"
                  : isComplete
                    ? "rounded-full bg-success-100 px-3 py-1 text-xs font-medium text-success-700 dark:bg-success-500/15 dark:text-success-400"
                    : "rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-900 dark:text-gray-400"
              }
            >
              {step.label}
            </li>
          );
        })}
      </ol>
    </AppPanel>
  );
}
