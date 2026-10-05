import type { BrowserOperatingSystem } from "@/features/home/utils/detectBrowserOperatingSystem";

/** Show Download for Mac only on desktop Mac browsers (not mobile). */
export const shouldShowConnectThisMacDownloadChoice = (input: {
  readonly operatingSystem: BrowserOperatingSystem;
  readonly isMobile: boolean;
}): boolean => input.operatingSystem === "mac" && !input.isMobile;
