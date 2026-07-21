import {
  AGENT_RUN_WAVE_PLAN_MARKER,
  AGENT_RUN_WAVE_STATUS_MARKER,
} from "@/lib/dispatch/agentRunWavePlan.constant";

const WAVE_BLOCK = /\[\[WAVE_(?:PLAN|STATUS)\]\][\s\S]*?(?=\n\[\[|$)/gi;

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
