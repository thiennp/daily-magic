import { deviceMatchesReachableLocalTokenHash } from "@/features/agent-witch/utils/deviceMatchesReachableLocalTokenHash";
import type { MacPresenceTier } from "@/features/agent-witch/online-wake/macDevicePresence";
import type { BrowserOperatingSystem } from "@/features/home/utils/detectBrowserOperatingSystem";

export const resolveShouldShowConnectThisMac = (input: {
  readonly operatingSystem: BrowserOperatingSystem;
  readonly localTokenHash: string | null;
  readonly isCheckingLocalHostname: boolean;
  readonly isMobileBrowser: boolean;
  readonly devices: readonly {
    readonly tokenHash?: string | null;
    readonly isConnected?: boolean;
    readonly isOnline?: boolean;
    readonly presenceTier?: MacPresenceTier;
  }[];
}): boolean => {
  if (input.isCheckingLocalHostname || input.isMobileBrowser) {
    return false;
  }

  if (
    input.operatingSystem === "linux" ||
    input.operatingSystem === "windows"
  ) {
    return true;
  }

  if (input.operatingSystem !== "mac") {
    return input.devices.length > 0;
  }

  // No local install token means this browser Mac is not linked yet.
  if (input.localTokenHash === null) {
    return true;
  }

  const localTokenHash = input.localTokenHash ?? "";
  return !input.devices.some((device) =>
    deviceMatchesReachableLocalTokenHash(
      {
        tokenHash: device.tokenHash ?? null,
        isConnected: device.isConnected ?? false,
        isOnline: device.isOnline ?? false,
        presenceTier: device.presenceTier,
      },
      localTokenHash,
    ),
  );
};
