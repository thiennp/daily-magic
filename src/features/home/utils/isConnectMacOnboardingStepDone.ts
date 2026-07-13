interface ConnectMacOnboardingStep {
  readonly id: string;
  readonly done: boolean;
}

const isConnectMacOnboardingStepDone = (
  steps: ReadonlyArray<ConnectMacOnboardingStep>,
): boolean =>
  steps.some(
    (step) =>
      (step.id === "pair" || step.id === "connect-mac") && step.done === true,
  );

export default isConnectMacOnboardingStepDone;
