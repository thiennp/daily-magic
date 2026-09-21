import { clearWorkflowAttentionSnoozeForRun } from "@/features/dispatch/utils/workflowAttentionSnoozeStore";
import type { WorkflowHumanStepRequest } from "@/lib/workflowOrchestration/types/WorkflowHumanStepPayload.type";

const pendingState: { current: WorkflowHumanStepRequest | null } = {
  current: null,
};
const listeners = new Set<() => void>();

export const getWorkflowHumanStepPendingSnapshot =
  (): WorkflowHumanStepRequest | null => pendingState.current;

export const subscribeWorkflowHumanStepPending = (
  onStoreChange: () => void,
): (() => void) => {
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
};

export const setWorkflowHumanStepPending = (
  request: WorkflowHumanStepRequest | null,
): void => {
  if (request !== null) {
    clearWorkflowAttentionSnoozeForRun(request.workflowRunId);
  }
  pendingState.current = request;
  listeners.forEach((listener) => {
    listener();
  });
};
