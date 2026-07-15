import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";

interface ApiMacDevice {
  readonly id: string;
  readonly deviceLabel: string | null;
  readonly displayName: string | null;
  readonly claimedAt: string;
  readonly lastSeenAt: string | null;
  readonly isConnected?: boolean;
  readonly isOnline?: boolean;
  readonly lastHeartbeatAt: string | null;
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
      isConnected:
        device.isConnected === true ||
        (device.isConnected === undefined && device.lastHeartbeatAt !== null),
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
