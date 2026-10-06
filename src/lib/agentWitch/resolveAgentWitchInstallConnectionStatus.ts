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
  /** HOME-065 Soft HOLD: finished only when THIS minted token is live. */
  readonly expectedTokenHash?: string | null;
}): AgentWitchInstallConnectionStatus => {
  const devicesWithStatus = buildAgentWitchDevicesWithOnlineStatus(
    input.devices,
    input.liveDeviceIds,
  );
  const connectedDeviceCount = devicesWithStatus.filter(
    (device) => device.isConnected,
  ).length;

  const expectedTokenHash = input.expectedTokenHash?.trim().toLowerCase() ?? "";
  let finished = connectedDeviceCount > 0;
  if (expectedTokenHash.length > 0) {
    finished = devicesWithStatus.some(
      (device) =>
        device.isConnected &&
        (device.tokenHash?.trim().toLowerCase() ?? "") === expectedTokenHash,
    );
  }

  return {
    finished,
    connectedDeviceCount,
    claimedDeviceCount: devicesWithStatus.length,
  };
};
