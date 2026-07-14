import { AGENT_WITCH_PAIRING_TOKEN_STORAGE_KEY } from "@/lib/agentWitch/constants/pairingTokenStorageKey.constant";

export const WS_TEST_PATH = "/api/agent-witch/ws";

export const buildAgentWitchWebSocketUrl = (): string => {
  if (typeof window === "undefined") {
    return "";
  }

  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  return `${protocol}//${window.location.host}${WS_TEST_PATH}`;
};

export const createAgentWitchRequestId = (): string => {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `req-${Date.now()}`;
};

export const sendAgentWitchPairingToken = (socket: WebSocket): void => {
  const savedToken = window.localStorage.getItem(
    AGENT_WITCH_PAIRING_TOKEN_STORAGE_KEY,
  );
  if (savedToken !== null && savedToken.trim().length > 0) {
    socket.send(
      JSON.stringify({
        type: "agent.pair",
        payload: { pairingToken: savedToken.trim() },
        requestId: createAgentWitchRequestId(),
      }),
    );
  }
};
