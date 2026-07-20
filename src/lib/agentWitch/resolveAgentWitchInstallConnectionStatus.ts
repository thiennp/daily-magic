import buildAgentWitchDevicesWithOnlineStatus from "@/lib/agentWitch/buildAgentWitchDevicesWithOnlineStatus";
import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";

export interface AgentWitchInstallConnectionStatus {
  readonly finished: boolean;
  readonly connectedDeviceCount: number;
  readonly claimedDeviceCount: number;
}

export const resolveAgentWitchInstallConnectionStatus = (input: {
  readonly devices: readonly AgentWitchDeviceRecord[];
  readonly liveDeviceIds: ReadonlySet<string>;
}): AgentWitchInstallConnectionStatus => {
  const devicesWithStatus = buildAgentWitchDevicesWithOnlineStatus(
    input.devices,
    input.liveDeviceIds,
  );
  const connectedDeviceCount = devicesWithStatus.filter(
    (device) => device.isConnected,
  ).length;

  return {
    finished: connectedDeviceCount > 0,
    connectedDeviceCount,
    claimedDeviceCount: devicesWithStatus.length,
  };
};
