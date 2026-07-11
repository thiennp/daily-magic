import { randomUUID } from "node:crypto";
import type { WebSocket } from "ws";

import { AgentWitchHub } from "@/lib/agentWitch/agentWitchHub";
import parseAgentWitchMessage from "@/lib/agentWitch/parseAgentWitchMessage";
import serializeAgentWitchMessage from "@/lib/agentWitch/serializeAgentWitchMessage";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import type { AgentWitchRole } from "@/lib/agentWitch/types/AgentWitchRole.type";

const sendSocketMessage = (
  socket: WebSocket,
  message: AgentWitchMessage,
): void => {
  if (socket.readyState === socket.OPEN) {
    socket.send(serializeAgentWitchMessage(message));
  }
};

export const attachAgentWitchWebSocket = (
  hub: AgentWitchHub,
  socket: WebSocket,
): void => {
  const clientId = randomUUID();
  const roleHolder: { value: AgentWitchRole } = { value: "dashboard" };

  hub.registerClient({
    id: clientId,
    role: roleHolder.value,
    send: (message) => {
      sendSocketMessage(socket, message);
    },
  });

  socket.on("message", (data) => {
    const raw = typeof data === "string" ? data : data.toString("utf8");
    const message = parseAgentWitchMessage(raw);

    if (message === null) {
      sendSocketMessage(socket, {
        type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
        payload: {
          errorMessage: "Invalid Agent Witch message payload.",
        },
      });
      return;
    }

    if (message.type === AGENT_WITCH_MESSAGE_TYPES.AGENT_REGISTER) {
      const resolvedRole = hub.resolveRoleFromRegisterPayload(message.payload);
      if (resolvedRole !== null) {
        roleHolder.value = resolvedRole;
        hub.unregisterClient(clientId);
        hub.registerClient({
          id: clientId,
          role: roleHolder.value,
          send: (outbound) => {
            sendSocketMessage(socket, outbound);
          },
        });
      }
    }

    const response = hub.handleMessage(clientId, message);
    if (response !== null) {
      sendSocketMessage(socket, response);
    }
  });

  socket.on("close", () => {
    hub.unregisterClient(clientId);
  });
};
