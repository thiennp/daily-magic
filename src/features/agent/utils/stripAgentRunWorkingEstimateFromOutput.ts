import { AGENT_RUN_WORKING_ESTIMATE_MARKER } from "@/lib/dispatch/agentRunWorkingEstimate.constant";

const ESTIMATE_BLOCK = /\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)?\d*\s*/gi;

export const stripAgentRunWorkingEstimateFromOutput = (
  output: string,
): string => {
  if (!output.includes(AGENT_RUN_WORKING_ESTIMATE_MARKER)) {
    return output;
  }

  return output
    .replace(ESTIMATE_BLOCK, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};
