import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

import type { AgentLiveTerminalState } from "./agentLiveTerminalState.type";
import { appendAgentLiveTerminalCommand } from "./agentLiveTerminalPrompt.constant";
import isHarnessWriterAgent from "@/lib/agentWitch/harness/isHarnessWriterAgent";

export const reduceAgentLiveTerminalWriterSessionReady = (
  state: AgentLiveTerminalState,
  payload: Record<string, unknown>,
): AgentLiveTerminalState => {
  const writerAgent = payload.writerAgent;
  if (
    !isHarnessWriterAgent(writerAgent) ||
    writerAgent !== state.sessionWriterAgent
  ) {
    return state;
  }

  const output =
    typeof payload.output === "string" ? payload.output : "Session ready.\n";
  const commandLine = state.pendingCommandLine ?? "";
  const nextOutput =
    commandLine.length > 0
      ? `${appendAgentLiveTerminalCommand(state.output, commandLine)}${output}`
      : `${state.output}${output}`;

  return {
    ...state,
    output: nextOutput,
    status: "finished",
    pendingInput: null,
    pendingCommandLine: null,
  };
};

export const isWriterSessionReadyMessage = (
  parsed: Record<string, unknown>,
): boolean =>
  parsed.type === AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_READY;
