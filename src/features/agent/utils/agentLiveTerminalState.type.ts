import type { AgentRunInputRequest } from "@/features/dispatch/utils/agentRunInputSocket";

export type AgentLiveTerminalStatus =
  "idle" | "starting" | "waiting_approval" | "streaming" | "finished";

export interface AgentLiveTerminalState {
  readonly activeRunId: string | null;
  readonly output: string;
  readonly status: AgentLiveTerminalStatus;
  readonly pendingInput: AgentRunInputRequest | null;
}

export const initialAgentLiveTerminalState = (): AgentLiveTerminalState => ({
  activeRunId: null,
  output: "",
  status: "idle",
  pendingInput: null,
});

export const beginAgentLiveTerminalSession = (): AgentLiveTerminalState => ({
  activeRunId: null,
  output: "$ waiting for your Mac…\n",
  status: "starting",
  pendingInput: null,
});
