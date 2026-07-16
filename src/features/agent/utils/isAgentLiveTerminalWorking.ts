import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";

export const isAgentLiveTerminalWorking = (
  status: AgentLiveTerminalStatus,
): boolean =>
  status === "starting" ||
  status === "streaming" ||
  status === "waiting_approval";
