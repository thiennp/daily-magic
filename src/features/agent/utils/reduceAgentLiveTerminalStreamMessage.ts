import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

import { applySessionLimitHardStopToTerminalState } from "./applySessionLimitHardStopToTerminalState";
import type { AgentLiveTerminalState } from "./agentLiveTerminalState.type";
import { appendAgentLiveTerminalPrompt } from "./agentLiveTerminalPrompt.constant";
import { matchesActiveRun } from "./agentLiveTerminalMessageUtils";
import { reduceAgentLiveTerminalResultMessage } from "./reduceAgentLiveTerminalResultMessage";

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
    const nextOutput = `${state.output}${chunk}`;
    const hardStop = applySessionLimitHardStopToTerminalState(
      { ...state, output: nextOutput },
      nextOutput,
    );
    if (hardStop !== null) {
      return hardStop;
    }

    return {
      ...state,
      status: "streaming",
      output: nextOutput,
    };
  }

  if (
    parsed.type === AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RESULT &&
    matchesActiveRun(state.activeRunId, payload)
  ) {
    return reduceAgentLiveTerminalResultMessage(state, payload);
  }

  if (
    parsed.type === AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_END &&
    matchesActiveRun(state.activeRunId, payload) &&
    (state.status === "streaming" || state.status === "stopping")
  ) {
    const hardStop = applySessionLimitHardStopToTerminalState(
      state,
      state.output,
    );
    if (hardStop !== null) {
      return hardStop;
    }

    return {
      ...state,
      output: appendAgentLiveTerminalPrompt(state.output),
      status: "finished",
      pendingCommandLine: null,
    };
  }

  if (
    parsed.type === AGENT_WITCH_MESSAGE_TYPES.SHELL_DATA &&
    typeof payload.chunk === "string" &&
    payload.chunk.length > 0 &&
    (state.activeRunId !== null || state.sessionWriterAgent !== null)
  ) {
    return {
      ...state,
      status: "streaming",
      output: `${state.output}${payload.chunk}`,
    };
  }

  return state;
};
