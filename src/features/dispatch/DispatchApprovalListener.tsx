"use client";

import AgentRunInputModal from "@/features/dispatch/AgentRunInputModal";
import DispatchApprovalModal from "@/features/dispatch/DispatchApprovalModal";
import { useDispatchApprovalListener } from "@/features/dispatch/hooks/useDispatchApprovalListener";

export default function DispatchApprovalListener() {
  const {
    pendingApproval,
    pendingInput,
    respondToApproval,
    respondToInput,
    dismissApproval,
    dismissInput,
  } = useDispatchApprovalListener();

  return (
    <>
      {pendingApproval !== null ? (
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
      ) : null}
      {pendingInput !== null ? (
        <AgentRunInputModal
          request={pendingInput}
          onSubmit={(response) => {
            respondToInput(response);
          }}
          onDismiss={dismissInput}
        />
      ) : null}
    </>
  );
}
