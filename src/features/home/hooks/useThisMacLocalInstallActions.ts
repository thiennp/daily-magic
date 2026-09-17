"use client";

import { useCallback, useMemo, useState } from "react";

import usePersonalizedAgentWitchInstallCommand from "@/features/home/hooks/usePersonalizedAgentWitchInstallCommand";
import { buildAgentWitchDeleteLocalInstallCommand } from "@/lib/agentWitch/buildAgentWitchDeleteLocalInstallCommand";
import { buildAgentWitchUpdateInstallCommand } from "@/lib/agentWitch/buildAgentWitchUpdateInstallCommand";

const useThisMacLocalInstallActions = (input?: {
  readonly wakePort?: number | null;
}): {
  readonly onUpdateLocal: () => void;
  readonly onDeleteLocalScript: () => void;
  readonly isUpdateLocalModalOpen: boolean;
  readonly isDeleteLocalModalOpen: boolean;
  readonly updateLocalCommand: string;
  readonly isUpdateLocalCommandLoading: boolean;
  readonly updateLocalCommandError: string | null;
  readonly deleteLocalCommand: string;
  readonly wakePort: number | null;
  readonly closeUpdateLocalModal: () => void;
  readonly closeDeleteLocalModal: () => void;
} => {
  const [isUpdateLocalModalOpen, setIsUpdateLocalModalOpen] = useState(false);
  const [isDeleteLocalModalOpen, setIsDeleteLocalModalOpen] = useState(false);
  const wakePort = input?.wakePort ?? null;
  const fallbackUpdateLocalCommand = useMemo(() => {
    if (typeof window === "undefined") {
      return "";
    }

    return buildAgentWitchUpdateInstallCommand(window.location.origin);
  }, []);
  const {
    installCommand: personalizedUpdateLocalCommand,
    isLoading: isUpdateLocalCommandLoading,
    error: updateLocalCommandError,
  } = usePersonalizedAgentWitchInstallCommand({
    enabled: isUpdateLocalModalOpen,
    fallbackInstallCommand: fallbackUpdateLocalCommand,
  });
  const updateLocalCommand = isUpdateLocalModalOpen
    ? personalizedUpdateLocalCommand
    : fallbackUpdateLocalCommand;
  const deleteLocalCommand = useMemo(() => {
    if (typeof window === "undefined") {
      return "";
    }

    return buildAgentWitchDeleteLocalInstallCommand(window.location.origin);
  }, []);

  const onUpdateLocal = useCallback(() => {
    setIsUpdateLocalModalOpen(true);
  }, []);

  const closeUpdateLocalModal = useCallback(() => {
    setIsUpdateLocalModalOpen(false);
  }, []);

  const onDeleteLocalScript = useCallback(() => {
    setIsDeleteLocalModalOpen(true);
  }, []);

  const closeDeleteLocalModal = useCallback(() => {
    setIsDeleteLocalModalOpen(false);
  }, []);

  return {
    onUpdateLocal,
    onDeleteLocalScript,
    isUpdateLocalModalOpen,
    isDeleteLocalModalOpen,
    updateLocalCommand,
    isUpdateLocalCommandLoading,
    updateLocalCommandError,
    deleteLocalCommand,
    wakePort,
    closeUpdateLocalModal,
    closeDeleteLocalModal,
  };
};

export default useThisMacLocalInstallActions;
