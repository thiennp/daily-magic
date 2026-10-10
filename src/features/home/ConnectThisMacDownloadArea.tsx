"use client";

import ConnectThisMacDownloadChoice from "@/features/home/ConnectThisMacDownloadChoice";
import type { BrowserOperatingSystem } from "@/features/home/utils/public-api/types";
import { shouldShowConnectThisMacDownloadChoice } from "@/features/home/utils/public-api/presentation";
import useIsMobileClient from "@/hooks/useIsMobileClient";
import { buildAgentWitchLocalMacAppDownloadUrl } from "@/lib/agentWitch/buildAgentWitchLocalMacAppDownloadUrl";

interface ConnectThisMacDownloadAreaProps {
  readonly operatingSystem: BrowserOperatingSystem;
}

/** Isolated Download for Mac block for the Connect this computer modal (mobile-gated). */
export default function ConnectThisMacDownloadArea({
  operatingSystem,
}: ConnectThisMacDownloadAreaProps) {
  const isMobile = useIsMobileClient();
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
