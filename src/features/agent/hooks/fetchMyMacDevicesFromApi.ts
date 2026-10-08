import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";
import {
  mapApiMacDevice,
  type ApiMacDevice,
} from "@/features/agent/utils/mapApiMacDevice";

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
      .map(mapApiMacDevice),
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
