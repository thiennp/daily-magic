import type { OnboardingStepId } from "@/features/onboarding/onboardingSteps.constant";

const STEP_PATH: Readonly<Record<OnboardingStepId, string>> = {
  project: "/onboarding/project",
  machine: "/onboarding/machine",
  bot: "/onboarding/bot",
  task: "/onboarding/task",
};

/** project → machine → bot → task. Later steps need projectId. */
export const buildOnboardingStepHref = (
  step: OnboardingStepId,
  projectId: string | null,
): string | null => {
  if (step === "project") {
    return STEP_PATH.project;
  }
  if (projectId === null || projectId.length === 0) {
    return null;
  }
  const q = new URLSearchParams({ projectId });
  return `${STEP_PATH[step]}?${q.toString()}`;
};

export const buildOnboardingProjectChatHref = (projectId: string): string =>
  `/projects/${encodeURIComponent(projectId)}?chat=1`;
