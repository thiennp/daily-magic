"use client";

import { Modal } from "@/components/ui/modal";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import CopyableBashCommand from "@/features/home/CopyableBashCommand";

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
      <h2 className="pr-10 text-lg font-semibold text-gray-900 dark:text-white/90">
        Update local Agent Witch
      </h2>
      <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        On this Mac, open Terminal, paste this command, and press Return. It
        downloads the latest install bundle from Agent Witch and repairs your
        local install—you can close this page after copying.
      </p>

      {updateCommandError !== null ? (
        <p className="mt-3 text-sm text-red-600 dark:text-red-400">
          {updateCommandError}
        </p>
      ) : null}

      {isUpdateCommandLoading ? (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Preparing your update command…
        </p>
      ) : (
        <CopyableBashCommand command={updateCommand} variant="bash" />
      )}
    </Modal>
  );
}
