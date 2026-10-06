"use client";

import { useMemo } from "react";

import ConnectThisMacDownloadChoice from "@/features/home/ConnectThisMacDownloadChoice";
import type { BrowserOperatingSystem } from "@/features/home/utils/detectBrowserOperatingSystem";
import isMobileBrowser from "@/features/home/utils/isMobileBrowser";
import { shouldShowConnectThisMacDownloadChoice } from "@/features/home/utils/shouldShowConnectThisMacDownloadChoice";
import { buildAgentWitchLocalMacAppDownloadUrl } from "@/lib/agentWitch/buildAgentWitchLocalMacAppDownloadUrl";

interface ConnectThisMacDownloadAreaProps {
  readonly operatingSystem: BrowserOperatingSystem;
}

/** Isolated Download for Mac block for the Connect this computer modal (mobile-gated). */
export default function ConnectThisMacDownloadArea({
  operatingSystem,
}: ConnectThisMacDownloadAreaProps) {
  const isMobile = useMemo(() => isMobileBrowser(), []);
  const shouldShow = shouldShowConnectThisMacDownloadChoice({
    operatingSystem,
    isMobile,
  });

  if (!shouldShow) {
    return null;
  }

  return (
    <ConnectThisMacDownloadChoice
      downloadUrl={buildAgentWitchLocalMacAppDownloadUrl()}
    />
  );
}
