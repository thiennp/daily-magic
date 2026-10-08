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
          // 8181f143: a new question (another run) never inherits a typed answer.
          key={`${pendingInput.agentRunId}:${pendingInput.question}`}
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
