import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";

export interface AgentWitchDeviceWithOnlineStatus {
  readonly id: string;
  readonly deviceLabel: string | null;
  readonly claimedAt: string;
  readonly lastSeenAt: string | null;
  readonly revokedAt: string | null;
  readonly isActive: boolean;
  readonly dispatchPolicy: AgentWitchDeviceRecord["dispatchPolicy"];
  readonly isOnline: boolean;
  readonly lastHeartbeatAt: string | null;
}

const buildAgentWitchDevicesWithOnlineStatus = (
  devices: readonly AgentWitchDeviceRecord[],
  onlineClients: readonly AgentWitchHubClient[],
): readonly AgentWitchDeviceWithOnlineStatus[] => {
  const onlineByDeviceId = new Map(
    onlineClients.flatMap((client) =>
      client.deviceId === undefined
        ? []
        : [[client.deviceId, client] as const],
    ),
  );

  return devices.map((device) => {
    const onlineClient = onlineByDeviceId.get(device.id);

    return {
      id: device.id,
      deviceLabel: onlineClient?.deviceLabel ?? device.deviceLabel,
      claimedAt: device.claimedAt,
      lastSeenAt: device.lastSeenAt,
      revokedAt: device.revokedAt,
      isActive: device.revokedAt === null,
      dispatchPolicy: device.dispatchPolicy,
      isOnline: onlineClient !== undefined,
      lastHeartbeatAt: onlineClient?.lastHeartbeatAt ?? null,
    };
  });
};

export default buildAgentWitchDevicesWithOnlineStatus;
