import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";

interface ApiMacDevice extends MyMacDevice {
  readonly isActive?: boolean;
}

const parseMyMacDevices = (payload: unknown): readonly MyMacDevice[] => {
  if (
    typeof payload !== "object" ||
    payload === null ||
    !Array.isArray((payload as { devices?: unknown }).devices)
  ) {
    return [];
  }

  return (payload as { devices: ApiMacDevice[] }).devices
    .filter((device) => device.isActive !== false)
    .map((device) => ({
      id: device.id,
      deviceLabel: device.deviceLabel,
      displayName:
        typeof device.displayName === "string" ? device.displayName : null,
      claimedAt: device.claimedAt,
      lastSeenAt: device.lastSeenAt,
      isOnline: device.isOnline === true,
      lastHeartbeatAt: device.lastHeartbeatAt ?? null,
    }));
};

export const loadMyMacDevicesSnapshot = async (): Promise<{
  readonly devices: readonly MyMacDevice[];
  readonly hadError: boolean;
}> => {
  const response = await fetch("/api/agent-witch/devices");
  const payload: unknown = await response.json();

  return {
    devices: response.ok ? parseMyMacDevices(payload) : [],
    hadError: !response.ok,
  };
};
