import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

/** Same transition as wizard-continue from the evaluate gate. */
export const beginPromptSdlcWizardSeparateAfterEvaluate = (
  cycle: PromptSdlcLocalCycle,
): PromptSdlcLocalCycle => {
  const wizard = cycle.wizard;
  if (wizard === undefined) {
    return cycle;
  }
  return {
    ...cycle,
    status: "judging",
    judgePromptTextOnly: false,
    errorMessage: null,
    wizard: {
      ...wizard,
      gate: null,
      phase: "separate",
      splitOptions: [],
    },
    updatedAt: new Date().toISOString(),
  };
};
