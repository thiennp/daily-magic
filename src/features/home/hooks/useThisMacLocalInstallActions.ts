"use client";

import { useCallback, useMemo, useState } from "react";

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
  readonly deleteLocalCommand: string;
  readonly wakePort: number | null;
  readonly closeUpdateLocalModal: () => void;
  readonly closeDeleteLocalModal: () => void;
} => {
  const [isUpdateLocalModalOpen, setIsUpdateLocalModalOpen] = useState(false);
  const [isDeleteLocalModalOpen, setIsDeleteLocalModalOpen] = useState(false);
  const wakePort = input?.wakePort ?? null;
  const updateLocalCommand = useMemo(() => {
    if (typeof window === "undefined") {
      return "";
    }

    return buildAgentWitchUpdateInstallCommand(window.location.origin);
  }, []);
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
    deleteLocalCommand,
    wakePort,
    closeUpdateLocalModal,
    closeDeleteLocalModal,
  };
};

export default useThisMacLocalInstallActions;
