"use client";

import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import ComputersDownloadLink from "@/features/home/ComputersDownloadLink";
import DownloadNonMacNote from "@/features/download/DownloadNonMacNote";
import type { BrowserOperatingSystem } from "@/features/home/utils/detectBrowserOperatingSystem";

interface HomeConnectGuideDownloadExtrasProps {
  readonly operatingSystem: BrowserOperatingSystem;
  readonly isWebSocketSupported: boolean;
  readonly showInstallCta: boolean;
}

/** Non-Mac note, or Download when install CTA is hidden (already connected). */
export default function HomeConnectGuideDownloadExtras({
  operatingSystem,
  isWebSocketSupported,
  showInstallCta,
}: HomeConnectGuideDownloadExtrasProps) {
  if (operatingSystem !== "mac") {
    return <DownloadNonMacNote />;
  }
  if (isWebSocketSupported && !showInstallCta) {
    return (
      <p className={`mt-4 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        <ComputersDownloadLink />
      </p>
    );
  }
  return null;
}
