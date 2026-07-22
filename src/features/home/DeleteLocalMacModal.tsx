"use client";

import { useCallback, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { requestLocalAgentWitchDeleteInstallFromWakeServer } from "@/features/agent-witch/utils/requestLocalAgentWitchDeleteInstallFromWakeServer";
import DeleteLocalMacModalPhaseContent, {
  type DeleteLocalMacModalPhase,
} from "@/features/home/DeleteLocalMacModalPhaseContent";

interface DeleteLocalMacModalProps {
  readonly isOpen: boolean;
  readonly deleteCommand: string;
  readonly wakePort: number | null;
  readonly onClose: () => void;
}

export default function DeleteLocalMacModal({
  isOpen,
  deleteCommand,
  wakePort,
  onClose,
}: DeleteLocalMacModalProps) {
  const [phase, setPhase] = useState<DeleteLocalMacModalPhase>("confirm");
  const [resultMessage, setResultMessage] = useState("");

  const resetState = useCallback(() => {
    setPhase("confirm");
    setResultMessage("");
  }, []);

  const handleClose = useCallback(() => {
    resetState();
    onClose();
  }, [onClose, resetState]);

  const handleConfirmDelete = useCallback(() => {
    setPhase("deleting");
    void requestLocalAgentWitchDeleteInstallFromWakeServer(wakePort).then(
      (result) => {
        setResultMessage(result.message);
        setPhase(result.ok ? "success" : "manual");
      },
    );
  }, [wakePort]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="max-w-lg p-6">
      <h2 className="pr-10 text-lg font-semibold text-gray-900 dark:text-white/90">
        Delete local Agent Witch
      </h2>
      <DeleteLocalMacModalPhaseContent
        phase={phase}
        resultMessage={resultMessage}
        deleteCommand={deleteCommand}
        onCancel={handleClose}
        onConfirmDelete={handleConfirmDelete}
        onClose={handleClose}
      />
    </Modal>
  );
}
