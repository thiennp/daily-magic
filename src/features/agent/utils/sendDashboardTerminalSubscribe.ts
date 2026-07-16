import { createAgentWitchRequestId } from "@/features/agent/utils/agentWitchSocketUtils";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

export const sendDashboardTerminalSubscribe = (
  socket: WebSocket | null,
  input: { readonly runId?: string; readonly writerSessionId?: string },
): void => {
  if (socket === null || socket.readyState !== WebSocket.OPEN) {
    return;
  }

  socket.send(
    JSON.stringify({
      type: AGENT_WITCH_MESSAGE_TYPES.DASHBOARD_TERMINAL_SUBSCRIBE,
      payload: {
        ...(input.runId !== undefined ? { runId: input.runId } : {}),
        ...(input.writerSessionId !== undefined
          ? { writerSessionId: input.writerSessionId }
          : {}),
      },
      requestId: createAgentWitchRequestId(),
    }),
  );
};
