"use client";

import { useCallback, useState } from "react";

import confirmMacDeviceDeleteLocalInstall from "@/features/agent-witch/macDevices/utils/confirmMacDeviceDeleteLocalInstall";
import usePersonalizedAgentWitchInstallCommand from "@/features/home/hooks/usePersonalizedAgentWitchInstallCommand";

const useThisMacLocalInstallActions = (input?: {
  readonly fallbackInstallCommand?: string;
}): {
  readonly onUpdateLocal: () => void;
  readonly onDeleteLocalScript: () => void;
  readonly isUpdateLocalModalOpen: boolean;
  readonly updateLocalCommand: string;
  readonly isUpdateLocalCommandLoading: boolean;
  readonly updateLocalCommandError: string | null;
  readonly closeUpdateLocalModal: () => void;
} => {
  const [isUpdateLocalModalOpen, setIsUpdateLocalModalOpen] = useState(false);
  const {
    installCommand: updateLocalCommand,
    isLoading: isUpdateLocalCommandLoading,
    error: updateLocalCommandError,
  } = usePersonalizedAgentWitchInstallCommand({
    enabled: isUpdateLocalModalOpen,
    fallbackInstallCommand: input?.fallbackInstallCommand ?? "",
  });

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
    isUpdateLocalCommandLoading,
    updateLocalCommandError,
    closeUpdateLocalModal,
  };
};

export default useThisMacLocalInstallActions;
