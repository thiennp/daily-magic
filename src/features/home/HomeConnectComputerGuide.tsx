"use client";

import { useCallback, useState, useSyncExternalStore } from "react";

import AppHero from "@/components/surfaces/AppHero";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_EYEBROW_TEXT_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import AgentWitchUnsupportedHostNotice from "@/features/home/AgentWitchUnsupportedHostNotice";
import ConnectComputerGuideSteps from "@/features/home/ConnectComputerGuideSteps";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import { useLinkLocalAgentAccount } from "@/features/home/hooks/useLinkLocalAgentAccount";
import {
  buildConnectInstallConnectionStatus,
  buildConnectInstallConnectionStatusClassName,
} from "@/features/home/utils/buildConnectInstallConnectionStatus";
import { shouldShowAgentWitchAppDownloadCta } from "@/features/home/utils/shouldShowAgentWitchAppDownloadCta";
import { MAC_WORKER_BENEFIT_COPY } from "@/lib/copy/macWorkerBenefitCopy.constant";
import detectBrowserOperatingSystem from "@/features/home/utils/detectBrowserOperatingSystem";

interface HomeConnectComputerGuideProps {
  readonly appOrigin: string;
  readonly dmgDownloadUrl: string;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
  readonly onLinked: () => void;
}

const subscribeToOperatingSystem = () => () => undefined;

const getServerOperatingSystemSnapshot = () => "other" as const;

export default function HomeConnectComputerGuide({
  appOrigin,
  dmgDownloadUrl,
  isWebSocketSupported,
  host,
  onLinked,
}: HomeConnectComputerGuideProps) {
  const [installEngaged, setInstallEngaged] = useState(false);
  const { isCheckingLocalApp, isLocalAppInstalled } =
    useLocalMacBrowserContext();
  const showDownloadCta = shouldShowAgentWitchAppDownloadCta({
    isCheckingLocalApp,
    isLocalAppInstalled,
  });
  const { isLinking, linkError } = useLinkLocalAgentAccount({
    appOrigin,
    autoLink: true,
    silentFailures: !installEngaged && !isLocalAppInstalled,
    onLinked,
  });
  const operatingSystem = useSyncExternalStore(
    subscribeToOperatingSystem,
    detectBrowserOperatingSystem,
    getServerOperatingSystemSnapshot,
  );
  const connectionStatus = buildConnectInstallConnectionStatus({
    installEngaged: installEngaged || isLocalAppInstalled,
    isLinking,
    linkError,
  });

  const handleInstallEngaged = useCallback(() => {
    setInstallEngaged(true);
  }, []);

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

      {isWebSocketSupported && showDownloadCta ? (
        <ConnectComputerGuideSteps
          operatingSystem={operatingSystem}
          dmgDownloadUrl={dmgDownloadUrl}
          isWebSocketSupported={isWebSocketSupported}
          showDownloadCta={showDownloadCta}
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
    </AppHero>
  );
}
