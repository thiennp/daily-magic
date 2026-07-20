"use client";

import { useCallback, useState } from "react";

import useConnectInstallPasteModalDismissal from "@/features/home/hooks/useConnectInstallPasteModalDismissal";
import { useLinkLocalAgentAccount } from "@/features/home/hooks/useLinkLocalAgentAccount";
import type { BrowserOperatingSystem } from "@/features/home/utils/detectBrowserOperatingSystem";

const useConnectThisMacRowFlow = (input: {
  readonly appOrigin: string;
  readonly operatingSystem: BrowserOperatingSystem;
  readonly onLinked: () => void;
}): {
  readonly handleCloseModal: () => void;
  readonly handleClosePasteModal: () => void;
  readonly handleInstallEngaged: () => void;
  readonly handleOpenModal: () => void;
  readonly isLinking: boolean;
  readonly isModalOpen: boolean;
  readonly isPasteModalOpen: boolean;
  readonly linkError: string | null;
} => {
  const { appOrigin, operatingSystem, onLinked } = input;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false);
  const [installEngaged, setInstallEngaged] = useState(false);
  const { isLinking, linkError } = useLinkLocalAgentAccount({
    appOrigin,
    autoLink: installEngaged,
    silentFailures: !installEngaged,
    onLinked,
  });

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleInstallEngaged = useCallback(() => {
    setInstallEngaged(true);
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
    isLinking,
    onClose: handleClosePasteModal,
  });

  return {
    handleCloseModal,
    handleClosePasteModal,
    handleInstallEngaged,
    handleOpenModal,
    isLinking,
    isModalOpen,
    isPasteModalOpen,
    linkError,
  };
};

export default useConnectThisMacRowFlow;
