import type { PromptSdlcWizardChainPriorOutput } from "../../../../adapters/promptSdlcAwcCore";

export const describePromptSdlcWizardChainPriorHandoff = (
  prior: PromptSdlcWizardChainPriorOutput,
): string => {
  if (prior.output !== null) {
    return prior.output;
  }
  if (prior.nullReason === "not-chain") {
    return "Parallel split: modules do not receive prior output.";
  }
  if (prior.nullReason === "first-module") {
    return "First module in the chain: no prior output.";
  }
  if (prior.nullReason === "prior-skipped") {
    return "Prior module was skipped; no chain handoff.";
  }
  if (prior.nullReason === "prior-no-output") {
    return "Prior module finished without runner output.";
  }
  if (prior.nullReason === "prior-missing") {
    return "Prior module is missing from this split.";
  }
  return "No prior output.";
};
