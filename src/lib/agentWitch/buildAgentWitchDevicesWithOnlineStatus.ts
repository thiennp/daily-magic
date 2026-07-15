import { isAgentWitchDeviceRecentlySeen } from "@/lib/agentWitch/agentWitchHeartbeat.constant";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";

export interface AgentWitchDeviceWithOnlineStatus {
  readonly id: string;
  readonly deviceLabel: string | null;
  readonly displayName: string | null;
  readonly claimedAt: string;
  readonly lastSeenAt: string | null;
  readonly revokedAt: string | null;
  readonly isActive: boolean;
  readonly dispatchPolicy: AgentWitchDeviceRecord["dispatchPolicy"];
  readonly isConnected: boolean;
  readonly isOnline: boolean;
  readonly lastHeartbeatAt: string | null;
}

const buildAgentWitchDevicesWithOnlineStatus = (
  devices: readonly AgentWitchDeviceRecord[],
  onlineClients: readonly AgentWitchHubClient[],
): readonly AgentWitchDeviceWithOnlineStatus[] => {
  const onlineByDeviceId = new Map(
    onlineClients.flatMap((client) =>
      client.deviceId === undefined ? [] : [[client.deviceId, client] as const],
    ),
  );

  return devices.map((device) => {
    const onlineClient = onlineByDeviceId.get(device.id);
    const isConnected = onlineClient !== undefined;
    const isOnline =
      isConnected || isAgentWitchDeviceRecentlySeen(device.lastSeenAt);

    return {
      id: device.id,
      deviceLabel: onlineClient?.deviceLabel ?? device.deviceLabel,
      displayName: device.displayName,
      claimedAt: device.claimedAt,
      lastSeenAt: device.lastSeenAt,
      revokedAt: device.revokedAt,
      isActive: device.revokedAt === null,
      dispatchPolicy: device.dispatchPolicy,
      isConnected,
      isOnline,
      lastHeartbeatAt: onlineClient?.lastHeartbeatAt ?? null,
    };
  });
};

export default buildAgentWitchDevicesWithOnlineStatus;
