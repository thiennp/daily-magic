import type { AgentPairingStatus } from "@/features/harness/hooks/types/HarnessRequestResult.type";

export type HomeSetupFlowStep =
  "install-mac" | "link-account" | "pair-browser" | "ready";

export interface HomeSetupFlowStepDefinition {
  readonly id: HomeSetupFlowStep;
  readonly label: string;
}

export const HOME_SETUP_FLOW_STEPS: readonly HomeSetupFlowStepDefinition[] = [
  { id: "install-mac", label: "Install on Mac" },
  { id: "link-account", label: "Link to account" },
  { id: "pair-browser", label: "Pair this browser" },
  { id: "ready", label: "Ready" },
];

export interface HomeSetupNextStep {
  readonly activeStep: HomeSetupFlowStep;
  readonly headline: string;
  readonly detail: string;
}

const isBrowserPaired = (pairingStatus: AgentPairingStatus): boolean =>
  pairingStatus === "paired";

const buildHomeSetupNextStep = (input: {
  readonly hasPairedDevice: boolean;
  readonly pairingStatus: AgentPairingStatus;
}): HomeSetupNextStep => {
  if (!input.hasPairedDevice) {
    return {
      activeStep: "install-mac",
      headline: "Next: install Agent Witch on this Mac",
      detail:
        "Run the install command below in Terminal on this computer. When install finishes, open Home — the browser links your account automatically while Agent Witch is running.",
    };
  }

  if (!isBrowserPaired(input.pairingStatus)) {
    return {
      activeStep: "pair-browser",
      headline: "Next: pair this browser for rules and sharing",
      detail:
        "Your Mac is linked to your account. Copy the pairing token from your Agent Witch config (see below), paste it here, and click Save and pair. Sending tasks from Agent does not need this step.",
    };
  }

  return {
    activeStep: "ready",
    headline: "Your Mac and browser are connected",
    detail:
      "Send tasks from Agent, edit rules below, or adjust sharing and who can dispatch to your Mac.",
  };
};

export default buildHomeSetupNextStep;
