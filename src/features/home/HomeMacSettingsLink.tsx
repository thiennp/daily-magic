"use client";

import Link from "next/link";

import { APP_SURFACE_CTA_SECONDARY_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import useThisMacHasConnectedLocalBridge from "@/features/home/hooks/useThisMacHasConnectedLocalBridge";
import { AGENT_WITCH_LOCAL_APP_LOOPBACK_ORIGIN } from "@/lib/agentWitch/agentWitchLocalAppPort.constant";

export default function HomeMacSettingsLink() {
  const hasLocalBridge = useThisMacHasConnectedLocalBridge();

  if (hasLocalBridge) {
    return (
      <a
        href={AGENT_WITCH_LOCAL_APP_LOOPBACK_ORIGIN}
        target="_blank"
        rel="noopener noreferrer"
        className={APP_SURFACE_CTA_SECONDARY_CLASS}
      >
        Status & settings on this Mac
      </a>
    );
  }

  return (
    <Link href="/#your-setup" className={APP_SURFACE_CTA_SECONDARY_CLASS}>
      Mac settings & connect
    </Link>
  );
}
