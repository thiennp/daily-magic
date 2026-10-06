export const ONBOARDING_STEP_IDS = [
  "project",
  "machine",
  "bot",
  "task",
] as const;

export type OnboardingStepId = (typeof ONBOARDING_STEP_IDS)[number];

/** Visible progress labels — Product EN HARD: Assistant not Bot. */
export const ONBOARDING_STEP_LABELS: Readonly<
  Record<OnboardingStepId, string>
> = {
  project: "Project",
  machine: "Computer",
  bot: "Assistant",
  task: "Task",
};

export const ONBOARDING_STEP_ORDER: Readonly<
  Record<OnboardingStepId, number>
> = {
  project: 1,
  machine: 2,
  bot: 3,
  task: 4,
};
