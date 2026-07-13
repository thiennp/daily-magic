"use client";

import { useCallback, useState } from "react";

import { APP_SURFACE_TEXT_LINK_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import ConnectAnotherMacModal from "@/features/home/ConnectAnotherMacModal";
import ConnectInstallPasteModal from "@/features/home/ConnectInstallPasteModal";
import useConnectInstallPasteModalDismissal from "@/features/home/hooks/useConnectInstallPasteModalDismissal";

interface ConnectAnotherMacButtonProps {
  readonly installCommand: string;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
  readonly className?: string;
}

export default function ConnectAnotherMacButton({
  installCommand,
  isWebSocketSupported,
  host,
  className,
}: ConnectAnotherMacButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false);

  const handleClosePasteModal = useCallback(() => {
    setIsPasteModalOpen(false);
  }, []);

  useConnectInstallPasteModalDismissal({
    isOpen: isPasteModalOpen,
    isLinking: false,
    onClose: handleClosePasteModal,
  });

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsModalOpen(true);
        }}
        className={className ?? APP_SURFACE_TEXT_LINK_CLASS}
      >
        Connect another Mac
      </button>
      <ConnectAnotherMacModal
        isOpen={isModalOpen}
        installCommand={installCommand}
        isWebSocketSupported={isWebSocketSupported}
        host={host}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onInstallEngaged={() => {
          setIsPasteModalOpen(true);
        }}
      />
      <ConnectInstallPasteModal
        isOpen={isPasteModalOpen}
        onClose={handleClosePasteModal}
      />
    </>
  );
}
