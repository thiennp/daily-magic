import type { AgentPairingStatus } from "@/features/harness/hooks/types/HarnessRequestResult.type";
import type HarnessRequestResult from "@/features/harness/hooks/types/HarnessRequestResult.type";
import type { AgentWitchSocketStore } from "@/features/harness/hooks/utils/agentWitchSocketStore";
import {
  buildAgentWitchWebSocketUrl,
  createAgentWitchRequestId,
} from "@/features/harness/hooks/utils/agentWitchSocketUtils";
import { handleAgentWitchSocketMessage } from "@/features/harness/hooks/utils/handleAgentWitchSocketMessage";
import type { HarnessExportResultPayload } from "@/features/harness/types/HarnessExportResult.type";
import { AGENT_WITCH_PAIRING_TOKEN_STORAGE_KEY } from "@/lib/agentWitch/constants/pairingTokenStorageKey.constant";
import type HarnessManifest from "@/lib/agentWitch/harness/types/HarnessManifest.type";
import type { WsTestConnectionStatus } from "@/features/wsTest/types/WsTestConnectionStatus.type";

interface ConnectAgentWitchHarnessSocketOptions {
  readonly socketStore: AgentWitchSocketStore;
  readonly setConnectionStatus: (status: WsTestConnectionStatus) => void;
  readonly setPairingStatus: (status: AgentPairingStatus) => void;
  readonly setLocalManifest: (manifest: HarnessManifest | null) => void;
  readonly setManifestHostname: (hostname: string | null) => void;
  readonly setLastRequestResult: (result: HarnessRequestResult | null) => void;
  readonly setLastMessage: (message: string) => void;
  readonly onHarnessExportResult?: (
    payload: HarnessExportResultPayload,
  ) => void;
}

export const connectAgentWitchHarnessSocket = ({
  socketStore,
  setConnectionStatus,
  setPairingStatus,
  setLocalManifest,
  setManifestHostname,
  setLastRequestResult,
  setLastMessage,
  onHarnessExportResult,
}: ConnectAgentWitchHarnessSocketOptions): (() => void) => {
  const wsUrl = buildAgentWitchWebSocketUrl();
  if (wsUrl.length === 0) {
    return () => undefined;
  }

  const socket = new WebSocket(wsUrl);
  socketStore.socket = socket;

  const messageHandlers = {
    setLastMessage,
    setPairingStatus,
    setLocalManifest,
    setManifestHostname,
    setLastRequestResult,
    onHarnessExportResult,
  };

  socket.addEventListener("open", () => {
    setConnectionStatus("connected");
    socket.send(
      JSON.stringify({
        type: "agent.register",
        payload: { role: "dashboard" },
      }),
    );

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
      setPairingStatus("ready_to_pair");
    }
  });

  socket.addEventListener("message", (event) => {
    handleAgentWitchSocketMessage(String(event.data), messageHandlers);
  });

  socket.addEventListener("close", () => {
    setConnectionStatus("disconnected");
    setPairingStatus("not_connected");
    setLocalManifest(null);
    setManifestHostname(null);
  });

  socket.addEventListener("error", () => {
    setConnectionStatus("error");
    setPairingStatus("not_connected");
  });

  return () => {
    socket.close();
    socketStore.socket = null;
  };
};
