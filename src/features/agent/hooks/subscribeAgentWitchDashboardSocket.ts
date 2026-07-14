import {
  connectAgentWitchDashboardSocket,
  computeReconnectDelayMs,
} from "@/features/agent/utils/connectAgentWitchDashboardSocket";
import {
  buildAgentWitchWebSocketUrl,
  sendAgentWitchPairingToken,
} from "@/features/agent/utils/agentWitchSocketUtils";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

export const subscribeAgentWitchDashboardSocket = (input: {
  readonly onStatusChange: (status: WsTestConnectionStatus) => void;
  readonly onMessage: (data: string) => void;
  readonly onSocketChange: (socket: WebSocket | null) => void;
}): (() => void) => {
  const wsUrl = buildAgentWitchWebSocketUrl();
  if (wsUrl.length === 0) {
    input.onStatusChange("error");
    return () => undefined;
  }

  const lifecycle = {
    disposed: false,
    reconnectTimer: null as ReturnType<typeof setTimeout> | null,
    activeSocket: null as WebSocket | null,
    reconnectAttempt: 0,
  };

  const scheduleReconnect = (): void => {
    if (lifecycle.disposed) {
      return;
    }

    const delayMs = computeReconnectDelayMs(lifecycle.reconnectAttempt);
    lifecycle.reconnectAttempt += 1;
    lifecycle.reconnectTimer = setTimeout(() => {
      openSocket();
    }, delayMs);
  };

  const openSocket = (): void => {
    if (lifecycle.disposed) {
      return;
    }

    input.onStatusChange("connecting");
    lifecycle.activeSocket = connectAgentWitchDashboardSocket({
      wsUrl,
      scheduleReconnect,
      callbacks: {
        onOpen: (socket) => {
          lifecycle.reconnectAttempt = 0;
          input.onSocketChange(socket);
          input.onStatusChange("connected");
          socket.send(
            JSON.stringify({
              type: AGENT_WITCH_MESSAGE_TYPES.AGENT_REGISTER,
              payload: { role: "dashboard" },
            }),
          );
          sendAgentWitchPairingToken(socket);
        },
        onMessage: input.onMessage,
        onDisconnected: () => {
          input.onSocketChange(null);
          input.onStatusChange("disconnected");
        },
        onError: () => {
          input.onStatusChange("error");
        },
      },
    });
  };

  openSocket();

  return () => {
    lifecycle.disposed = true;
    if (lifecycle.reconnectTimer !== null) {
      clearTimeout(lifecycle.reconnectTimer);
    }
    lifecycle.activeSocket?.close();
    input.onSocketChange(null);
  };
};
