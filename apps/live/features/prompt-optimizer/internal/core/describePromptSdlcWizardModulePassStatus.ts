import type { PromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";

export const isPromptSdlcWizardModulePassed = (
  module: PromptSdlcWizardState["modules"][number],
  modulePassScore: number,
): boolean =>
  module.status === "passed" &&
  (module.statistics?.bestScore ?? 0) >= modulePassScore;

/** Unmistakable module trial status for the outcome table. */
export const describePromptSdlcWizardModulePassStatus = (
  module: PromptSdlcWizardState["modules"][number],
  modulePassScore: number,
): string => {
  if (isPromptSdlcWizardModulePassed(module, modulePassScore)) {
    return "Passed";
  }
  if (module.status === "failed") {
    return "Failed";
  }
  if (module.status === "stopped") {
    return "Stopped";
  }
  if (module.status === "running") {
    return "Running";
  }
  if (module.status === "paused") {
    return "Paused";
  }
  if (module.status === "pending") {
    return "Pending";
  }
  const score = module.statistics?.bestScore;
  if (score !== null && score !== undefined && score < modulePassScore) {
    return `Below pass (${score})`;
  }
  return module.status;
};
