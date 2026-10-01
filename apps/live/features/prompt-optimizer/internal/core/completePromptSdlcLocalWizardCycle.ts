import { markPromptSdlcWizardRunComplete } from "../../../../adapters/promptSdlcAwcCore";

import { PROMPT_SDLC_MANUAL_ACTOR } from "./choosePromptSdlcLocalModels";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

export const completePromptSdlcLocalWizardCycle = (
  cycle: PromptSdlcLocalCycle,
  status: "passed" | "stopped",
): PromptSdlcLocalCycle => {
  const wizard = cycle.wizard;
  if (wizard === undefined) {
    return {
      ...cycle,
      status,
      updatedAt: new Date().toISOString(),
    };
  }
  return {
    ...cycle,
    status,
    wizard: markPromptSdlcWizardRunComplete(
      wizard,
      cycle.judgeModel === PROMPT_SDLC_MANUAL_ACTOR,
    ),
    updatedAt: new Date().toISOString(),
  };
};
