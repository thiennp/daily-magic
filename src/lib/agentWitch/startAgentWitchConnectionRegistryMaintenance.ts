import { AGENT_WITCH_HEARTBEAT_INTERVAL_MS } from "@/lib/agentWitch/agentWitchHeartbeat.constant";
import {
  deleteAgentWitchConnectionsForInstance,
  sweepStaleAgentWitchConnections,
} from "@/lib/agentWitch/agentWitchConnectionRegistry";
import { drainAgentWitchDispatchOutboxForHub } from "@/lib/agentWitch/drainAgentWitchDispatchOutboxForHub";
import { expireStaleAgentWitchHubDispatchRelays } from "@/lib/agentWitch/updateAgentWitchHubDispatchRelayStatus";
import { processAgentWitchHubDispatchRelaysForHub } from "@/lib/agentWitch/processAgentWitchHubDispatchRelaysForHub";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { getAgentWitchHubInstanceId } from "@/lib/agentWitch/getAgentWitchHubInstanceId";

const maintenanceGlobalKey =
  "__dailyMagicAgentWitchConnectionRegistryMaintenance";

export const startAgentWitchConnectionRegistryMaintenance = (): void => {
  const globalState = globalThis as typeof globalThis & {
    [maintenanceGlobalKey]?: boolean;
  };

  if (globalState[maintenanceGlobalKey] === true) {
    return;
  }

  globalState[maintenanceGlobalKey] = true;
  const instanceId = getAgentWitchHubInstanceId();

  void deleteAgentWitchConnectionsForInstance(instanceId).catch(
    (error: unknown) => {
      console.error(
        "[agent-witch/registry] failed to clear stale instance rows on startup",
        error,
      );
    },
  );

  const sweepIntervalMs = AGENT_WITCH_HEARTBEAT_INTERVAL_MS;
  const relayPollIntervalMs = 1_000;
  setInterval(() => {
    void processAgentWitchHubDispatchRelaysForHub(getAgentWitchHub()).catch(
      (error: unknown) => {
        console.error("[agent-witch/relay] process poll failed", error);
      },
    );
  }, relayPollIntervalMs);

  setInterval(() => {
    void sweepStaleAgentWitchConnections().catch((error: unknown) => {
      console.error("[agent-witch/registry] sweeper failed", error);
    });
    void drainAgentWitchDispatchOutboxForHub(getAgentWitchHub()).catch(
      (error: unknown) => {
        console.error("[agent-witch/outbox] drain poll failed", error);
      },
    );
    void expireStaleAgentWitchHubDispatchRelays().catch((error: unknown) => {
      console.error("[agent-witch/relay] expire sweep failed", error);
    });
  }, sweepIntervalMs);
};
