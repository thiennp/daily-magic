import type { AgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";

export const shouldPersistAgentLiveTerminalOutput = (
  status: AgentLiveTerminalState["status"],
): boolean => status !== "starting" && status !== "streaming";
