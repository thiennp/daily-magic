import type { AgentRunInputRequest } from "@/features/dispatch/utils/agentRunInputSocket";
import {
  AGENT_LIVE_BASH_PROMPT,
  appendAgentLiveTerminalCommand,
  buildAgentLiveTerminalCommandEntry,
} from "@/features/agent/utils/agentLiveTerminalPrompt.constant";
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
  readonly sessionWriterSessionId: string | null;
}

export const initialAgentLiveTerminalState = (): AgentLiveTerminalState => ({
  activeRunId: null,
  output: "",
  status: "idle",
  pendingInput: null,
  pendingCommandLine: null,
  sessionWriterAgent: null,
  sessionDeviceId: null,
  sessionWriterSessionId: null,
});

export const beginAgentLiveTerminalSession = (
  commandLine: string,
  sessionWriterAgent: HarnessWriterAgent,
  sessionDeviceId: string | null = null,
): AgentLiveTerminalState => ({
  activeRunId: null,
  output: buildAgentLiveTerminalCommandEntry(commandLine),
  status: "starting",
  pendingInput: null,
  pendingCommandLine: commandLine,
  sessionWriterAgent,
  sessionDeviceId,
  sessionWriterSessionId: null,
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
): AgentLiveTerminalState => {
  const outputIncludesCommand =
    commandLine.length > 0 &&
    state.output.includes(`${AGENT_LIVE_BASH_PROMPT}${commandLine}`);
  const nextOutput =
    commandLine.length === 0
      ? state.output
      : outputIncludesCommand
        ? state.output
        : state.output.length === 0
          ? buildAgentLiveTerminalCommandEntry(commandLine)
          : appendAgentLiveTerminalCommand(state.output, commandLine);

  return {
    activeRunId: null,
    output: nextOutput,
    status: "starting",
    pendingInput: null,
    pendingCommandLine: commandLine,
    sessionWriterAgent: state.sessionWriterAgent,
    sessionDeviceId: state.sessionDeviceId,
    sessionWriterSessionId: null,
  };
};

export const finishAgentLiveTerminalSession = (): AgentLiveTerminalState =>
  initialAgentLiveTerminalState();
