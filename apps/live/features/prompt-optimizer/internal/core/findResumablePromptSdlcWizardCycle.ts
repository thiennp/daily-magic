import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

/** Most recent wizard run waiting on a step gate (not the cycle already open). */
export const findResumablePromptSdlcWizardCycle = (
  history: readonly PromptSdlcLocalCycle[],
  openCycleId: string | null,
): PromptSdlcLocalCycle | null => {
  for (const cycle of history) {
    if (cycle.wizard === undefined || cycle.status !== "wizard_paused") {
      continue;
    }
    if (openCycleId !== null && cycle.id === openCycleId) {
      continue;
    }
    return cycle;
  }
  return null;
};
