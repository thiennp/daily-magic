import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";

interface ApiMacDevice {
  readonly id: string;
  readonly tokenHash?: string | null;
  readonly deviceLabel: string | null;
  readonly displayName: string | null;
  readonly claimedAt: string;
  readonly lastSeenAt: string | null;
  readonly isConnected?: boolean;
  readonly isOnline?: boolean;
  readonly lastHeartbeatAt: string | null;
  readonly isActive?: boolean;
  readonly installBundleVersion?: string | null;
  readonly wakePort?: number | null;
}

const parseServerInstallBundleVersion = (payload: unknown): string | null => {
  if (typeof payload !== "object" || payload === null) {
    return null;
  }

  const version = (payload as { serverInstallBundleVersion?: unknown })
    .serverInstallBundleVersion;

  return typeof version === "string" && version.trim().length > 0
    ? version.trim()
    : null;
};

const parseMyMacDevices = (
  payload: unknown,
): {
  readonly devices: readonly MyMacDevice[];
  readonly serverInstallBundleVersion: string | null;
} => {
  if (
    typeof payload !== "object" ||
    payload === null ||
    !Array.isArray((payload as { devices?: unknown }).devices)
  ) {
    return {
      devices: [],
      serverInstallBundleVersion: parseServerInstallBundleVersion(payload),
    };
  }

  return {
    serverInstallBundleVersion: parseServerInstallBundleVersion(payload),
    devices: (payload as { devices: ApiMacDevice[] }).devices
      .filter((device) => device.isActive !== false)
      .map((device) => ({
        id: device.id,
        tokenHash:
          typeof device.tokenHash === "string" &&
          device.tokenHash.trim().length > 0
            ? device.tokenHash.trim()
            : null,
        deviceLabel: device.deviceLabel,
        displayName:
          typeof device.displayName === "string" ? device.displayName : null,
        claimedAt: device.claimedAt,
        lastSeenAt: device.lastSeenAt,
        isConnected: device.isConnected === true,
        isOnline: device.isOnline === true,
        lastHeartbeatAt: device.lastHeartbeatAt ?? null,
        installBundleVersion:
          typeof device.installBundleVersion === "string"
            ? device.installBundleVersion
            : null,
        wakePort:
          typeof device.wakePort === "number" &&
          Number.isInteger(device.wakePort) &&
          device.wakePort > 0
            ? device.wakePort
            : null,
      })),
  };
};

export const loadMyMacDevicesSnapshot = async (): Promise<{
  readonly devices: readonly MyMacDevice[];
  readonly hadError: boolean;
  readonly serverInstallBundleVersion: string | null;
}> => {
  const response = await fetch("/api/agent-witch/devices");
  const payload: unknown = await response.json();
  const parsed = parseMyMacDevices(payload);

  return {
    devices: response.ok ? parsed.devices : [],
    hadError: !response.ok,
    serverInstallBundleVersion: parsed.serverInstallBundleVersion,
  };
};
