"use client";

import { Modal } from "@/components/ui/modal";
import AwlRepairManuallyPanel from "@/features/agent-witch/macDevices/repairManually/AwlRepairManuallyPanel";

interface AwlRepairManuallyModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

/** Cousin of ReviveAwlMacModal / UpdateLocalMacModal: manual repair steps. */
export default function AwlRepairManuallyModal({
  isOpen,
  onClose,
}: AwlRepairManuallyModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg p-6">
      <AwlRepairManuallyPanel />
    </Modal>
  );
}
