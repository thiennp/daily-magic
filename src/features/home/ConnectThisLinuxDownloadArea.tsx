"use client";

import ConnectThisLinuxDownloadChoice from "@/features/home/ConnectThisLinuxDownloadChoice";
import type { BrowserOperatingSystem } from "@/features/home/utils/public-api/types";
import { shouldShowConnectThisLinuxDownloadChoice } from "@/features/home/utils/public-api/presentation";
import useIsMobileClient from "@/hooks/useIsMobileClient";
import {
  buildAgentWitchLocalLinuxAppImageDownloadUrl,
  buildAgentWitchLocalLinuxDebDownloadUrl,
  IS_AGENT_WITCH_LOCAL_LINUX_APP_RELEASED,
} from "@/lib/agentWitch/buildAgentWitchLocalLinuxAppDownloadUrl";

interface ConnectThisLinuxDownloadAreaProps {
  readonly operatingSystem: BrowserOperatingSystem;
}

/** Isolated Linux download block for the Connect this computer modal. */
export default function ConnectThisLinuxDownloadArea({
  operatingSystem,
}: ConnectThisLinuxDownloadAreaProps) {
  const isMobile = useIsMobileClient();
  const shouldShow = shouldShowConnectThisLinuxDownloadChoice({
    operatingSystem,
    isMobile,
    isReleased: IS_AGENT_WITCH_LOCAL_LINUX_APP_RELEASED,
  });

  if (!shouldShow) {
    return null;
  }

  return (
    <ConnectThisLinuxDownloadChoice
      appImageUrl={buildAgentWitchLocalLinuxAppImageDownloadUrl()}
      debUrl={buildAgentWitchLocalLinuxDebDownloadUrl()}
    />
  );
}
