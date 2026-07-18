import type { AgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";

/** Persist mirror text for every restorable status, including mid-stream. */
export const shouldPersistAgentLiveTerminalOutput = (
  _status: AgentLiveTerminalState["status"],
): boolean => true;
