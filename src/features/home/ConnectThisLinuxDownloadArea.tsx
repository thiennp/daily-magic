"use client";

import { useMemo } from "react";

import ConnectThisLinuxDownloadChoice from "@/features/home/ConnectThisLinuxDownloadChoice";
import type { BrowserOperatingSystem } from "@/features/home/utils/detectBrowserOperatingSystem";
import isMobileBrowser from "@/features/home/utils/isMobileBrowser";
import { shouldShowConnectThisLinuxDownloadChoice } from "@/features/home/utils/shouldShowConnectThisLinuxDownloadChoice";
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
  const isMobile = useMemo(() => isMobileBrowser(), []);
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
