import type { WebSocket } from "ws";

import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import serializeAgentWitchMessage from "@/lib/agentWitch/serializeAgentWitchMessage";

export const sendAgentWitchSocketMessage = (
  socket: WebSocket,
  message: AgentWitchMessage,
): void => {
  if (socket.readyState === socket.OPEN) {
    socket.send(serializeAgentWitchMessage(message));
  }
};
