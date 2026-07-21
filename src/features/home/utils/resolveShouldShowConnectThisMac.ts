import { deviceMatchesLocalTokenHash } from "@/features/agent-witch/online-wake";
import type { BrowserOperatingSystem } from "@/features/home/utils/detectBrowserOperatingSystem";

export const resolveShouldShowConnectThisMac = (input: {
  readonly operatingSystem: BrowserOperatingSystem;
  readonly localTokenHash: string | null;
  readonly isCheckingLocalHostname: boolean;
  readonly isMobileBrowser: boolean;
  readonly devices: readonly { readonly tokenHash?: string | null }[];
}): boolean => {
  if (input.isCheckingLocalHostname || input.isMobileBrowser) {
    return false;
  }

  if (input.operatingSystem !== "mac") {
    return input.devices.length > 0;
  }

  if (input.localTokenHash === null) {
    return input.devices.length === 0;
  }

  return !input.devices.some((device) =>
    deviceMatchesLocalTokenHash(device.tokenHash, input.localTokenHash ?? ""),
  );
};
