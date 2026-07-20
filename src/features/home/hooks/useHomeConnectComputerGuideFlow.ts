"use client";

import { useCallback, useState } from "react";

import useConnectInstallPasteModalDismissal from "@/features/home/hooks/useConnectInstallPasteModalDismissal";
import useInstallConnectionStatus from "@/features/home/hooks/useInstallConnectionStatus";
import { useLinkLocalAgentAccount } from "@/features/home/hooks/useLinkLocalAgentAccount";
import {
  buildConnectInstallConnectionStatus,
  type ConnectInstallConnectionStatus,
} from "@/features/home/utils/buildConnectInstallConnectionStatus";

const useHomeConnectComputerGuideFlow = (input: {
  readonly appOrigin: string;
  readonly isLocalAppInstalled: boolean;
  readonly onLinked: () => void;
}): {
  readonly connectionStatus: ConnectInstallConnectionStatus | null;
  readonly handleClosePasteModal: () => void;
  readonly handleInstallEngaged: () => void;
  readonly isPasteModalOpen: boolean;
  readonly isLinking: boolean;
} => {
  const { appOrigin, isLocalAppInstalled, onLinked } = input;
  const [installEngaged, setInstallEngaged] = useState(false);
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false);
  const installFlowActive = installEngaged || isLocalAppInstalled;
  const { isInstallConnectionFinished } = useInstallConnectionStatus({
    enabled: installFlowActive,
  });
  const { isLinking, linkError } = useLinkLocalAgentAccount({
    appOrigin,
    autoLink: true,
    silentFailures: !installEngaged && !isLocalAppInstalled,
    onLinked,
  });
  const connectionStatus = buildConnectInstallConnectionStatus({
    installEngaged: installFlowActive,
    isLinking,
    isInstallConnectionFinished,
    linkError,
  });

  const handleInstallEngaged = useCallback(() => {
    setInstallEngaged(true);
    setIsPasteModalOpen(true);
  }, []);

  const handleClosePasteModal = useCallback(() => {
    setIsPasteModalOpen(false);
  }, []);

  useConnectInstallPasteModalDismissal({
    isOpen: isPasteModalOpen,
    isLinking,
    onClose: handleClosePasteModal,
  });

  return {
    connectionStatus,
    handleClosePasteModal,
    handleInstallEngaged,
    isPasteModalOpen,
    isLinking,
  };
};

export default useHomeConnectComputerGuideFlow;
