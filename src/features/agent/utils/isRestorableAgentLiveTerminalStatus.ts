import type { AgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";

export const isRestorableAgentLiveTerminalStatus = (
  status: AgentLiveTerminalState["status"],
): boolean =>
  status === "starting" ||
  status === "waiting_approval" ||
  status === "streaming" ||
  status === "finished";
