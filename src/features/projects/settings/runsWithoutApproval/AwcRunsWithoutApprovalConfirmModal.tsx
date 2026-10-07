"use client";

import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { RUNS_WITHOUT_APPROVAL_COPY as C } from "@/features/projects/settings/runsWithoutApproval/runsWithoutApprovalCopy.constant";

interface AwcRunsWithoutApprovalConfirmModalProps {
  readonly isOpen: boolean;
  readonly onConfirm: () => void;
  readonly onCancel: () => void;
}

/** S0-2: confirm before turning "Allow runs without approval" on. */
export default function AwcRunsWithoutApprovalConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
}: AwcRunsWithoutApprovalConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      showCloseButton={false}
      className="max-w-lg p-6"
    >
      <div role="dialog" aria-modal="true" aria-labelledby="p-set-rwa-confirm-h">
        <h2
          id="p-set-rwa-confirm-h"
          className="text-lg font-semibold text-awc-fg dark:text-white/90"
        >
          {C.confirmTitle}
        </h2>
        <p className="mt-2 text-sm text-awc-fg-muted dark:text-gray-400">
          {C.confirmBody}
        </p>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <Button variant="outline" onClick={onCancel}>
            {C.cancel}
          </Button>
          <Button onClick={onConfirm}>{C.confirm}</Button>
        </div>
      </div>
    </Modal>
  );
}
