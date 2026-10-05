"use client";

import { useMemo } from "react";

import ConnectThisLinuxDownloadChoice from "@/features/home/ConnectThisLinuxDownloadChoice";
import type { BrowserOperatingSystem } from "@/features/home/utils/detectBrowserOperatingSystem";
import isMobileBrowser from "@/features/home/utils/isMobileBrowser";
import { shouldShowConnectThisLinuxDownloadChoice } from "@/features/home/utils/shouldShowConnectThisLinuxDownloadChoice";
import {
  buildAgentWitchLocalLinuxAppImageDownloadUrl,
  buildAgentWitchLocalLinuxDebDownloadUrl,
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
