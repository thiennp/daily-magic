import type { BrowserOperatingSystem } from "@/features/home/utils/detectBrowserOperatingSystem";

/** Show Linux desktop downloads only on desktop Linux browsers (not mobile), once the release exists. */
export const shouldShowConnectThisLinuxDownloadChoice = (input: {
  readonly operatingSystem: BrowserOperatingSystem;
  readonly isMobile: boolean;
  readonly isReleased: boolean;
}): boolean =>
  input.isReleased && input.operatingSystem === "linux" && !input.isMobile;
