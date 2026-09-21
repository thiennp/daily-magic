import type { WorkflowHumanStepRequest } from "@/lib/workflowOrchestration/types/WorkflowHumanStepPayload.type";
import type { WorkflowStepFailureRequest } from "@/lib/workflowOrchestration/types/WorkflowStepFailurePayload.type";

export interface WorkflowAttentionSnoozeSnapshot {
  readonly human: WorkflowHumanStepRequest | null;
  readonly failure: WorkflowStepFailureRequest | null;
}

const state: {
  human: WorkflowHumanStepRequest | null;
  failure: WorkflowStepFailureRequest | null;
} = { human: null, failure: null };
const listeners = new Set<() => void>();

const notify = (): void => {
  listeners.forEach((listener) => {
    listener();
  });
};

export const subscribeWorkflowAttentionSnooze = (
  onStoreChange: () => void,
): (() => void) => {
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
};

export const getWorkflowAttentionSnoozeSnapshot =
  (): WorkflowAttentionSnoozeSnapshot => state;

export const snoozeWorkflowHumanAttention = (
  request: WorkflowHumanStepRequest,
): void => {
  state.human = request;
  notify();
};

export const snoozeWorkflowFailureAttention = (
  request: WorkflowStepFailureRequest,
): void => {
  state.failure = request;
  notify();
};

export const clearSnoozedWorkflowHumanAttention = (): void => {
  if (state.human === null) {
    return;
  }
  state.human = null;
  notify();
};

export const clearSnoozedWorkflowFailureAttention = (): void => {
  if (state.failure === null) {
    return;
  }
  state.failure = null;
  notify();
};

export const clearWorkflowAttentionSnoozeForRun = (
  workflowRunId: string,
): void => {
  const humanMatches = state.human?.workflowRunId === workflowRunId;
  const failureMatches = state.failure?.workflowRunId === workflowRunId;
  if (!humanMatches && !failureMatches) {
    return;
  }
  if (humanMatches) {
    state.human = null;
  }
  if (failureMatches) {
    state.failure = null;
  }
  notify();
};
