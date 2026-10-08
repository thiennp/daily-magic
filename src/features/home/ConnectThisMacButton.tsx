"use client";

import { useSyncExternalStore } from "react";

import useIsMobileClient from "@/hooks/useIsMobileClient";
import { APP_SURFACE_CTA_SECONDARY_SM_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import ConnectInstallPasteModal from "@/features/home/ConnectInstallPasteModal";
import ConnectThisMacModal from "@/features/home/ConnectThisMacModal";
import useConnectThisMacModalNotice from "@/features/home/hooks/useConnectThisMacModalNotice";
import useConnectThisMacRowFlow from "@/features/home/hooks/useConnectThisMacRowFlow";
import useConnectTerminalSection from "@/features/home/hooks/useConnectTerminalSection";
import usePersonalizedAgentWitchInstallCommand from "@/features/home/hooks/usePersonalizedAgentWitchInstallCommand";
import detectBrowserOperatingSystem from "@/features/home/utils/detectBrowserOperatingSystem";

interface ConnectThisMacButtonProps {
  readonly installCommand: string;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
  readonly className?: string;
  readonly fullWidth?: boolean;
}

const subscribeToOperatingSystem = () => () => undefined;

const getServerOperatingSystemSnapshot = () => "other" as const;

export default function ConnectThisMacButton({
  installCommand,
  isWebSocketSupported,
  host,
  className = APP_SURFACE_CTA_SECONDARY_SM_CLASS,
  fullWidth = false,
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
  const { notice, isRetrying, retry } = useConnectThisMacModalNotice({
    isModalOpen,
  });
  const { shouldMintCommand, onTerminalSectionToggle } =
    useConnectTerminalSection({ operatingSystem, isModalOpen });
  const {
    installCommand: personalizedInstallCommand,
    isLoading: isInstallCommandLoading,
    error: installCommandError,
  } = usePersonalizedAgentWitchInstallCommand({
    enabled: shouldMintCommand,
    fallbackInstallCommand: installCommand,
    commitIdentityWhenDisabled: true,
  });
  const isMobileClient = useIsMobileClient();

  if (isMobileClient) {
    return null;
  }

  return (
    <>
      <div
        className={
          fullWidth
            ? "flex w-full flex-col gap-2"
            : "flex w-full flex-col gap-2 sm:w-auto"
        }
      >
        {/* Never disabled: Connect this computer always opens the modal (loading shows inside). */}
        <button
          type="button"
          className={className}
          aria-haspopup="dialog"
          onClick={handleOpenModal}
        >
          Connect this computer
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
        installCommandError={installCommandError}
        onTerminalSectionToggle={onTerminalSectionToggle}
        isWebSocketSupported={isWebSocketSupported}
        host={host}
        onClose={handleCloseModal}
        onInstallEngaged={handleInstallEngaged}
        notice={notice}
        isRetrying={isRetrying}
        onRetry={retry}
      />
      <ConnectInstallPasteModal
        isOpen={isPasteModalOpen}
        onClose={handleClosePasteModal}
      />
    </>
  );
}
