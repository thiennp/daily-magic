import {
  AGENT_RUN_WAVE_PLAN_MARKER,
  AGENT_RUN_WAVE_STATUS_MARKER,
} from "@/lib/dispatch/agentRunWavePlan.constant";

/**
 * Marker line plus the wave lines under it (`W|…`, `A|…`, `<id>|<status>`).
 * Stops at the first other line so a final answer after the last wave block
 * survives (FAIL2: Reports showed only the raw plan, or nothing).
 */
const WAVE_BLOCK =
  /\[\[WAVE_(?:PLAN|STATUS)\]\][^\n]*(?:\n[^\S\n]*(?:[WA]\|[^\n]*|[\w.-]+\|(?:pending|working|done)\b[^\n]*))*/gi;

export const stripAgentRunWavePlanFromOutput = (output: string): string => {
  if (
    !output.includes(AGENT_RUN_WAVE_PLAN_MARKER) &&
    !output.includes(AGENT_RUN_WAVE_STATUS_MARKER)
  ) {
    return output;
  }

  return output
    .replace(WAVE_BLOCK, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};
