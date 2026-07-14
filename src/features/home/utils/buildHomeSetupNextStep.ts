export type HomeSetupFlowStep = "install-mac" | "ready";

export interface HomeSetupFlowStepDefinition {
  readonly id: HomeSetupFlowStep;
  readonly label: string;
}

export const HOME_SETUP_FLOW_STEPS: readonly HomeSetupFlowStepDefinition[] = [
  { id: "install-mac", label: "Install on Mac" },
  { id: "ready", label: "Ready" },
];

export interface HomeSetupNextStep {
  readonly activeStep: HomeSetupFlowStep;
  readonly headline: string;
  readonly detail: string;
}

const buildHomeSetupNextStep = (input: {
  readonly hasPairedDevice: boolean;
}): HomeSetupNextStep => {
  if (!input.hasPairedDevice) {
    return {
      activeStep: "install-mac",
      headline: "Next: connect a Mac",
      detail:
        "Click Connect a Mac in Your Devices and run the install command on that computer. When install finishes, open Home — the browser links your account automatically while Agent Witch is running.",
    };
  }

  return {
    activeStep: "ready",
    headline: "Your Mac is connected",
    detail:
      "To add another Mac, click Connect another Mac in Your Devices. Use Your setup below for harness rules and sharing.",
  };
};

export default buildHomeSetupNextStep;
