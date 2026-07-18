"use client";

import Button from "@/components/ui/button/Button";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

interface ConnectInstallPasteModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export default function ConnectInstallPasteModal({
  isOpen,
  onClose,
}: ConnectInstallPasteModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-99999 flex items-center justify-center overflow-y-auto p-4">
      <div
        className="fixed inset-0 bg-gray-400/50 backdrop-blur-[32px]"
        aria-hidden="true"
      />
      <div
        className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-theme-sm dark:bg-gray-800"
        role="dialog"
        aria-modal="true"
        aria-labelledby="connect-install-paste-modal-title"
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
      </div>
    </div>
  );
}
