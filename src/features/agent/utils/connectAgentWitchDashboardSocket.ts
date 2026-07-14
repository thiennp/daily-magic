import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";

const RECONNECT_BASE_MS = 1_000;
const RECONNECT_MAX_MS = 30_000;

export const computeReconnectDelayMs = (attempt: number): number =>
  Math.min(RECONNECT_BASE_MS * 2 ** attempt, RECONNECT_MAX_MS);

export interface AgentWitchSocketCallbacks {
  readonly onOpen: (socket: WebSocket) => void;
  readonly onMessage: (data: string) => void;
  readonly onDisconnected: () => void;
  readonly onError: () => void;
}

export const connectAgentWitchDashboardSocket = (input: {
  readonly wsUrl: string;
  readonly callbacks: AgentWitchSocketCallbacks;
  readonly scheduleReconnect: () => void;
}): WebSocket => {
  const socket = new WebSocket(input.wsUrl);

  socket.addEventListener("open", () => {
    input.callbacks.onOpen(socket);
  });

  socket.addEventListener("message", (event) => {
    input.callbacks.onMessage(String(event.data));
  });

  socket.addEventListener("close", () => {
    input.callbacks.onDisconnected();
    input.scheduleReconnect();
  });

  socket.addEventListener("error", () => {
    input.callbacks.onError();
  });

  return socket;
};

export const resolveInitialConnectionStatus = (
  isSimulated: boolean,
  simulatedStatus?: WsTestConnectionStatus,
): WsTestConnectionStatus => {
  if (isSimulated && simulatedStatus !== undefined) {
    return simulatedStatus;
  }

  return "connecting";
};
