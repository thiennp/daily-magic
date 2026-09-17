import type WorkflowRunRecord from "@/lib/workflowOrchestration/types/WorkflowRunRecord.type";
import type { WorkflowStepRunRecord } from "@/lib/workflowOrchestration/types/WorkflowRunRecord.type";

const workflowRunSessions = new Map<string, WorkflowRunRecord>();
const workflowStepRunSessions = new Map<string, WorkflowStepRunRecord>();

export const registerWorkflowRunSession = (run: WorkflowRunRecord): void => {
  workflowRunSessions.set(run.id, run);
};

export const registerWorkflowStepRunSession = (
  step: WorkflowStepRunRecord,
): void => {
  workflowStepRunSessions.set(step.id, step);
};

export const getWorkflowRunSession = (
  runId: string,
): WorkflowRunRecord | undefined => workflowRunSessions.get(runId);

export const getWorkflowStepRunSession = (
  stepRunId: string,
): WorkflowStepRunRecord | undefined => workflowStepRunSessions.get(stepRunId);

export const findWorkflowStepRunSessionByAgentRunId = (
  agentRunId: string,
): WorkflowStepRunRecord | undefined =>
  [...workflowStepRunSessions.values()].find(
    (step) => step.agentRunId === agentRunId,
  );

export const listWorkflowStepRunSessionsForRun = (
  workflowRunId: string,
): readonly WorkflowStepRunRecord[] =>
  [...workflowStepRunSessions.values()]
    .filter((step) => step.workflowRunId === workflowRunId)
    .sort((a, b) => a.stepIndex - b.stepIndex);

export const clearWorkflowRunSessions = (workflowRunId: string): void => {
  workflowRunSessions.delete(workflowRunId);
  for (const [id, step] of workflowStepRunSessions.entries()) {
    if (step.workflowRunId === workflowRunId) {
      workflowStepRunSessions.delete(id);
    }
  }
};
