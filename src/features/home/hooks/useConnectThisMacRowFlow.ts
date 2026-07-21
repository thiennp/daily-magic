"use client";

import { useCallback, useState } from "react";

import useConnectInstallPasteModalDismissal from "@/features/home/hooks/useConnectInstallPasteModalDismissal";
import type { BrowserOperatingSystem } from "@/features/home/utils/detectBrowserOperatingSystem";

const useConnectThisMacRowFlow = (input: {
  readonly operatingSystem: BrowserOperatingSystem;
}): {
  readonly handleCloseModal: () => void;
  readonly handleClosePasteModal: () => void;
  readonly handleInstallEngaged: () => void;
  readonly handleOpenModal: () => void;
  readonly isModalOpen: boolean;
  readonly isPasteModalOpen: boolean;
} => {
  const { operatingSystem } = input;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleInstallEngaged = useCallback(() => {
    setIsModalOpen(false);
    if (operatingSystem === "mac") {
      setIsPasteModalOpen(true);
    }
  }, [operatingSystem]);

  const handleClosePasteModal = useCallback(() => {
    setIsPasteModalOpen(false);
  }, []);

  useConnectInstallPasteModalDismissal({
    isOpen: isPasteModalOpen,
    isLinking: false,
    onClose: handleClosePasteModal,
  });

  return {
    handleCloseModal,
    handleClosePasteModal,
    handleInstallEngaged,
    handleOpenModal,
    isModalOpen,
    isPasteModalOpen,
  };
};

export default useConnectThisMacRowFlow;
