import type { AgentRunInputRequest } from "@/features/dispatch/utils/agentRunInputSocket";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

import type { AgentLiveTerminalState } from "./agentLiveTerminalState.type";
import { appendAgentLiveTerminalCommandIfMissing } from "./agentLiveTerminalPrompt.constant";
import { matchesActiveRun, readRunId } from "./agentLiveTerminalMessageUtils";
import { reduceAgentLiveTerminalApprovalMessage } from "./reduceAgentLiveTerminalApprovalMessage";
import {
  isWriterSessionChunkMessage,
  reduceAgentLiveTerminalWriterSessionChunk,
} from "./reduceAgentLiveTerminalWriterSessionChunk";
import {
  isWriterSessionReadyMessage,
  reduceAgentLiveTerminalWriterSessionReady,
} from "./reduceAgentLiveTerminalWriterSessionReady";

export const reduceAgentLiveTerminalControlMessage = (
  state: AgentLiveTerminalState,
  parsed: Record<string, unknown>,
  payload: Record<string, unknown>,
): AgentLiveTerminalState => {
  if (isWriterSessionReadyMessage(parsed)) {
    return reduceAgentLiveTerminalWriterSessionReady(state, payload);
  }

  if (isWriterSessionChunkMessage(parsed)) {
    return reduceAgentLiveTerminalWriterSessionChunk(state, payload);
  }

  if (parsed.type === AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK) {
    const writerSessionId =
      typeof payload.writerSessionId === "string"
        ? payload.writerSessionId
        : null;

    if (payload.started === true && writerSessionId !== null) {
      return {
        ...state,
        sessionWriterSessionId: writerSessionId,
      };
    }

    const runId = readRunId(payload);
    if (runId === null) {
      return state;
    }

    if (payload.pendingApproval === true) {
      const commandLine = state.pendingCommandLine ?? "";
      return {
        ...state,
        activeRunId: runId,
        output: appendAgentLiveTerminalCommandIfMissing(
          state.output,
          commandLine,
        ),
        status: "waiting_approval",
        pendingInput: null,
        pendingCommandLine: null,
      };
    }

    if (payload.dispatched === true) {
      const commandLine = state.pendingCommandLine ?? "";
      return {
        ...state,
        activeRunId: runId,
        output: appendAgentLiveTerminalCommandIfMissing(
          state.output,
          commandLine,
        ),
        status: "streaming",
        pendingInput: null,
        pendingCommandLine: null,
      };
    }
  }

  if (
    parsed.type === AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_INPUT_REQUIRED &&
    matchesActiveRun(state.activeRunId, payload)
  ) {
    const question =
      typeof payload.question === "string" ? payload.question : "";
    if (question.length === 0) {
      return state;
    }

    return {
      ...state,
      pendingInput: {
        agentRunId: state.activeRunId ?? "",
        question,
        partialOutput:
          typeof payload.partialOutput === "string"
            ? payload.partialOutput
            : "",
      } satisfies AgentRunInputRequest,
      pendingCommandLine: state.pendingCommandLine,
    };
  }

  const afterApproval = reduceAgentLiveTerminalApprovalMessage(
    state,
    parsed,
    payload,
  );

  return afterApproval === state ? state : afterApproval;
};
