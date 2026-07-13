import type { OnboardingStep } from "@/features/home/loadOnboardingSteps";

const PENDING_STATUS_BY_STEP_ID: Readonly<Record<string, string>> = {
  pair: "Not connected",
  "connect-mac": "Not connected",
  group: "Not created",
  "create-team": "Not created",
  task: "Not started",
  "send-task": "Not started",
  "publish-assistant": "Not published",
};

const buildOnboardingStepStatusLabel = (step: OnboardingStep): string => {
  if (step.done) {
    return "Done";
  }

  return PENDING_STATUS_BY_STEP_ID[step.id] ?? "Pending";
};

export default buildOnboardingStepStatusLabel;
