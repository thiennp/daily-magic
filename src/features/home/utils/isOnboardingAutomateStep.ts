const isOnboardingAutomateStep = (stepId: string): boolean =>
  stepId === "automate" || stepId === "schedule-workflow";

export default isOnboardingAutomateStep;
