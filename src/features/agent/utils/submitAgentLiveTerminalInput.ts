import { appendAgentLiveTerminalPrompt } from "@/features/agent/utils/agentLiveTerminalPrompt.constant";
import { sendAgentRunInputResponse } from "@/features/dispatch/utils/agentRunInputSocket";
import type { AgentLiveTerminalState } from "@/features/agent/utils/reduceAgentLiveTerminalMessage";

export const submitAgentLiveTerminalInput = (
  socket: WebSocket | null,
  state: AgentLiveTerminalState,
  response: string,
): AgentLiveTerminalState | null => {
  const trimmedResponse = response.trim();
  const agentRunId = state.pendingInput?.agentRunId;

  if (
    agentRunId === undefined ||
    socket === null ||
    trimmedResponse.length === 0 ||
    socket.readyState !== WebSocket.OPEN
  ) {
    return null;
  }

  sendAgentRunInputResponse(socket, agentRunId, trimmedResponse);

  return {
    ...state,
    pendingInput: null,
    output: appendAgentLiveTerminalPrompt(
      `${state.output}${trimmedResponse}\n`,
    ),
    status: "streaming",
    pendingCommandLine: null,
  };
};
