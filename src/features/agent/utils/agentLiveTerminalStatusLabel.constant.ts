import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";

export const AGENT_LIVE_TERMINAL_STATUS_LABEL: Record<
  AgentLiveTerminalStatus,
  string
> = {
  idle: "Idle",
  starting: "Starting…",
  waiting_approval: "Waiting for approval",
  streaming: "Live",
  stopping: "Stopping…",
  error: "Needs retry",
  finished: "Finished",
};
