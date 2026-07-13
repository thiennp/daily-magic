import AppIcon from "@/components/ui/icon/AppIcon";
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
      <AppIcon
        icon={CheckCircleIcon}
        size="md"
        className="text-success-600"
      />
    );
  }

  return (
    <AppIcon
      icon={TimeIcon}
      size="md"
      className="text-gray-400 dark:text-gray-500"
    />
  );
}
