"use client";

import { useCallback, useState, useSyncExternalStore } from "react";

import AppHero from "@/components/surfaces/AppHero";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_EYEBROW_TEXT_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import AgentWitchUnsupportedHostNotice from "@/features/home/AgentWitchUnsupportedHostNotice";
import ConnectComputerGuideSteps from "@/features/home/ConnectComputerGuideSteps";
import ConnectInstallPasteModal from "@/features/home/ConnectInstallPasteModal";
import useConnectInstallPasteModalDismissal from "@/features/home/hooks/useConnectInstallPasteModalDismissal";
import { useLinkLocalAgentAccount } from "@/features/home/hooks/useLinkLocalAgentAccount";
import {
  buildConnectInstallConnectionStatus,
  buildConnectInstallConnectionStatusClassName,
} from "@/features/home/utils/buildConnectInstallConnectionStatus";
import detectBrowserOperatingSystem from "@/features/home/utils/detectBrowserOperatingSystem";

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
  appOrigin,
  installCommand,
  isWebSocketSupported,
  host,
  onLinked,
}: HomeConnectComputerGuideProps) {
  const [installEngaged, setInstallEngaged] = useState(false);
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false);
  const { isLinking, linkError } = useLinkLocalAgentAccount({
    appOrigin,
    autoLink: true,
    silentFailures: !installEngaged,
    onLinked,
  });
  const operatingSystem = useSyncExternalStore(
    subscribeToOperatingSystem,
    detectBrowserOperatingSystem,
    getServerOperatingSystemSnapshot,
  );
  const connectionStatus = buildConnectInstallConnectionStatus({
    installEngaged,
    isLinking,
    linkError,
  });

  const handleInstallEngaged = useCallback(() => {
    setInstallEngaged(true);
    setIsPasteModalOpen(true);
  }, []);

  const handleClosePasteModal = useCallback(() => {
    setIsPasteModalOpen(false);
  }, []);

  useConnectInstallPasteModalDismissal({
    isOpen: isPasteModalOpen,
    isLinking,
    onClose: handleClosePasteModal,
  });

  return (
    <AppHero variant="plain">
      <p className={APP_SURFACE_EYEBROW_TEXT_CLASS}>Connect your computer</p>
      <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-gray-900 dark:text-white/90">
        Link this account to your Mac
      </h1>
      <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        Run install once on your Mac. This browser talks to the local Agent
        Witch API to link whichever account you are signed in with — no email in
        the install command, and no reinstall when you switch users.
      </p>

      {!isWebSocketSupported ? (
        <div className="mt-6">
          <AgentWitchUnsupportedHostNotice host={host} />
        </div>
      ) : null}

      <ConnectComputerGuideSteps
        operatingSystem={operatingSystem}
        installCommand={installCommand}
        isWebSocketSupported={isWebSocketSupported}
        onInstallEngaged={handleInstallEngaged}
      />

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
    </AppHero>
  );
}
