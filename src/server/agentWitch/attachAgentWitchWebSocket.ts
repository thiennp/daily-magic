import { randomUUID } from "node:crypto";
import type { WebSocket } from "ws";

import { AgentWitchHub } from "@/lib/agentWitch/agentWitchHub";
import parseAgentWitchMessage from "@/lib/agentWitch/parseAgentWitchMessage";
import serializeAgentWitchMessage from "@/lib/agentWitch/serializeAgentWitchMessage";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import type { AgentWitchRole } from "@/lib/agentWitch/types/AgentWitchRole.type";
import type { AuthActorFromCookies } from "@/lib/auth/resolveAuthActorFromCookieHeader";

const sendSocketMessage = (
  socket: WebSocket,
  message: AgentWitchMessage,
): void => {
  if (socket.readyState === socket.OPEN) {
    socket.send(serializeAgentWitchMessage(message));
  }
};

export interface AgentWitchWebSocketAuthContext {
  readonly dashboardActor: AuthActorFromCookies | null;
}

export const attachAgentWitchWebSocket = (
  hub: AgentWitchHub,
  socket: WebSocket,
  authContext: AgentWitchWebSocketAuthContext,
): void => {
  const clientId = randomUUID();
  const connectionState: {
    registered: boolean;
    role: AgentWitchRole;
    userId?: string;
    email?: string;
    pairingToken?: string;
  } = {
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
      send: (message) => {
        sendSocketMessage(socket, message);
      },
    });
    connectionState.registered = true;
  };

  socket.on("message", (data) => {
    void (async () => {
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
        const resolvedRole = hub.resolveRoleFromRegisterPayload(
          message.payload,
        );

        if (resolvedRole === "dashboard") {
          if (authContext.dashboardActor === null) {
            sendSocketMessage(socket, {
              type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
              payload: {
                errorMessage:
                  "Dashboard connections require an authenticated browser session.",
              },
              requestId: message.requestId,
            });
            socket.close();
            return;
          }

          connectionState.role = "dashboard";
          connectionState.userId = authContext.dashboardActor.id;
          connectionState.email = authContext.dashboardActor.email;
        }

        if (resolvedRole === "agent") {
          const pairingToken = hub.resolvePairingTokenFromRegisterPayload(
            message.payload,
          );

          if (pairingToken === null) {
            sendSocketMessage(socket, {
              type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
              payload: {
                errorMessage:
                  "Agent connections require payload.pairingToken from ~/.agent-witch/config.json.",
              },
              requestId: message.requestId,
            });
            socket.close();
            return;
          }

          connectionState.role = "agent";
          connectionState.pairingToken = pairingToken;
          connectionState.userId =
            await hub.resolveUserIdForAgentRegister(pairingToken);
        }

        if (resolvedRole !== null) {
          if (connectionState.registered) {
            hub.unregisterClient(clientId);
            connectionState.registered = false;
          }

          registerClient();
        }
      }

      if (!connectionState.registered) {
        sendSocketMessage(socket, {
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
        sendSocketMessage(socket, response);
      }
    })();
  });

  socket.on("close", () => {
    if (connectionState.registered) {
      hub.unregisterClient(clientId);
    }
  });
};
