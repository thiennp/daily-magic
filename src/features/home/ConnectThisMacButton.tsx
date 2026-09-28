"use client";

import { useSyncExternalStore } from "react";

import { APP_SURFACE_CTA_SECONDARY_SM_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import ConnectInstallPasteModal from "@/features/home/ConnectInstallPasteModal";
import ConnectThisMacModal from "@/features/home/ConnectThisMacModal";
import useConnectThisMacRowFlow from "@/features/home/hooks/useConnectThisMacRowFlow";
import usePersonalizedAgentWitchInstallCommand from "@/features/home/hooks/usePersonalizedAgentWitchInstallCommand";
import detectBrowserOperatingSystem from "@/features/home/utils/detectBrowserOperatingSystem";

interface ConnectThisMacButtonProps {
  readonly installCommand: string;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
  readonly className?: string;
}

const subscribeToOperatingSystem = () => () => undefined;

const getServerOperatingSystemSnapshot = () => "other" as const;

export default function ConnectThisMacButton({
  installCommand,
  isWebSocketSupported,
  host,
  className = APP_SURFACE_CTA_SECONDARY_SM_CLASS,
}: ConnectThisMacButtonProps) {
  const operatingSystem = useSyncExternalStore(
    subscribeToOperatingSystem,
    detectBrowserOperatingSystem,
    getServerOperatingSystemSnapshot,
  );
  const {
    handleCloseModal,
    handleClosePasteModal,
    handleInstallEngaged,
    handleOpenModal,
    isModalOpen,
    isPasteModalOpen,
  } = useConnectThisMacRowFlow({ operatingSystem });
  const {
    installCommand: personalizedInstallCommand,
    isLoading: isInstallCommandLoading,
    error: installCommandError,
  } = usePersonalizedAgentWitchInstallCommand({
    enabled: isModalOpen,
    fallbackInstallCommand: installCommand,
  });

  return (
    <>
      <div className="flex w-full flex-col gap-2 sm:w-auto">
        <button
          type="button"
          className={className}
          disabled={isInstallCommandLoading}
          onClick={handleOpenModal}
        >
          {isInstallCommandLoading ? "Preparing…" : "Connect this Mac"}
        </button>
        {installCommandError !== null ? (
          <p className="text-xs text-red-600 dark:text-red-400">
            {installCommandError}
          </p>
        ) : null}
      </div>
      <ConnectThisMacModal
        isOpen={isModalOpen}
        operatingSystem={operatingSystem}
        installCommand={personalizedInstallCommand}
        isInstallCommandLoading={isInstallCommandLoading}
        isWebSocketSupported={isWebSocketSupported}
        host={host}
        onClose={handleCloseModal}
        onInstallEngaged={handleInstallEngaged}
      />
      <ConnectInstallPasteModal
        isOpen={isPasteModalOpen}
        onClose={handleClosePasteModal}
      />
    </>
  );
}
