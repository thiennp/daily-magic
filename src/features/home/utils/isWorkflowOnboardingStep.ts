const isWorkflowOnboardingStep = (stepId: string): boolean =>
  stepId === "workflow" || stepId === "create-workflow";

export default isWorkflowOnboardingStep;
