"use client";

import DeleteLocalMacModal from "@/features/home/DeleteLocalMacModal";
import UpdateLocalMacModal from "@/features/home/UpdateLocalMacModal";

interface MacDevicePickerLocalInstallModalsProps {
  readonly isUpdateLocalModalOpen: boolean;
  readonly isDeleteLocalModalOpen: boolean;
  readonly updateLocalCommand: string;
  readonly isUpdateLocalCommandLoading: boolean;
  readonly updateLocalCommandError: string | null;
  readonly deleteLocalCommand: string;
  readonly wakePort: number | null;
  readonly closeUpdateLocalModal: () => void;
  readonly closeDeleteLocalModal: () => void;
}

export default function MacDevicePickerLocalInstallModals({
  isUpdateLocalModalOpen,
  isDeleteLocalModalOpen,
  updateLocalCommand,
  isUpdateLocalCommandLoading,
  updateLocalCommandError,
  deleteLocalCommand,
  wakePort,
  closeUpdateLocalModal,
  closeDeleteLocalModal,
}: MacDevicePickerLocalInstallModalsProps) {
  return (
    <>
      <UpdateLocalMacModal
        isOpen={isUpdateLocalModalOpen}
        updateCommand={updateLocalCommand}
        isUpdateCommandLoading={isUpdateLocalCommandLoading}
        updateCommandError={updateLocalCommandError}
        onClose={closeUpdateLocalModal}
      />
      <DeleteLocalMacModal
        isOpen={isDeleteLocalModalOpen}
        deleteCommand={deleteLocalCommand}
        wakePort={wakePort}
        onClose={closeDeleteLocalModal}
      />
    </>
  );
}
