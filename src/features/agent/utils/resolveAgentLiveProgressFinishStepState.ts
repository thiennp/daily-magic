import type { AgentLiveRunOutcome } from "@/features/agent/utils/agentLiveRunOutcomeKind.type";

export const resolveAgentLiveProgressFinishStepState = (input: {
  readonly isFinished: boolean;
  readonly outcome: AgentLiveRunOutcome;
}): "pending" | "done" | "failed" | "fallback" => {
  if (!input.isFinished) {
    return "pending";
  }
  if (input.outcome.kind === "passed") {
    return "done";
  }
  if (input.outcome.kind === "degraded") {
    return "fallback";
  }
  if (input.outcome.kind === "failed") {
    return "failed";
  }
  return "pending";
};
