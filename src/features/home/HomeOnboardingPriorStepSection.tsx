import OnboardingStepStatusIcon from "@/features/home/OnboardingStepStatusIcon";
import type { OnboardingStep } from "@/features/home/loadOnboardingSteps";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

interface HomeOnboardingPriorStepSectionProps {
  readonly step: OnboardingStep;
}

export default function HomeOnboardingPriorStepSection({
  step,
}: HomeOnboardingPriorStepSectionProps) {
  return (
    <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-800">
      <div className="flex items-start gap-3">
        <OnboardingStepStatusIcon step={step} />
        <div>
          <p
            className={`text-sm font-medium ${
              step.done
                ? "text-gray-500 line-through dark:text-gray-400"
                : "text-gray-800 dark:text-white/90"
            }`}
          >
            {step.label}
          </p>
          {step.done ? (
            <p className={`mt-1 ${APP_SURFACE_BODY_TEXT_CLASS}`}>Completed</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
