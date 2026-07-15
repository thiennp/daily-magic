const isTaskOnboardingStep = (stepId: string): boolean =>
  stepId === "task" || stepId === "send-task";

export default isTaskOnboardingStep;
