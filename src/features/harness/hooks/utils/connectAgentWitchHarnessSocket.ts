import type { AgentPairingStatus } from "@/features/harness/hooks/types/HarnessRequestResult.type";
import type HarnessRequestResult from "@/features/harness/hooks/types/HarnessRequestResult.type";
import type { AgentWitchSocketStore } from "@/features/harness/hooks/utils/agentWitchSocketStore";
import { createAgentWitchRequestId } from "@/features/harness/hooks/utils/agentWitchSocketUtils";
import { handleAgentWitchSocketMessage } from "@/features/harness/hooks/utils/handleAgentWitchSocketMessage";
import { createHttpDashboardSocketShim } from "@/features/agent/utils/createHttpDashboardSocketShim";
import type { HarnessExportResultPayload } from "@/features/harness/types/HarnessExportResult.type";
import { AGENT_WITCH_PAIRING_TOKEN_STORAGE_KEY } from "@/lib/agentWitch/constants/pairingTokenStorageKey.constant";
import type HarnessManifest from "@/lib/agentWitch/harness/types/HarnessManifest.type";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

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
  if (typeof EventSource === "undefined") {
    return () => undefined;
  }

  setConnectionStatus("connecting");
  const shim = createHttpDashboardSocketShim();
  socketStore.socket = shim;

  const eventSource = new EventSource("/api/agent-witch/events");

  eventSource.onopen = () => {
    setConnectionStatus("connected");
    shim.send(
      JSON.stringify({
        type: AGENT_WITCH_MESSAGE_TYPES.AGENT_REGISTER,
        payload: { role: "dashboard" },
        requestId: createAgentWitchRequestId(),
      }),
    );
    const pairingToken = window.localStorage.getItem(
      AGENT_WITCH_PAIRING_TOKEN_STORAGE_KEY,
    );
    if (pairingToken !== null && pairingToken.length > 0) {
      shim.send(
        JSON.stringify({
          type: AGENT_WITCH_MESSAGE_TYPES.AGENT_PAIR,
          payload: { pairingToken },
          requestId: createAgentWitchRequestId(),
        }),
      );
    }
  };

  eventSource.onmessage = (event) => {
    handleAgentWitchSocketMessage(String(event.data), {
      setPairingStatus,
      setLocalManifest,
      setManifestHostname,
      setLastRequestResult,
      setLastMessage,
      onHarnessExportResult,
    });
  };

  eventSource.onerror = () => {
    setConnectionStatus("disconnected");
  };

  return () => {
    eventSource.close();
    socketStore.socket = null;
  };
};
