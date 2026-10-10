"use client";

import Link from "next/link";

import { APP_SURFACE_CTA_SECONDARY_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { DOWNLOAD_PAGE_COPY } from "@/features/download/public-api/types";
import useIsMobileClient from "@/hooks/useIsMobileClient";
import useThisMacHasConnectedLocalBridge from "@/features/home/hooks/useThisMacHasConnectedLocalBridge";
import HomeOpenLocalStatusButton from "@/features/home/HomeOpenLocalStatusButton";

export default function HomeMacSettingsLink() {
  const hasLocalBridge = useThisMacHasConnectedLocalBridge();
  const isMobileClient = useIsMobileClient();

  if (isMobileClient) {
    return null;
  }

  if (hasLocalBridge) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <HomeOpenLocalStatusButton>
          Status & settings on this computer
        </HomeOpenLocalStatusButton>
        <Link href="/download" className={APP_SURFACE_CTA_SECONDARY_CLASS}>
          {DOWNLOAD_PAGE_COPY.pairedLinkLabel}
        </Link>
      </div>
    );
  }

  return (
    <Link href="/#your-setup" className={APP_SURFACE_CTA_SECONDARY_CLASS}>
      This computer settings & connect
    </Link>
  );
}
