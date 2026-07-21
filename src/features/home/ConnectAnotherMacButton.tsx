"use client";

import { useCallback, useState } from "react";

import { APP_SURFACE_TEXT_LINK_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import ConnectAnotherMacModal from "@/features/home/ConnectAnotherMacModal";
import ConnectInstallPasteModal from "@/features/home/ConnectInstallPasteModal";
import useConnectInstallPasteModalDismissal from "@/features/home/hooks/useConnectInstallPasteModalDismissal";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import usePersonalizedAgentWitchInstallCommand from "@/features/home/hooks/usePersonalizedAgentWitchInstallCommand";
import { resolveConnectAnotherMacLabel } from "@/features/home/utils/resolveConnectAnotherMacLabel";
import { shouldShowAgentWitchAppDownloadCta } from "@/features/home/utils/shouldShowAgentWitchAppDownloadCta";

interface ConnectAnotherMacButtonProps {
  readonly installCommand: string;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
  readonly hasExistingDevices: boolean;
  readonly className?: string;
}

export default function ConnectAnotherMacButton({
  installCommand,
  isWebSocketSupported,
  host,
  hasExistingDevices,
  className,
}: ConnectAnotherMacButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false);
  const {
    installCommand: personalizedInstallCommand,
    isLoading: isInstallCommandLoading,
    error: installCommandError,
  } = usePersonalizedAgentWitchInstallCommand({
    enabled: isModalOpen,
    fallbackInstallCommand: installCommand,
  });
  const { isCheckingLocalApp, isLocalAppInstalled } =
    useLocalMacBrowserContext();
  const showInstallCta = shouldShowAgentWitchAppDownloadCta({
    isCheckingLocalApp,
    isLocalAppInstalled,
  });

  const handleClosePasteModal = useCallback(() => {
    setIsPasteModalOpen(false);
  }, []);

  useConnectInstallPasteModalDismissal({
    isOpen: isPasteModalOpen,
    isLinking: false,
    onClose: handleClosePasteModal,
  });

  if (!showInstallCta) {
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
        installCommand={personalizedInstallCommand}
        isInstallCommandLoading={isInstallCommandLoading}
        installCommandError={installCommandError}
        isWebSocketSupported={isWebSocketSupported}
        host={host}
        hasExistingDevices={hasExistingDevices}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onInstallEngaged={() => {
          setIsPasteModalOpen(true);
        }}
      />
      <ConnectInstallPasteModal
        isOpen={isPasteModalOpen}
        onClose={handleClosePasteModal}
      />
    </>
  );
}
