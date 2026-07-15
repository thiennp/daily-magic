import {
  AgentRunStatus,
  type AgentRunStatusValue,
} from "@/lib/dispatch/AgentRunStatus.constant";

export const isTerminalAgentRunStatus = (
  status: AgentRunStatusValue,
): boolean =>
  status === AgentRunStatus.COMPLETED ||
  status === AgentRunStatus.FAILED ||
  status === AgentRunStatus.DENIED ||
  status === AgentRunStatus.EXPIRED;
