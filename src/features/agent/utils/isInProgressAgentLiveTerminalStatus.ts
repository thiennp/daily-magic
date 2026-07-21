import type { AgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";

/** In-flight sessions that should survive a full page refresh (AGENT-048). */
export const isInProgressAgentLiveTerminalStatus = (
  status: AgentLiveTerminalState["status"],
): boolean =>
  status === "starting" ||
  status === "waiting_approval" ||
  status === "streaming" ||
  status === "error";
