"use client";

import DeleteLocalMacModal from "@/features/home/DeleteLocalMacModal";
import UpdateLocalMacModal from "@/features/home/UpdateLocalMacModal";

interface MacDevicePickerLocalInstallModalsProps {
  readonly isUpdateLocalModalOpen: boolean;
  readonly isDeleteLocalModalOpen: boolean;
  readonly updateLocalCommand: string;
  readonly deleteLocalCommand: string;
  readonly wakePort: number | null;
  readonly closeUpdateLocalModal: () => void;
  readonly closeDeleteLocalModal: () => void;
}

export default function MacDevicePickerLocalInstallModals({
  isUpdateLocalModalOpen,
  isDeleteLocalModalOpen,
  updateLocalCommand,
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
