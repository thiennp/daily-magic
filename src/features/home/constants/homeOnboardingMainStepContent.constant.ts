export interface HomeOnboardingMainStepContent {
  readonly eyebrow: string;
  readonly headline: string;
  readonly detail: string;
  readonly ctaLabel: string;
}

export const HOME_ONBOARDING_MAIN_STEP_CONTENT: Readonly<
  Record<string, HomeOnboardingMainStepContent>
> = {
  workflow: {
    eyebrow: "Getting started",
    headline: "Save a playbook",
    detail:
      "Publish a workflow or custom agent in Playbooks so you and teammates can reuse how work gets done.",
    ctaLabel: "Open Playbooks",
  },
  "create-workflow": {
    eyebrow: "Getting started",
    headline: "Save a playbook",
    detail:
      "Publish a workflow or custom agent in Playbooks so you and teammates can reuse how work gets done.",
    ctaLabel: "Open Playbooks",
  },
  task: {
    eyebrow: "Getting started",
    headline: "Send your first task",
    detail:
      "Describe what you want done and your Mac runs the job. Watch live output and find the full log in Runs.",
    ctaLabel: "New task",
  },
  "send-task": {
    eyebrow: "Getting started",
    headline: "Send your first task",
    detail:
      "Describe what you want done and your Mac runs the job. Watch live output and find the full log in Runs.",
    ctaLabel: "New task",
  },
};
