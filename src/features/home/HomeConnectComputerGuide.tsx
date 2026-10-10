"use client";

import { useSyncExternalStore } from "react";

import useIsMobileClient from "@/hooks/useIsMobileClient";
import AppHero from "@/components/surfaces/AppHero";
import AgentWitchUnsupportedHostNotice from "@/features/home/AgentWitchUnsupportedHostNotice";
import ConnectComputerGuideSteps from "@/features/home/ConnectComputerGuideSteps";
import ConnectInstallPasteModal from "@/features/home/ConnectInstallPasteModal";
import {
  useHomeConnectComputerGuideFlow,
  useLocalMacBrowserContext,
  usePersonalizedAgentWitchInstallCommand,
} from "@/features/home/hooks/public-api/presentation";
import {
  buildConnectInstallConnectionStatusClassName,
  resolveHomeConnectGuideCtas,
  detectBrowserOperatingSystem,
} from "@/features/home/utils/public-api/presentation";
import HomeConnectGuideDownloadExtras from "@/features/home/HomeConnectGuideDownloadExtras";
import HomeConnectGuideHeroCopy from "@/features/home/HomeConnectGuideHeroCopy";

interface HomeConnectComputerGuideProps {
  readonly appOrigin: string;
  readonly installCommand: string;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
  readonly onLinked: () => void;
}

const subscribeToOperatingSystem = () => () => undefined;

const getServerOperatingSystemSnapshot = () => "other" as const;

export default function HomeConnectComputerGuide({
  installCommand,
  isWebSocketSupported,
  host,
  onLinked,
}: HomeConnectComputerGuideProps) {
  const { isCheckingLocalApp, isLocalAppInstalled } =
    useLocalMacBrowserContext();
  const isMobileClient = useIsMobileClient();
  const { showConnectInstallCommand: showInstallCta, showAppDownloadCta } =
    resolveHomeConnectGuideCtas({
      isMobileClient,
      isCheckingLocalApp,
      isLocalAppInstalled,
    });
  const operatingSystem = useSyncExternalStore(
    subscribeToOperatingSystem,
    detectBrowserOperatingSystem,
    getServerOperatingSystemSnapshot,
  );
  const {
    installCommand: personalizedInstallCommand,
    isLoading: isInstallCommandLoading,
    error: installCommandError,
  } = usePersonalizedAgentWitchInstallCommand({
    enabled: showInstallCta,
    fallbackInstallCommand: installCommand,
  });
  const {
    connectionStatus,
    handleClosePasteModal,
    handleInstallEngaged,
    isPasteModalOpen,
  } = useHomeConnectComputerGuideFlow({
    onLinked,
    operatingSystem,
  });

  return (
    <AppHero variant="plain">
      <HomeConnectGuideHeroCopy isLocalAppInstalled={isLocalAppInstalled} />

      {!isWebSocketSupported ? (
        <div className="mt-6">
          <AgentWitchUnsupportedHostNotice host={host} />
        </div>
      ) : null}

      {isWebSocketSupported && showInstallCta ? (
        <ConnectComputerGuideSteps
          operatingSystem={operatingSystem}
          installCommand={personalizedInstallCommand}
          isInstallCommandLoading={isInstallCommandLoading}
          installCommandError={installCommandError}
          isWebSocketSupported={isWebSocketSupported}
          showInstallCta={showInstallCta}
          onInstallEngaged={handleInstallEngaged}
        />
      ) : null}

      {isWebSocketSupported && connectionStatus !== null ? (
        <p
          className={buildConnectInstallConnectionStatusClassName(
            connectionStatus.tone,
          )}
          role="status"
        >
          {connectionStatus.message}
        </p>
      ) : null}

      <HomeConnectGuideDownloadExtras
        operatingSystem={operatingSystem}
        isWebSocketSupported={isWebSocketSupported}
        showInstallCta={showAppDownloadCta}
      />

      <ConnectInstallPasteModal
        isOpen={isPasteModalOpen}
        onClose={handleClosePasteModal}
      />
    </AppHero>
  );
}
