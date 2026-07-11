"use client";

import DispatchApprovalModal from "@/features/dispatch/DispatchApprovalModal";
import { useDispatchApprovalListener } from "@/features/dispatch/hooks/useDispatchApprovalListener";

export default function DispatchApprovalListener() {
  const { pendingApproval, respondToApproval, dismissApproval } =
    useDispatchApprovalListener();

  if (pendingApproval === null) {
    return null;
  }

  return (
    <DispatchApprovalModal
      request={pendingApproval}
      onApprove={() => {
        respondToApproval("approve");
      }}
      onDeny={() => {
        respondToApproval("deny", "Denied from browser.");
      }}
      onDismiss={dismissApproval}
    />
  );
}
