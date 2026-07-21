import {
  AGENT_LIVE_PROGRESS_STALL_WARNING_MS,
  AGENT_LIVE_PROGRESS_STALL_STUCK_MS,
} from "@/features/agent/utils/agentLiveProgressStall.constant";
import { AGENT_LIVE_PROGRESS_ESTIMATE_FALLBACK_STUCK_MS } from "@/features/agent/utils/agentLiveWorkingEstimate.constant";
import { resolveAgentLiveWorkingEstimateProgress } from "@/features/agent/utils/resolveAgentLiveWorkingEstimateProgress";

export type AgentLiveProgressStallState = "none" | "warning" | "stuck";

export const resolveAgentLiveProgressStallState = (input: {
  readonly isWorking: boolean;
  readonly msSinceLastActivity: number | null;
  readonly workedMs?: number | null;
  readonly estimateSeconds?: number | null;
}): AgentLiveProgressStallState => {
  if (!input.isWorking) {
    return "none";
  }

  const workedMs = input.workedMs ?? null;
  const estimateSeconds = input.estimateSeconds ?? null;

  if (estimateSeconds !== null && estimateSeconds > 0 && workedMs !== null) {
    const estimateProgress = resolveAgentLiveWorkingEstimateProgress({
      estimateSeconds,
      workedMs,
    });
    if (estimateProgress.isExceeded) {
      return "stuck";
    }
  } else if (
    workedMs !== null &&
    workedMs >= AGENT_LIVE_PROGRESS_ESTIMATE_FALLBACK_STUCK_MS
  ) {
    return "stuck";
  } else if (
    input.msSinceLastActivity !== null &&
    input.msSinceLastActivity >= AGENT_LIVE_PROGRESS_STALL_STUCK_MS &&
    estimateSeconds === null
  ) {
    // Keep AGENT-038 silence stuck only while still waiting for an estimate.
    return "stuck";
  }

  if (
    input.msSinceLastActivity !== null &&
    input.msSinceLastActivity >= AGENT_LIVE_PROGRESS_STALL_WARNING_MS
  ) {
    return "warning";
  }

  return "none";
};
