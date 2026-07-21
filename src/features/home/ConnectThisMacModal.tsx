"use client";

import { Modal } from "@/components/ui/modal";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import AgentWitchUnsupportedHostNotice from "@/features/home/AgentWitchUnsupportedHostNotice";
import CopyableBashCommand from "@/features/home/CopyableBashCommand";
import type { BrowserOperatingSystem } from "@/features/home/utils/detectBrowserOperatingSystem";
import { MAC_WORKER_BENEFIT_COPY } from "@/lib/copy/macWorkerBenefitCopy.constant";

interface ConnectThisMacModalProps {
  readonly isOpen: boolean;
  readonly operatingSystem: BrowserOperatingSystem;
  readonly installCommand: string;
  readonly isInstallCommandLoading: boolean;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
  readonly onClose: () => void;
  readonly onInstallEngaged: () => void;
}

export default function ConnectThisMacModal({
  isOpen,
  operatingSystem,
  installCommand,
  isInstallCommandLoading,
  isWebSocketSupported,
  host,
  onClose,
  onInstallEngaged,
}: ConnectThisMacModalProps) {
  const isMacBrowser = operatingSystem === "mac";

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg p-6">
      <h2 className="pr-10 text-lg font-semibold text-gray-900 dark:text-white/90">
        Connect this Mac
      </h2>

      {!isWebSocketSupported ? (
        <div className="mt-4">
          <AgentWitchUnsupportedHostNotice host={host} />
        </div>
      ) : isMacBrowser ? (
        <>
          <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
            {MAC_WORKER_BENEFIT_COPY.connectThisMacModalIntro} You can close
            this page after copying—the command adds your account on this Mac
            when you run it in Terminal, without replacing another account’s
            profile.
          </p>
          {isInstallCommandLoading ? (
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Preparing your install command…
            </p>
          ) : (
            <CopyableBashCommand
              command={installCommand}
              variant="bash"
              onEngaged={onInstallEngaged}
            />
          )}
        </>
      ) : (
        <div className={`mt-3 space-y-4 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
          <p>{MAC_WORKER_BENEFIT_COPY.connectThisMacMobileModalIntro}</p>
          <ol className="list-decimal space-y-2 pl-5 text-sm">
            {MAC_WORKER_BENEFIT_COPY.connectThisMacMobileSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </Modal>
  );
}
