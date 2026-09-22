import {
  AGENT_LIVE_PROGRESS_EMPTY_ACTIVE_DETAIL,
  formatAgentLiveProgressSkippedDetail,
} from "@/features/agent/utils/agentLiveRunHonestyCopy.constant";
import type { AgentLiveRunOutcome } from "@/features/agent/utils/agentLiveRunOutcomeKind.type";

export type AgentLiveProgressHonestyStepState =
  "pending" | "active" | "done" | "skipped" | "failed" | "fallback";

export const resolveAgentLiveProgressWorkHonestyState = (input: {
  readonly workState: AgentLiveProgressHonestyStepState;
  readonly isFinished: boolean;
  readonly cleanedLength: number;
  readonly hasProgressUpdates: boolean;
  readonly outcome: AgentLiveRunOutcome;
}): AgentLiveProgressHonestyStepState => {
  if (
    input.workState !== "pending" &&
    input.workState !== "active" &&
    input.workState !== "done"
  ) {
    return input.workState;
  }

  if (
    input.outcome.kind === "degraded" &&
    (input.isFinished ||
      input.workState === "active" ||
      input.workState === "done")
  ) {
    return "fallback";
  }

  if (
    input.isFinished &&
    input.workState === "done" &&
    input.cleanedLength === 0 &&
    !input.hasProgressUpdates
  ) {
    return input.outcome.kind === "failed" ? "failed" : "skipped";
  }

  if (
    input.outcome.kind === "failed" &&
    input.isFinished &&
    input.workState === "done"
  ) {
    return "failed";
  }

  return input.workState;
};

export const resolveAgentLiveProgressWorkHonestyDetail = (input: {
  readonly state: AgentLiveProgressHonestyStepState;
  readonly existingDetail: string | null;
  readonly outcome: AgentLiveRunOutcome;
  readonly workLabel: string;
  readonly isActiveWithEmptyBody: boolean;
}): string | null => {
  if (input.state === "fallback" && input.outcome.kind === "degraded") {
    const summary = input.outcome.summaryLines[0] ?? "";
    const prefix = "Completed with fallback — ";
    return summary.startsWith(prefix)
      ? summary.slice(prefix.length)
      : "Used CLI fallback";
  }

  if (input.state === "skipped") {
    return formatAgentLiveProgressSkippedDetail({
      stepLabel: input.workLabel,
      reason: "No agent output was captured",
    });
  }

  if (input.isActiveWithEmptyBody) {
    return AGENT_LIVE_PROGRESS_EMPTY_ACTIVE_DETAIL;
  }

  return input.existingDetail;
};
