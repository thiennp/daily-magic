import { appendAgentLiveTerminalPrompt } from "@/features/agent/utils/agentLiveTerminalPrompt.constant";
import { formatAgentLiveProgressCheckpointRecord } from "@/features/agent/utils/formatAgentLiveProgressCheckpointRecord";
import { sendAgentRunInputResponse } from "@/features/dispatch/utils/agentRunInputSocket";
import type { AgentLiveTerminalState } from "@/features/agent/utils/reduceAgentLiveTerminalMessage";

export const submitAgentLiveTerminalInput = (
  socket: WebSocket | null,
  state: AgentLiveTerminalState,
  response: string,
): AgentLiveTerminalState | null => {
  const trimmedResponse = response.trim();
  const agentRunId = state.pendingInput?.agentRunId;
  const question = state.pendingInput?.question.trim() ?? "";

  if (
    agentRunId === undefined ||
    socket === null ||
    trimmedResponse.length === 0 ||
    socket.readyState !== WebSocket.OPEN
  ) {
    return null;
  }

  sendAgentRunInputResponse(socket, agentRunId, trimmedResponse);

  const checkpointRecord =
    question.length > 0
      ? formatAgentLiveProgressCheckpointRecord({
          question,
          answer: trimmedResponse,
        })
      : `${trimmedResponse}\n`;

  return {
    ...state,
    pendingInput: null,
    output: appendAgentLiveTerminalPrompt(`${state.output}${checkpointRecord}`),
    status: "streaming",
    pendingCommandLine: null,
  };
};
