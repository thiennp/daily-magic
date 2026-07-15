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
  readonly isWebSocketSupported: boolean;
  readonly host: string;
  readonly hasExistingDevices: boolean;
  readonly onClose: () => void;
  readonly onInstallEngaged: () => void;
}

export default function ConnectAnotherMacModal({
  isOpen,
  installCommand,
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
        {intro} Install opens Home in your browser on that Mac — stay signed in
        so Agent Witch can link this computer to your account. Wake alone does
        not link; the browser on that Mac must reach Home at least once.
      </p>

      {!isWebSocketSupported ? (
        <div className="mt-4">
          <AgentWitchUnsupportedHostNotice host={host} />
        </div>
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
