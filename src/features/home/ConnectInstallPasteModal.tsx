"use client";

import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

interface ConnectInstallPasteModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export default function ConnectInstallPasteModal({
  isOpen,
  onClose,
}: ConnectInstallPasteModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      className="max-w-md p-6"
    >
      <h2
        id="connect-install-paste-modal-title"
        className="text-lg font-semibold text-gray-900 dark:text-white/90"
      >
        Paste into Terminal
      </h2>
      <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        Click inside Terminal, paste with Command (⌘) + V, then press Return.
        After install, choose an AI at{" "}
        <a href="/setup/writer" className="underline">
          /setup/writer
        </a>
        .
      </p>
      <Button onClick={onClose} className="mt-6 w-full">
        OK
      </Button>
    </Modal>
  );
}
