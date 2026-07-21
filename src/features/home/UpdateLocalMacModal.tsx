"use client";

import { Modal } from "@/components/ui/modal";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import CopyableBashCommand from "@/features/home/CopyableBashCommand";

interface UpdateLocalMacModalProps {
  readonly isOpen: boolean;
  readonly updateCommand: string;
  readonly onClose: () => void;
}

export default function UpdateLocalMacModal({
  isOpen,
  updateCommand,
  onClose,
}: UpdateLocalMacModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg p-6">
      <h2 className="pr-10 text-lg font-semibold text-gray-900 dark:text-white/90">
        Update local Agent Witch
      </h2>
      <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        On this Mac, open Terminal, paste this command, and press Return. It
        stops the running background services, replaces your local install files
        with the latest version, and restarts Agent Witch with the same Mac
        link—no new device row. You can close this page after copying.
      </p>
      <CopyableBashCommand command={updateCommand} variant="bash" />
    </Modal>
  );
}
