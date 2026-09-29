"use client";

import Link from "next/link";

import { APP_SURFACE_CTA_SECONDARY_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import useThisMacHasConnectedLocalBridge from "@/features/home/hooks/useThisMacHasConnectedLocalBridge";
import HomeOpenLocalStatusButton from "@/features/home/HomeOpenLocalStatusButton";

export default function HomeMacSettingsLink() {
  const hasLocalBridge = useThisMacHasConnectedLocalBridge();

  if (hasLocalBridge) {
    return (
      <HomeOpenLocalStatusButton>
        Status & settings on this Mac
      </HomeOpenLocalStatusButton>
    );
  }

  return (
    <Link href="/#your-setup" className={APP_SURFACE_CTA_SECONDARY_CLASS}>
      Mac settings & connect
    </Link>
  );
}
