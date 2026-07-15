import type { AgentRunInputRequest } from "@/features/dispatch/utils/agentRunInputSocket";

export type AgentLiveTerminalStatus =
  "idle" | "starting" | "waiting_approval" | "streaming" | "finished";

export interface AgentLiveTerminalState {
  readonly activeRunId: string | null;
  readonly output: string;
  readonly status: AgentLiveTerminalStatus;
  readonly pendingInput: AgentRunInputRequest | null;
  readonly pendingCommandLine: string | null;
}

export const initialAgentLiveTerminalState = (): AgentLiveTerminalState => ({
  activeRunId: null,
  output: "",
  status: "idle",
  pendingInput: null,
  pendingCommandLine: null,
});

export const beginAgentLiveTerminalSession = (
  commandLine: string,
): AgentLiveTerminalState => ({
  activeRunId: null,
  output: "",
  status: "starting",
  pendingInput: null,
  pendingCommandLine: commandLine,
});

export const shouldContinueAgentLiveTerminalThread = (
  state: AgentLiveTerminalState,
): boolean => state.output.length > 0;

export const continueAgentLiveTerminalSession = (
  state: AgentLiveTerminalState,
  commandLine: string,
): AgentLiveTerminalState => ({
  activeRunId: null,
  output: state.output,
  status: "starting",
  pendingInput: null,
  pendingCommandLine: commandLine,
});
