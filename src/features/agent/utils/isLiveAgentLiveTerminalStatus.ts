import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";

/**
 * ed42d8ce: only a session with a run actually going holds the computer and
 * coding-tool pick. Finished / failed / timed-out / idle never lock.
 */
export const isLiveAgentLiveTerminalStatus = (
  status: AgentLiveTerminalStatus,
): boolean =>
  status === "starting" ||
  status === "streaming" ||
  status === "waiting_approval" ||
  status === "stopping";
