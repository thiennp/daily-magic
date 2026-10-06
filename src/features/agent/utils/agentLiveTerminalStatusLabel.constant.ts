import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import { AGENT_RUN_TIMED_OUT_COPY } from "@/features/reports/agentRunTimedOutCopy.constant";

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
  timed_out: AGENT_RUN_TIMED_OUT_COPY.statusLabel,
  finished: "Finished",
};
