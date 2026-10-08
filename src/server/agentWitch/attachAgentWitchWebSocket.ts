import { randomUUID } from "node:crypto";
import type { WebSocket } from "ws";

import { AgentWitchHub } from "@/lib/agentWitch/agentWitchHub";
import { drainAgentWitchDispatchOutboxForHub } from "@/lib/agentWitch/drainAgentWitchDispatchOutboxForHub";
import {
  removeAgentWitchConnectionRegistry,
  syncAgentWitchConnectionRegistry,
} from "@/lib/agentWitch/syncAgentWitchConnectionRegistry";
import { clearDashboardTerminalSubscriptions } from "@/lib/dispatch/dashboardTerminalSubscriptionRegistry";
import { reconcileRunningAgentRunsOnDeviceDisconnect } from "@/lib/dispatch/reconcileRunningAgentRunsOnDeviceDisconnect";
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
      close: () => {
        socket.close();
      },
    });
    connectionState.registered = true;
    void syncAgentWitchConnectionRegistry({
      clientId,
      role: connectionState.role,
      userId: connectionState.userId,
      deviceId: connectionState.deviceId,
    })
      .then(() => drainAgentWitchDispatchOutboxForHub(hub))
      .catch((error: unknown) => {
        console.error("[agent-witch/registry] register sync failed", error);
      });
  };

  const unregisterClient = (): void => {
    const role = connectionState.role;
    const userId = connectionState.userId;
    const deviceId = connectionState.deviceId;
    clearDashboardTerminalSubscriptions(clientId);
    hub.unregisterClient(clientId);
    if (
      role === "agent" &&
      typeof userId === "string" &&
      userId.length > 0 &&
      typeof deviceId === "string" &&
      deviceId.length > 0
    ) {
      void reconcileRunningAgentRunsOnDeviceDisconnect(hub, {
        userId,
        deviceId,
      }).catch((error: unknown) => {
        console.error(
          "[agent-witch/ws] device disconnect run reconcile failed",
          error,
        );
      });
    }
    void removeAgentWitchConnectionRegistry(clientId).catch(
      (error: unknown) => {
        console.error(
          "[agent-witch/registry] unregister cleanup failed",
          error,
        );
      },
    );
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
