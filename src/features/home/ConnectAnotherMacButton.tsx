"use client";

import { useCallback, useState } from "react";

import { APP_SURFACE_TEXT_LINK_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import ConnectAnotherMacModal from "@/features/home/ConnectAnotherMacModal";
import ConnectInstallPasteModal from "@/features/home/ConnectInstallPasteModal";
import useConnectInstallPasteModalDismissal from "@/features/home/hooks/useConnectInstallPasteModalDismissal";
import { resolveConnectAnotherMacLabel } from "@/features/home/utils/resolveConnectAnotherMacLabel";

interface ConnectAnotherMacButtonProps {
  readonly installCommand: string;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
  readonly hasExistingDevices: boolean;
  readonly className?: string;
}

export default function ConnectAnotherMacButton({
  installCommand,
  isWebSocketSupported,
  host,
  hasExistingDevices,
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

  const actionLabel = resolveConnectAnotherMacLabel(hasExistingDevices);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsModalOpen(true);
        }}
        className={className ?? APP_SURFACE_TEXT_LINK_CLASS}
      >
        {actionLabel}
      </button>
      <ConnectAnotherMacModal
        isOpen={isModalOpen}
        installCommand={installCommand}
        isWebSocketSupported={isWebSocketSupported}
        host={host}
        hasExistingDevices={hasExistingDevices}
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
