import { PROMPT_SDLC_WIZARD_STOP_USER } from "../../../../adapters/promptSdlcAwcCore";

import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { abortPromptSdlcLocalCycleWriters } from "./stopPromptSdlcLocalCycle";

export const stopPromptSdlcWizardRun = (
  cycle: PromptSdlcLocalCycle,
): PromptSdlcLocalCycle => {
  abortPromptSdlcLocalCycleWriters(cycle.id);
  return {
    ...cycle,
    status: "stopped",
    errorMessage: PROMPT_SDLC_WIZARD_STOP_USER,
    wizard:
      cycle.wizard === undefined
        ? undefined
        : {
            ...cycle.wizard,
            gate: null,
            phase: "complete",
          },
    updatedAt: new Date().toISOString(),
  };
};

export const skipPromptSdlcWizardCurrentModule = (
  cycle: PromptSdlcLocalCycle,
): PromptSdlcLocalCycle => {
  const wizard = cycle.wizard;
  if (wizard === undefined || wizard.phase !== "optimize_modules") {
    return cycle;
  }
  abortPromptSdlcLocalCycleWriters(cycle.id);
  const index = wizard.currentModuleIndex;
  const modules = wizard.modules.map((item, moduleIndex) =>
    moduleIndex === index ? { ...item, status: "stopped" as const } : item,
  );
  return {
    ...cycle,
    status: "wizard_paused",
    errorMessage: null,
    wizard: {
      ...wizard,
      modules,
      gate: "optimize_modules",
    },
    updatedAt: new Date().toISOString(),
  };
};
