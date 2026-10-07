"use client";

import { Modal } from "@/components/ui/modal";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import CopyableBashCommand from "@/features/home/CopyableBashCommand";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

interface UpdateLocalMacModalProps {
  readonly isOpen: boolean;
  readonly updateCommand: string;
  readonly isUpdateCommandLoading: boolean;
  readonly updateCommandError: string | null;
  readonly onClose: () => void;
}

export default function UpdateLocalMacModal({
  isOpen,
  updateCommand,
  isUpdateCommandLoading,
  updateCommandError,
  onClose,
}: UpdateLocalMacModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg p-6">
      <h2 className="pr-10 text-lg font-semibold text-awc-fg dark:text-white/90">
        Update {AGENT_WITCH_PRODUCT_NAME} on this computer
      </h2>
      <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        On this computer, open Terminal, paste this command, and press Return.
        It includes your account link (same as Connect this computer), stops
        background services, replaces your local install files with the latest
        version, and restarts {AGENT_WITCH_PRODUCT_NAME}. You can close this
        page after copying.
      </p>
      {updateCommandError !== null ? (
        <p className="mt-3 text-sm text-red-600 dark:text-red-400">
          {updateCommandError}
        </p>
      ) : null}
      {isUpdateCommandLoading ? (
        <p className="mt-4 text-sm text-awc-fg-muted dark:text-gray-400">
          Preparing your install command…
        </p>
      ) : (
        <CopyableBashCommand command={updateCommand} variant="bash" />
      )}
    </Modal>
  );
}
