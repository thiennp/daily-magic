import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";
import type { AgentRunHonestyLiveStatus } from "@/lib/dispatch/agentRunHonestyOutcome.type";

export const mapAgentRunStatusToHonestyLiveStatus = (
  status: AgentRunStatusValue,
): AgentRunHonestyLiveStatus => {
  switch (status) {
    case AgentRunStatus.PENDING_APPROVAL:
      return "waiting_approval";
    case AgentRunStatus.RUNNING:
      return "streaming";
    case AgentRunStatus.FAILED:
    case AgentRunStatus.DENIED:
    case AgentRunStatus.EXPIRED:
      return "error";
    case AgentRunStatus.COMPLETED:
    default:
      return "finished";
  }
};
