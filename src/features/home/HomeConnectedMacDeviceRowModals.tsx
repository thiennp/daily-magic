"use client";

import DeleteLocalMacModal from "@/features/home/DeleteLocalMacModal";
import UpdateLocalMacModal from "@/features/home/UpdateLocalMacModal";
import type useThisMacLocalInstallActions from "@/features/home/hooks/useThisMacLocalInstallActions";

interface HomeConnectedMacDeviceRowModalsProps {
  readonly actions: ReturnType<typeof useThisMacLocalInstallActions>;
}

/** This-computer local Update / Delete modals for a Devices row. */
export default function HomeConnectedMacDeviceRowModals({
  actions,
}: HomeConnectedMacDeviceRowModalsProps) {
  return (
    <>
      <UpdateLocalMacModal
        isOpen={actions.isUpdateLocalModalOpen}
        updateCommand={actions.updateLocalCommand}
        isUpdateCommandLoading={actions.isUpdateLocalCommandLoading}
        updateCommandError={actions.updateLocalCommandError}
        onClose={actions.closeUpdateLocalModal}
      />
      <DeleteLocalMacModal
        isOpen={actions.isDeleteLocalModalOpen}
        deleteCommand={actions.deleteLocalCommand}
        wakePort={actions.wakePort}
        onClose={actions.closeDeleteLocalModal}
      />
    </>
  );
}
