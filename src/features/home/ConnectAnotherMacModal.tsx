"use client";

import { Modal } from "@/components/ui/modal";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import AgentWitchUnsupportedHostNotice from "@/features/home/AgentWitchUnsupportedHostNotice";
import CopyableBashCommand from "@/features/home/CopyableBashCommand";
import { resolveConnectAnotherMacLabel } from "@/features/home/utils/resolveConnectAnotherMacLabel";
import { MAC_WORKER_BENEFIT_COPY } from "@/lib/copy/macWorkerBenefitCopy.constant";

interface ConnectAnotherMacModalProps {
  readonly isOpen: boolean;
  readonly installCommand: string;
  readonly isInstallCommandLoading: boolean;
  readonly installCommandError: string | null;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
  readonly hasExistingDevices: boolean;
  readonly onClose: () => void;
  readonly onInstallEngaged: () => void;
}

export default function ConnectAnotherMacModal({
  isOpen,
  installCommand,
  isInstallCommandLoading,
  installCommandError,
  isWebSocketSupported,
  host,
  hasExistingDevices,
  onClose,
  onInstallEngaged,
}: ConnectAnotherMacModalProps) {
  const title = resolveConnectAnotherMacLabel(hasExistingDevices);
  const intro = hasExistingDevices
    ? MAC_WORKER_BENEFIT_COPY.setupAnotherModalIntro
    : MAC_WORKER_BENEFIT_COPY.setupModalIntro;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg p-6">
      <h2 className="pr-10 text-lg font-semibold text-gray-900 dark:text-white/90">
        {title}
      </h2>
      <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        {intro} You can close this page after copying—the command links that Mac
        to your account when you run it in Terminal.
      </p>

      {installCommandError !== null ? (
        <p className="mt-3 text-sm text-red-600 dark:text-red-400">
          {installCommandError}
        </p>
      ) : null}

      {!isWebSocketSupported ? (
        <div className="mt-4">
          <AgentWitchUnsupportedHostNotice host={host} />
        </div>
      ) : isInstallCommandLoading ? (
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
    </Modal>
  );
}
