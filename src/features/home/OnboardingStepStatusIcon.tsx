import type { OnboardingStep } from "@/features/home/loadOnboardingSteps";
import { CheckCircleIcon, TimeIcon } from "@/icons";

interface OnboardingStepStatusIconProps {
  readonly step: OnboardingStep;
}

export default function OnboardingStepStatusIcon({
  step,
}: OnboardingStepStatusIconProps) {
  if (step.done) {
    return (
      <CheckCircleIcon
        aria-hidden="true"
        className="h-5 w-5 shrink-0 text-success-600"
      />
    );
  }

  return (
    <TimeIcon
      aria-hidden="true"
      className="h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500"
    />
  );
}
