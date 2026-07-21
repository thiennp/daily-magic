"use client";

import { useCallback, useMemo, useState } from "react";

import { buildAgentWitchSelfUpdateTerminalCommand } from "@/features/agent-witch/online-wake";
import confirmMacDeviceDeleteLocalInstall from "@/features/agent-witch/macDevices/utils/confirmMacDeviceDeleteLocalInstall";

const useThisMacLocalInstallActions = (): {
  readonly onUpdateLocal: () => void;
  readonly onDeleteLocalScript: () => void;
  readonly isUpdateLocalModalOpen: boolean;
  readonly updateLocalCommand: string;
  readonly closeUpdateLocalModal: () => void;
} => {
  const [isUpdateLocalModalOpen, setIsUpdateLocalModalOpen] = useState(false);
  const updateLocalCommand = useMemo(
    () => buildAgentWitchSelfUpdateTerminalCommand(),
    [],
  );

  const onUpdateLocal = useCallback(() => {
    setIsUpdateLocalModalOpen(true);
  }, []);

  const closeUpdateLocalModal = useCallback(() => {
    setIsUpdateLocalModalOpen(false);
  }, []);

  const onDeleteLocalScript = useCallback(() => {
    confirmMacDeviceDeleteLocalInstall();
  }, []);

  return {
    onUpdateLocal,
    onDeleteLocalScript,
    isUpdateLocalModalOpen,
    updateLocalCommand,
    closeUpdateLocalModal,
  };
};

export default useThisMacLocalInstallActions;
