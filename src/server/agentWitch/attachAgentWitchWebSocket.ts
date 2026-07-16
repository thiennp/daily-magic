import { randomUUID } from "node:crypto";
import type { WebSocket } from "ws";

import { AgentWitchHub } from "@/lib/agentWitch/agentWitchHub";
import { clearDashboardTerminalSubscriptions } from "@/lib/dispatch/dashboardTerminalSubscriptionRegistry";
import type {
  AgentWitchConnectionState,
  AgentWitchWebSocketAuthContext,
} from "@/server/agentWitch/processAgentWitchRegisterMessage";
import { processAgentWitchIncomingSocketMessage } from "@/server/agentWitch/processAgentWitchIncomingSocketMessage";
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
    clearDashboardTerminalSubscriptions(clientId);
    hub.unregisterClient(clientId);
  };

  const messageQueue = { chain: Promise.resolve() };

  socket.on("message", (data) => {
    messageQueue.chain = messageQueue.chain
      .then(() =>
        processAgentWitchIncomingSocketMessage(
          hub,
          socket,
          authContext,
          connectionState,
          clientId,
          registerClient,
          unregisterClient,
          data,
        ),
      )
      .catch((error: unknown) => {
        console.error("[agent-witch/ws] message handling failed", error);
      });
  });

  socket.on("close", () => {
    if (connectionState.registered) {
      unregisterClient();
    }
  });
};
