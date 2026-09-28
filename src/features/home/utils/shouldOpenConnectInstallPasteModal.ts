import type { BrowserOperatingSystem } from "@/features/home/utils/detectBrowserOperatingSystem";

/** macOS-only paste helper; Linux and other OSes use inline guide copy. */
export const shouldOpenConnectInstallPasteModal = (
  operatingSystem: BrowserOperatingSystem,
): boolean => operatingSystem === "mac";
