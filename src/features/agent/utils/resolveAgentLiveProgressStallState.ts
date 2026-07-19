import {
  AGENT_LIVE_PROGRESS_STALL_STUCK_MS,
  AGENT_LIVE_PROGRESS_STALL_WARNING_MS,
} from "@/features/agent/utils/agentLiveProgressStall.constant";

export type AgentLiveProgressStallState = "none" | "warning" | "stuck";

export const resolveAgentLiveProgressStallState = (input: {
  readonly isWorking: boolean;
  readonly msSinceLastActivity: number | null;
}): AgentLiveProgressStallState => {
  if (!input.isWorking || input.msSinceLastActivity === null) {
    return "none";
  }

  if (input.msSinceLastActivity >= AGENT_LIVE_PROGRESS_STALL_STUCK_MS) {
    return "stuck";
  }

  if (input.msSinceLastActivity >= AGENT_LIVE_PROGRESS_STALL_WARNING_MS) {
    return "warning";
  }

  return "none";
};
