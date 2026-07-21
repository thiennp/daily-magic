"use client";

import { useCallback, useState } from "react";

import useConnectInstallPasteModalDismissal from "@/features/home/hooks/useConnectInstallPasteModalDismissal";
import useInstallConnectionStatus from "@/features/home/hooks/useInstallConnectionStatus";
import {
  buildConnectInstallConnectionStatus,
  type ConnectInstallConnectionStatus,
} from "@/features/home/utils/buildConnectInstallConnectionStatus";

const useHomeConnectComputerGuideFlow = (input: {
  readonly onLinked: () => void;
}): {
  readonly connectionStatus: ConnectInstallConnectionStatus | null;
  readonly handleClosePasteModal: () => void;
  readonly handleInstallEngaged: () => void;
  readonly isPasteModalOpen: boolean;
} => {
  const { onLinked } = input;
  const [installEngaged, setInstallEngaged] = useState(false);
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false);
  const { isInstallConnectionFinished } = useInstallConnectionStatus({
    enabled: installEngaged,
  });
  const connectionStatus = buildConnectInstallConnectionStatus({
    installEngaged,
    isInstallConnectionFinished,
  });

  const handleInstallEngaged = useCallback(() => {
    setInstallEngaged(true);
    setIsPasteModalOpen(true);
  }, []);

  const handleClosePasteModal = useCallback(() => {
    setIsPasteModalOpen(false);
    if (isInstallConnectionFinished) {
      onLinked();
    }
  }, [isInstallConnectionFinished, onLinked]);

  useConnectInstallPasteModalDismissal({
    isOpen: isPasteModalOpen,
    isLinking: false,
    onClose: handleClosePasteModal,
  });

  return {
    connectionStatus,
    handleClosePasteModal,
    handleInstallEngaged,
    isPasteModalOpen,
  };
};

export default useHomeConnectComputerGuideFlow;
