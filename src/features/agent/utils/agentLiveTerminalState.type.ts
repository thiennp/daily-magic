import type { AgentRunInputRequest } from "@/features/dispatch/utils/agentRunInputSocket";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export type AgentLiveTerminalStatus =
  "idle" | "starting" | "waiting_approval" | "streaming" | "finished";

export interface AgentLiveTerminalState {
  readonly activeRunId: string | null;
  readonly output: string;
  readonly status: AgentLiveTerminalStatus;
  readonly pendingInput: AgentRunInputRequest | null;
  readonly pendingCommandLine: string | null;
  readonly sessionWriterAgent: HarnessWriterAgent | null;
  readonly sessionDeviceId: string | null;
}

export const initialAgentLiveTerminalState = (): AgentLiveTerminalState => ({
  activeRunId: null,
  output: "",
  status: "idle",
  pendingInput: null,
  pendingCommandLine: null,
  sessionWriterAgent: null,
  sessionDeviceId: null,
});

export const beginAgentLiveTerminalSession = (
  commandLine: string,
  sessionWriterAgent: HarnessWriterAgent,
  sessionDeviceId: string | null = null,
): AgentLiveTerminalState => ({
  activeRunId: null,
  output: "",
  status: "starting",
  pendingInput: null,
  pendingCommandLine: commandLine,
  sessionWriterAgent,
  sessionDeviceId,
});

export const isAgentLiveTerminalSessionOpen = (
  state: AgentLiveTerminalState,
): boolean => state.sessionWriterAgent !== null;

export const shouldContinueAgentLiveTerminalThread = (
  state: AgentLiveTerminalState,
): boolean => isAgentLiveTerminalSessionOpen(state);

export const continueAgentLiveTerminalSession = (
  state: AgentLiveTerminalState,
  commandLine: string,
): AgentLiveTerminalState => ({
  activeRunId: null,
  output: state.output,
  status: "starting",
  pendingInput: null,
  pendingCommandLine: commandLine,
  sessionWriterAgent: state.sessionWriterAgent,
  sessionDeviceId: state.sessionDeviceId,
});

export const finishAgentLiveTerminalSession = (): AgentLiveTerminalState =>
  initialAgentLiveTerminalState();
