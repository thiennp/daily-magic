"use client";

import { Modal } from "@/components/ui/modal";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import CopyableBashCommand from "@/features/home/CopyableBashCommand";
import { buildAgentWitchWakeTerminalCommand } from "./buildAgentWitchWakeTerminalCommand";
import { requestAgentWitchWake } from "./requestAgentWitchWake";

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
        Turn on this Mac
      </h2>
      <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        {displayName} is offline. Power it on, then open Terminal and run:
      </p>
      <CopyableBashCommand command={wakeCommand} variant="bash" />
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
