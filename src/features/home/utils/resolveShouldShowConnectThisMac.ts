import { deviceLabelMatchesLocalHost } from "@/features/agent-witch/online-wake";
import type { BrowserOperatingSystem } from "@/features/home/utils/detectBrowserOperatingSystem";

export const resolveShouldShowConnectThisMac = (input: {
  readonly operatingSystem: BrowserOperatingSystem;
  readonly localHostname: string | null;
  readonly isCheckingLocalHostname: boolean;
  readonly devices: readonly { readonly deviceLabel: string | null }[];
}): boolean => {
  if (input.isCheckingLocalHostname) {
    return false;
  }

  if (input.operatingSystem !== "mac") {
    return input.devices.length > 0;
  }

  if (input.localHostname === null) {
    return input.devices.length === 0;
  }

  return !input.devices.some((device) =>
    deviceLabelMatchesLocalHost(device.deviceLabel, input.localHostname ?? ""),
  );
};
