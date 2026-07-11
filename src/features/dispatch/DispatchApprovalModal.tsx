"use client";

import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import type { DispatchApprovalRequest } from "@/features/dispatch/hooks/useDispatchApprovalListener";

interface DispatchApprovalModalProps {
  readonly request: DispatchApprovalRequest;
  readonly onApprove: () => void;
  readonly onDeny: () => void;
  readonly onDismiss: () => void;
}

export default function DispatchApprovalModal({
  request,
  onApprove,
  onDeny,
  onDismiss,
}: DispatchApprovalModalProps) {
  return (
    <Modal
      isOpen
      onClose={onDismiss}
      showCloseButton={false}
      className="max-w-lg p-6"
    >
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        Approve agent dispatch?
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {request.requesterEmail} wants to run a task on your machine. You can
        approve in the browser; your local agent also receives a notification.
      </p>
      <pre className="mt-4 max-h-40 overflow-auto rounded-lg bg-gray-50 p-3 text-xs text-gray-700 dark:bg-gray-900 dark:text-gray-300">
        {request.prompt}
      </pre>
      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <Button variant="outline" onClick={onDeny}>
          Deny
        </Button>
        <Button onClick={onApprove}>Approve and run</Button>
      </div>
    </Modal>
  );
}
