"use client";

import { useCallback, useState } from "react";

import useConnectInstallPasteModalDismissal from "@/features/home/hooks/useConnectInstallPasteModalDismissal";
import useInstallConnectionStatus from "@/features/home/hooks/useInstallConnectionStatus";
import {
  buildConnectInstallConnectionStatus,
  type ConnectInstallConnectionStatus,
} from "@/features/home/utils/buildConnectInstallConnectionStatus";
import type { BrowserOperatingSystem } from "@/features/home/utils/detectBrowserOperatingSystem";
import { shouldOpenConnectInstallPasteModal } from "@/features/home/utils/shouldOpenConnectInstallPasteModal";

const useHomeConnectComputerGuideFlow = (input: {
  readonly onLinked: () => void;
  readonly operatingSystem: BrowserOperatingSystem;
}): {
  readonly connectionStatus: ConnectInstallConnectionStatus | null;
  readonly handleClosePasteModal: () => void;
  readonly handleInstallEngaged: () => void;
  readonly isPasteModalOpen: boolean;
} => {
  const { onLinked, operatingSystem } = input;
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
    if (shouldOpenConnectInstallPasteModal(operatingSystem)) {
      setIsPasteModalOpen(true);
    }
  }, [operatingSystem]);

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
