import { AGENT_WITCH_HEARTBEAT_INTERVAL_MS } from "@/lib/agentWitch/agentWitchHeartbeat.constant";
import {
  deleteAgentWitchConnectionsForInstance,
  sweepStaleAgentWitchConnections,
} from "@/lib/agentWitch/agentWitchConnectionRegistry";
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
  setInterval(() => {
    void sweepStaleAgentWitchConnections().catch((error: unknown) => {
      console.error("[agent-witch/registry] sweeper failed", error);
    });
  }, sweepIntervalMs);
};
