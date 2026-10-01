import { isPromptSdlcTerminalStatus } from "../../../../adapters/promptSdlcAwcCore";

import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

export type PromptSdlcStopControlKind =
  "none" | "legacy_stop" | "wizard_end_only" | "wizard_module_interrupt";

/** Which stop control belongs in the This run panel (not wizard gates). */
export const readPromptSdlcStopControlKind = (
  cycle: PromptSdlcLocalCycle,
): PromptSdlcStopControlKind => {
  if (isPromptSdlcTerminalStatus(cycle.status)) {
    return "none";
  }
  const wizard = cycle.wizard;
  if (wizard === undefined) {
    return "legacy_stop";
  }
  if (cycle.status === "wizard_paused") {
    return "none";
  }
  if (wizard.phase === "optimize_modules" && wizard.gate === null) {
    return "wizard_module_interrupt";
  }
  return "wizard_end_only";
};
