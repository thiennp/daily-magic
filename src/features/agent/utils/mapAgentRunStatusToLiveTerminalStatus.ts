import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";

export const mapAgentRunStatusToLiveTerminalStatus = (
  status: AgentRunStatusValue,
): AgentLiveTerminalStatus => {
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
