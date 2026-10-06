"use client";

import { useCallback, useState, useSyncExternalStore } from "react";

import useIsMobileClient from "@/hooks/useIsMobileClient";
import { APP_SURFACE_TEXT_LINK_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import ConnectAnotherMacModal from "@/features/home/ConnectAnotherMacModal";
import ConnectInstallPasteModal from "@/features/home/ConnectInstallPasteModal";
import useConnectInstallPasteModalDismissal from "@/features/home/hooks/useConnectInstallPasteModalDismissal";
import usePersonalizedAgentWitchInstallCommand from "@/features/home/hooks/usePersonalizedAgentWitchInstallCommand";
import detectBrowserOperatingSystem from "@/features/home/utils/detectBrowserOperatingSystem";
import { resolveConnectAnotherMacLabel } from "@/features/home/utils/resolveConnectAnotherMacLabel";
import { shouldOpenConnectInstallPasteModal } from "@/features/home/utils/shouldOpenConnectInstallPasteModal";

interface ConnectAnotherMacButtonProps {
  readonly installCommand: string;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
  readonly hasExistingDevices: boolean;
  readonly className?: string;
}

const subscribeToOperatingSystem = () => () => undefined;

const getServerOperatingSystemSnapshot = () => "other" as const;

/**
 * Connect this / another computer entry.
 * Stays visible when a computer is already connected (HARD: never hide Download/
 * Connect-another just because connected). Mobile still hides — paste/install
 * is desktop-oriented; Download remains via ComputersDownloadLink.
 */
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
    commitIdentityWhenDisabled: true,
  });
  const isMobileClient = useIsMobileClient();
  const operatingSystem = useSyncExternalStore(
    subscribeToOperatingSystem,
    detectBrowserOperatingSystem,
    getServerOperatingSystemSnapshot,
  );

  const handleInstallEngaged = useCallback(() => {
    if (shouldOpenConnectInstallPasteModal(operatingSystem)) {
      setIsPasteModalOpen(true);
    }
  }, [operatingSystem]);

  const handleClosePasteModal = useCallback(() => {
    setIsPasteModalOpen(false);
  }, []);

  useConnectInstallPasteModalDismissal({
    isOpen: isPasteModalOpen,
    isLinking: false,
    onClose: handleClosePasteModal,
  });

  if (isMobileClient) {
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
        onInstallEngaged={handleInstallEngaged}
      />
      <ConnectInstallPasteModal
        isOpen={isPasteModalOpen}
        onClose={handleClosePasteModal}
      />
    </>
  );
}
