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
    headline: "Create your first workflow or agent",
    detail:
      "Publish a workflow with form fields or a custom agent in Library. Teammates can request it once it is in your directory.",
    ctaLabel: "Open Library",
  },
  "create-workflow": {
    eyebrow: "Getting started",
    headline: "Create your first workflow or agent",
    detail:
      "Publish a workflow with form fields or a custom agent in Library. Teammates can request it once it is in your directory.",
    ctaLabel: "Open Library",
  },
  task: {
    eyebrow: "Getting started",
    headline: "Send your first task",
    detail:
      "Open the task composer from home, choose a workflow or prompt, and run it on your Mac. The full log lands in Job history.",
    ctaLabel: "Send a task",
  },
  "send-task": {
    eyebrow: "Getting started",
    headline: "Send your first task",
    detail:
      "Open the task composer from home, choose a workflow or prompt, and run it on your Mac. The full log lands in Job history.",
    ctaLabel: "Send a task",
  },
};
