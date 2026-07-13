"use client";

import { useCallback, useState, useSyncExternalStore } from "react";

import AppHero from "@/components/surfaces/AppHero";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_EYEBROW_TEXT_CLASS,
  APP_SURFACE_NESTED_CARD_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import AgentWitchUnsupportedHostNotice from "@/features/home/AgentWitchUnsupportedHostNotice";
import ConnectInstallPasteModal from "@/features/home/ConnectInstallPasteModal";
import CopyableBashCommand from "@/features/home/CopyableBashCommand";
import buildConnectComputerGuideSteps, {
  CONNECT_COMPUTER_COPY_STEP_TITLE,
} from "@/features/home/utils/buildConnectComputerGuideSteps";
import {
  buildConnectInstallConnectionStatus,
  buildConnectInstallConnectionStatusClassName,
} from "@/features/home/utils/buildConnectInstallConnectionStatus";
import detectBrowserOperatingSystem from "@/features/home/utils/detectBrowserOperatingSystem";

interface HomeConnectComputerGuideProps {
  readonly installCommand: string;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
  readonly isLinking?: boolean;
  readonly linkError?: string | null;
}

const subscribeToOperatingSystem = () => () => undefined;

const getServerOperatingSystemSnapshot = () => "other" as const;

export default function HomeConnectComputerGuide({
  installCommand,
  isWebSocketSupported,
  host,
  isLinking = false,
  linkError = null,
}: HomeConnectComputerGuideProps) {
  const [installEngaged, setInstallEngaged] = useState(false);
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false);
  const operatingSystem = useSyncExternalStore(
    subscribeToOperatingSystem,
    detectBrowserOperatingSystem,
    getServerOperatingSystemSnapshot,
  );
  const steps = buildConnectComputerGuideSteps(operatingSystem);
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

  return (
    <AppHero variant="brand">
      <p className={APP_SURFACE_EYEBROW_TEXT_CLASS}>Connect your computer</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white/90">
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

      <ol className="mt-6 space-y-4">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className={`flex gap-4 ${APP_SURFACE_NESTED_CARD_CLASS}`}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white">
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white/90">
                {step.title}
              </p>
              <p className={`mt-1 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
                {step.description}
              </p>
              {isWebSocketSupported &&
              step.title === CONNECT_COMPUTER_COPY_STEP_TITLE ? (
                <CopyableBashCommand
                  command={installCommand}
                  iconOnly
                  variant="bash"
                  onEngaged={handleInstallEngaged}
                />
              ) : null}
            </div>
          </li>
        ))}
      </ol>

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
