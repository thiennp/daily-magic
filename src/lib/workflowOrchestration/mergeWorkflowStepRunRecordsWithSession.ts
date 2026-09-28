import type { WorkflowStepRunRecord } from "@/lib/workflowOrchestration/types/WorkflowRunRecord.type";

export const mergeWorkflowStepRunRecordsWithSession = (input: {
  readonly stepsFromDb: readonly WorkflowStepRunRecord[];
  readonly sessionSteps: readonly WorkflowStepRunRecord[];
}): readonly WorkflowStepRunRecord[] => {
  const mergedByStepIndex = new Map<number, WorkflowStepRunRecord>();

  for (const step of input.stepsFromDb) {
    mergedByStepIndex.set(step.stepIndex, step);
  }
  for (const step of input.sessionSteps) {
    mergedByStepIndex.set(step.stepIndex, step);
  }

  return [...mergedByStepIndex.values()].sort(
    (left, right) => left.stepIndex - right.stepIndex,
  );
};
