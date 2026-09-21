import { resolveAgentRunOutcomeFromWriterOutput } from "@agent-witch/shared/dispatch";

import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { formatHardStopOutcomeTerminalBlock } from "@/lib/dispatch/formatHardStopOutcomeTerminalBlock";

import { applySessionLimitHardStopToTerminalState } from "./applySessionLimitHardStopToTerminalState";
import type { AgentLiveTerminalState } from "./agentLiveTerminalState.type";
import { appendAgentLiveTerminalPrompt } from "./agentLiveTerminalPrompt.constant";
import {
  matchesActiveRun,
  mergeTerminalResultOutput,
} from "./agentLiveTerminalMessageUtils";

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
    const resultOutput =
      typeof payload.output === "string" ? payload.output : "";
    const mergedOutput = appendAgentLiveTerminalPrompt(
      mergeTerminalResultOutput(state.output, resultOutput),
    );
    const outcome = resolveAgentRunOutcomeFromWriterOutput(resultOutput);

    if (outcome !== null) {
      const banner = formatHardStopOutcomeTerminalBlock(outcome);

      return {
        ...state,
        output: `${mergedOutput}\n${banner}\n`,
        status: "error",
        pendingInput: null,
        pendingCommandLine: null,
      };
    }

    return {
      ...state,
      output: mergedOutput,
      status: "finished",
      pendingInput: null,
      pendingCommandLine: null,
    };
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
