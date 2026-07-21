"use client";

import { useSyncExternalStore } from "react";

import AppHero from "@/components/surfaces/AppHero";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_EYEBROW_TEXT_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import AgentWitchUnsupportedHostNotice from "@/features/home/AgentWitchUnsupportedHostNotice";
import ConnectComputerGuideSteps from "@/features/home/ConnectComputerGuideSteps";
import ConnectCursorCloudCard from "@/features/home/ConnectCursorCloudCard";
import ConnectInstallPasteModal from "@/features/home/ConnectInstallPasteModal";
import useHomeConnectComputerGuideFlow from "@/features/home/hooks/useHomeConnectComputerGuideFlow";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import usePersonalizedAgentWitchInstallCommand from "@/features/home/hooks/usePersonalizedAgentWitchInstallCommand";
import { buildConnectInstallConnectionStatusClassName } from "@/features/home/utils/buildConnectInstallConnectionStatus";
import { shouldShowAgentWitchAppDownloadCta } from "@/features/home/utils/shouldShowAgentWitchAppDownloadCta";
import detectBrowserOperatingSystem from "@/features/home/utils/detectBrowserOperatingSystem";
import { MAC_WORKER_BENEFIT_COPY } from "@/lib/copy/macWorkerBenefitCopy.constant";

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
  const showInstallCta = shouldShowAgentWitchAppDownloadCta({
    isCheckingLocalApp,
    isLocalAppInstalled,
  });
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
  });
  const operatingSystem = useSyncExternalStore(
    subscribeToOperatingSystem,
    detectBrowserOperatingSystem,
    getServerOperatingSystemSnapshot,
  );

  return (
    <AppHero variant="plain">
      <p className={APP_SURFACE_EYEBROW_TEXT_CLASS}>
        {MAC_WORKER_BENEFIT_COPY.setupEyebrow}
      </p>
      <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-gray-900 dark:text-white/90">
        {isLocalAppInstalled
          ? MAC_WORKER_BENEFIT_COPY.setupTitleAppReady
          : MAC_WORKER_BENEFIT_COPY.setupTitle}
      </h1>
      <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        {isLocalAppInstalled
          ? MAC_WORKER_BENEFIT_COPY.setupDescriptionAppReady
          : MAC_WORKER_BENEFIT_COPY.setupDescription}
      </p>

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

      <ConnectInstallPasteModal
        isOpen={isPasteModalOpen}
        onClose={handleClosePasteModal}
      />

      <ConnectCursorCloudCard />
    </AppHero>
  );
}
