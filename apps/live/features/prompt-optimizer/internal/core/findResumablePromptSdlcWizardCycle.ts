import { isPromptSdlcTerminalStatus } from "../../../../adapters/promptSdlcAwcCore";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

/** Most recent in-progress wizard (paused or actively running), not the cycle already open. */
export const findResumablePromptSdlcWizardCycle = (
  history: readonly PromptSdlcLocalCycle[],
  openCycleId: string | null,
): PromptSdlcLocalCycle | null => {
  for (const cycle of history) {
    if (cycle.wizard === undefined) {
      continue;
    }
    if (isPromptSdlcTerminalStatus(cycle.status)) {
      continue;
    }
    if (openCycleId !== null && cycle.id === openCycleId) {
      continue;
    }
    return cycle;
  }
  return null;
};
