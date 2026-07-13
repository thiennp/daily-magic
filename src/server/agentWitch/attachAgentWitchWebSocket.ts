import { randomUUID } from "node:crypto";
import type { WebSocket } from "ws";

import { AgentWitchHub } from "@/lib/agentWitch/agentWitchHub";
import parseAgentWitchMessage from "@/lib/agentWitch/parseAgentWitchMessage";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import {
  processAgentWitchRegisterMessage,
  type AgentWitchConnectionState,
  type AgentWitchWebSocketAuthContext,
} from "@/server/agentWitch/processAgentWitchRegisterMessage";
import { sendAgentWitchSocketMessage } from "@/server/agentWitch/sendAgentWitchSocketMessage";

export type { AgentWitchWebSocketAuthContext };

export const attachAgentWitchWebSocket = (
  hub: AgentWitchHub,
  socket: WebSocket,
  authContext: AgentWitchWebSocketAuthContext,
): void => {
  const clientId = randomUUID();
  const connectionState: AgentWitchConnectionState = {
    registered: false,
    role: "dashboard",
  };

  const registerClient = (): void => {
    hub.registerClient({
      id: clientId,
      role: connectionState.role,
      userId: connectionState.userId,
      email: connectionState.email,
      pairingToken: connectionState.pairingToken,
      deviceId: connectionState.deviceId,
      deviceLabel: connectionState.deviceLabel,
      send: (message) => {
        sendAgentWitchSocketMessage(socket, message);
      },
    });
    connectionState.registered = true;
  };

  const unregisterClient = (): void => {
    hub.unregisterClient(clientId);
  };

  socket.on("message", (data) => {
    void (async () => {
      const raw = typeof data === "string" ? data : data.toString("utf8");
      const message = parseAgentWitchMessage(raw);

      if (message === null) {
        sendAgentWitchSocketMessage(socket, {
          type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
          payload: {
            errorMessage: "Invalid Agent Witch message payload.",
          },
        });
        return;
      }

      const shouldContinue = await processAgentWitchRegisterMessage(
        hub,
        socket,
        authContext,
        connectionState,
        message,
        registerClient,
        unregisterClient,
      );

      if (!shouldContinue) {
        return;
      }

      if (!connectionState.registered) {
        sendAgentWitchSocketMessage(socket, {
          type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
          payload: {
            errorMessage:
              "Send agent.register before other Agent Witch messages.",
          },
          requestId: message.requestId,
        });
        return;
      }

      const response = await hub.handleMessageAsync(clientId, message);
      if (response !== null) {
        sendAgentWitchSocketMessage(socket, response);
      }
    })();
  });

  socket.on("close", () => {
    if (connectionState.registered) {
      hub.unregisterClient(clientId);
    }
  });
};
