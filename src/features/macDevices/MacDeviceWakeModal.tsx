"use client";

import { Modal } from "@/components/ui/modal";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import CopyableBashCommand from "@/features/home/CopyableBashCommand";
import { buildAgentWitchWakeTerminalCommand } from "@/lib/agentWitch/buildAgentWitchWakeTerminalCommand";
import { requestAgentWitchWake } from "@/lib/agentWitch/requestAgentWitchWake";

interface MacDeviceWakeModalProps {
  readonly isOpen: boolean;
  readonly displayName: string;
  readonly isWakeServerReachable: boolean;
  readonly onClose: () => void;
}

export default function MacDeviceWakeModal({
  isOpen,
  displayName,
  isWakeServerReachable,
  onClose,
}: MacDeviceWakeModalProps) {
  const wakeCommand = buildAgentWitchWakeTerminalCommand();

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md p-6">
      <h2 className="pr-10 text-lg font-semibold text-gray-900 dark:text-white/90">
        Reactivate Agent Witch
      </h2>
      <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        If {displayName} is awake but shows offline, open Terminal on that Mac,
        paste this command, and press Return:
      </p>
      <CopyableBashCommand command={wakeCommand} variant="bash" />
      <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        If this still returns an error, re-run the Agent Witch install from
        Home → Your setup to refresh the local wake helper, then try again.
      </p>
      {isWakeServerReachable ? (
        <button
          type="button"
          onClick={() => {
            void requestAgentWitchWake();
          }}
          className="mt-4 text-sm font-medium text-brand-700 hover:underline dark:text-brand-300"
        >
          Try waking Agent Witch from this browser
        </button>
      ) : null}
    </Modal>
  );
}
