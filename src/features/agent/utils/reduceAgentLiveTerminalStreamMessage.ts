import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

import type { AgentLiveTerminalState } from "./agentLiveTerminalState.type";
import { appendAgentLiveTerminalPrompt } from "./agentLiveTerminalPrompt.constant";
import { matchesActiveRun } from "./agentLiveTerminalMessageUtils";

export const reduceAgentLiveTerminalStreamMessage = (
  state: AgentLiveTerminalState,
  parsed: Record<string, unknown>,
  payload: Record<string, unknown>,
): AgentLiveTerminalState => {
  if (
    parsed.type === AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_CHUNK &&
    matchesActiveRun(state.activeRunId, payload)
  ) {
    const chunk = typeof payload.chunk === "string" ? payload.chunk : "";
    return {
      ...state,
      status: "streaming",
      output: `${state.output}${chunk}`,
    };
  }

  if (
    parsed.type === AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RESULT &&
    matchesActiveRun(state.activeRunId, payload)
  ) {
    const resultOutput =
      typeof payload.output === "string" ? payload.output : "";
    const streamedOutput =
      state.output.trim().length === 0 && resultOutput.length > 0
        ? resultOutput
        : state.output;

    return {
      ...state,
      output: appendAgentLiveTerminalPrompt(streamedOutput),
      status: "finished",
      pendingInput: null,
      pendingCommandLine: null,
    };
  }

  if (
    parsed.type === AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_END &&
    matchesActiveRun(state.activeRunId, payload) &&
    state.status === "streaming"
  ) {
    return {
      ...state,
      output: appendAgentLiveTerminalPrompt(state.output),
      status: "finished",
      pendingCommandLine: null,
    };
  }

  return state;
};
