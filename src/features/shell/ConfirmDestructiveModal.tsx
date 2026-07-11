"use client";

import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";

interface ConfirmDestructiveModalProps {
  readonly isOpen: boolean;
  readonly title: string;
  readonly description: string;
  readonly confirmLabel?: string;
  readonly isConfirming?: boolean;
  readonly onClose: () => void;
  readonly onConfirm: () => void;
}

export default function ConfirmDestructiveModal({
  isOpen,
  title,
  description,
  confirmLabel = "Confirm",
  isConfirming = false,
  onClose,
  onConfirm,
}: ConfirmDestructiveModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      className="max-w-md p-6"
    >
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        {title}
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {description}
      </p>
      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <Button variant="outline" onClick={onClose} disabled={isConfirming}>
          Cancel
        </Button>
        <Button
          variant="outline"
          className="border-error-200 text-error-700 hover:bg-error-50 dark:border-error-900/50 dark:text-error-300 dark:hover:bg-error-950/30"
          disabled={isConfirming}
          onClick={onConfirm}
        >
          {isConfirming ? "Working…" : confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
