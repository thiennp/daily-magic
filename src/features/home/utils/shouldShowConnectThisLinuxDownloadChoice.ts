import type { BrowserOperatingSystem } from "@/features/home/utils/detectBrowserOperatingSystem";

/** Show Linux desktop downloads only on desktop Linux browsers (not mobile). */
export const shouldShowConnectThisLinuxDownloadChoice = (input: {
  readonly operatingSystem: BrowserOperatingSystem;
  readonly isMobile: boolean;
}): boolean => input.operatingSystem === "linux" && !input.isMobile;
