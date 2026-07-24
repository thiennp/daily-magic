import { AGENT_RUN_WORKING_ESTIMATE_MARKER } from "./agentRunWorkingEstimate.constant";

const ESTIMATE_BLOCK = /\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi;

/** Latest positive working-estimate seconds from agent output, or null. */
export const parseAgentRunWorkingEstimateSeconds = (
  output: string,
): number | null => {
  if (!output.includes(AGENT_RUN_WORKING_ESTIMATE_MARKER)) {
    return null;
  }

  let latest: number | null = null;
  for (const match of output.matchAll(ESTIMATE_BLOCK)) {
    const seconds = Number.parseInt(match[1] ?? "", 10);
    if (Number.isFinite(seconds) && seconds > 0) {
      latest = seconds;
    }
  }

  return latest;
};
