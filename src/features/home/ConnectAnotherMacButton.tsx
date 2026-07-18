"use client";

import { useState } from "react";

import { APP_SURFACE_TEXT_LINK_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import ConnectAnotherMacModal from "@/features/home/ConnectAnotherMacModal";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import { resolveConnectAnotherMacLabel } from "@/features/home/utils/resolveConnectAnotherMacLabel";
import { shouldShowAgentWitchAppDownloadCta } from "@/features/home/utils/shouldShowAgentWitchAppDownloadCta";

interface ConnectAnotherMacButtonProps {
  readonly dmgDownloadUrl: string;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
  readonly hasExistingDevices: boolean;
  readonly className?: string;
}

export default function ConnectAnotherMacButton({
  dmgDownloadUrl,
  isWebSocketSupported,
  host,
  hasExistingDevices,
  className,
}: ConnectAnotherMacButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isCheckingLocalApp, isLocalAppInstalled } =
    useLocalMacBrowserContext();
  const showDownloadCta = shouldShowAgentWitchAppDownloadCta({
    isCheckingLocalApp,
    isLocalAppInstalled,
  });

  if (!showDownloadCta) {
    return null;
  }

  const actionLabel = resolveConnectAnotherMacLabel(hasExistingDevices);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsModalOpen(true);
        }}
        className={className ?? APP_SURFACE_TEXT_LINK_CLASS}
      >
        {actionLabel}
      </button>
      <ConnectAnotherMacModal
        isOpen={isModalOpen}
        dmgDownloadUrl={dmgDownloadUrl}
        isWebSocketSupported={isWebSocketSupported}
        host={host}
        hasExistingDevices={hasExistingDevices}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onInstallEngaged={() => {
          setIsModalOpen(false);
        }}
      />
    </>
  );
}
