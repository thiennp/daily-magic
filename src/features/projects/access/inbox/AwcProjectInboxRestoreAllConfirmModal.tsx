"use client";

import { Modal } from "@/components/ui/modal";
import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { AWC_PROJECT_INBOX_COPY } from "@/features/projects/access/inbox/awcProjectInboxCopy.constant";

interface AwcProjectInboxRestoreAllConfirmModalProps {
  readonly isOpen: boolean;
  readonly restoring: boolean;
  readonly onClose: () => void;
  readonly onConfirm: () => void;
}

/** Owner "Restore all" confirm (LOCK archived.restoreAllConfirm*). */
export default function AwcProjectInboxRestoreAllConfirmModal({
  isOpen,
  restoring,
  onClose,
  onConfirm,
}: AwcProjectInboxRestoreAllConfirmModalProps) {
  const copy = AWC_PROJECT_INBOX_COPY;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg p-6">
      <h2 className="pr-10 text-lg font-semibold text-awc-fg dark:text-white/90">
        {copy.archived.restoreAllConfirmTitle}
      </h2>
      <div className="mt-5 flex flex-wrap justify-end gap-2">
        <button
          type="button"
          className={AWC_PROJECT_ACCESS_CTA.secondary}
          disabled={restoring}
          onClick={onClose}
        >
          {copy.clearAll.cancel}
        </button>
        <button
          type="button"
          className={AWC_PROJECT_ACCESS_CTA.primary}
          disabled={restoring}
          onClick={onConfirm}
        >
          {copy.archived.restoreAllConfirm}
        </button>
      </div>
    </Modal>
  );
}
