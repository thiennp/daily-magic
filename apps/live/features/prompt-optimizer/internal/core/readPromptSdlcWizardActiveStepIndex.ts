import {
  isPromptSdlcTerminalStatus,
  PROMPT_SDLC_WIZARD_GATE_PHASES,
  type PromptSdlcWizardGatePhase,
} from "../../../../adapters/promptSdlcAwcCore";

import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

const gatePhaseIndex = (gate: PromptSdlcWizardGatePhase): number =>
  PROMPT_SDLC_WIZARD_GATE_PHASES.indexOf(gate);

/** Index of the wizard step row that should be active (0–3), or 4 when all gates are done. */
export const readPromptSdlcWizardActiveStepIndex = (
  cycle: PromptSdlcLocalCycle,
): number | null => {
  const wizard = cycle.wizard;
  if (wizard === undefined) {
    return null;
  }
  if (wizard.phase === "complete" || isPromptSdlcTerminalStatus(cycle.status)) {
    return PROMPT_SDLC_WIZARD_GATE_PHASES.length;
  }
  if (wizard.gate !== null) {
    return gatePhaseIndex(wizard.gate);
  }
  if (cycle.status === "wizard_paused") {
    return null;
  }
  if (
    wizard.phase === "generalize" ||
    wizard.phase === "evaluate" ||
    wizard.phase === "separate" ||
    wizard.phase === "optimize_modules"
  ) {
    return gatePhaseIndex(wizard.phase);
  }
  return null;
};

export const readPromptSdlcWizardCompletedStepIds = (
  cycle: PromptSdlcLocalCycle,
): readonly string[] => {
  const active = readPromptSdlcWizardActiveStepIndex(cycle);
  if (active === null || active <= 0) {
    return [];
  }
  return PROMPT_SDLC_WIZARD_GATE_PHASES.slice(0, active).map(
    (_, index) => `wizard-${index + 1}`,
  );
};
