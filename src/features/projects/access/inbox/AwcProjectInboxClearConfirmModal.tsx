"use client";

import { Modal } from "@/components/ui/modal";
import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { AWC_PROJECT_INBOX_COPY } from "@/features/projects/access/inbox/awcProjectInboxCopy.constant";

interface AwcProjectInboxClearConfirmModalProps {
  readonly isOpen: boolean;
  readonly clearing: boolean;
  readonly onClose: () => void;
  readonly onConfirm: () => void;
}

export default function AwcProjectInboxClearConfirmModal({
  isOpen,
  clearing,
  onClose,
  onConfirm,
}: AwcProjectInboxClearConfirmModalProps) {
  const copy = AWC_PROJECT_INBOX_COPY;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg p-6">
      <h2 className="pr-10 text-lg font-semibold text-gray-900 dark:text-white/90">
        {copy.clearConfirmTitle}
      </h2>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        {copy.clearConfirmBody}
      </p>
      <div className="mt-5 flex flex-wrap justify-end gap-2">
        <button
          type="button"
          className={AWC_PROJECT_ACCESS_CTA.secondary}
          disabled={clearing}
          onClick={onClose}
        >
          {copy.clearCancel}
        </button>
        <button
          type="button"
          className={AWC_PROJECT_ACCESS_CTA.danger}
          disabled={clearing}
          onClick={onConfirm}
        >
          {copy.clearConfirmCta}
        </button>
      </div>
    </Modal>
  );
}
