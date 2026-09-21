import { clearWorkflowAttentionSnoozeForRun } from "@/features/dispatch/utils/workflowAttentionSnoozeStore";
import type { WorkflowStepFailureRequest } from "@/lib/workflowOrchestration/types/WorkflowStepFailurePayload.type";

const pendingState: { current: WorkflowStepFailureRequest | null } = {
  current: null,
};
const listeners = new Set<() => void>();

export const getWorkflowStepFailurePendingSnapshot =
  (): WorkflowStepFailureRequest | null => pendingState.current;

export const subscribeWorkflowStepFailurePending = (
  onStoreChange: () => void,
): (() => void) => {
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
};

export const setWorkflowStepFailurePending = (
  request: WorkflowStepFailureRequest | null,
): void => {
  if (request !== null) {
    clearWorkflowAttentionSnoozeForRun(request.workflowRunId);
  }
  pendingState.current = request;
  listeners.forEach((listener) => {
    listener();
  });
};
