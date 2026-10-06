"use client";

import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import DispatchApprovalExpiryNote from "@/features/dispatch/DispatchApprovalExpiryNote";
import type { DispatchApprovalRequest } from "@/features/dispatch/hooks/useDispatchApprovalListener";
import { useNowMsEvery } from "@/features/dispatch/hooks/useNowMsEvery";
import { resolveDispatchApprovalExpiry } from "@/features/dispatch/utils/resolveDispatchApprovalExpiry";
import { formatDispatchApprovalCardBody } from "@/features/dispatch/utils/formatDispatchApprovalCardBody";
import { DISPATCH_APPROVAL_CARD_COPY } from "@/features/dispatch/dispatchApprovalCardCopy.constant";
import { AWC_PENDING_APPROVAL_CARD_COPY } from "@/features/projects/access/approvalCard/awcPendingApprovalCardCopy.constant";

interface DispatchApprovalModalProps {
  readonly request: DispatchApprovalRequest;
  readonly onApprove: () => void;
  readonly onDeny: () => void;
  readonly onDismiss: () => void;
}

const EXPIRY_NOTE_ID = "dispatch-approval-expiry";

export default function DispatchApprovalModal({
  request,
  onApprove,
  onDeny,
  onDismiss,
}: DispatchApprovalModalProps) {
  const nowMs = useNowMsEvery(15_000);
  const expiry = resolveDispatchApprovalExpiry({
    approvalExpiresAt: request.approvalExpiresAt,
    requester: request.requesterEmail,
    nowMs,
  });
  const ended = expiry.kind === "ended";

  return (
    <Modal
      isOpen
      onClose={onDismiss}
      showCloseButton={ended}
      className="max-w-lg p-6"
    >
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        {DISPATCH_APPROVAL_CARD_COPY.title}
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {formatDispatchApprovalCardBody(request.requesterEmail)}
      </p>
      <pre className="mt-4 max-h-40 overflow-auto rounded-lg bg-gray-50 p-3 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {request.prompt}
      </pre>
      <DispatchApprovalExpiryNote id={EXPIRY_NOTE_ID} expiry={expiry} />
      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <Button
          variant="outline"
          onClick={onDeny}
          disabled={ended}
        >
          {AWC_PENDING_APPROVAL_CARD_COPY.deny}
        </Button>
        <Button
          onClick={onApprove}
          disabled={ended}
        >
          {AWC_PENDING_APPROVAL_CARD_COPY.approve}
        </Button>
      </div>
    </Modal>
  );
}
