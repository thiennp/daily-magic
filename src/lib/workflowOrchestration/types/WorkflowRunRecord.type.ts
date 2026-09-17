export type WorkflowRunStatusValue =
  "running" | "waiting_human" | "completed" | "failed" | "cancelled";

export type WorkflowStepRunStatusValue =
  "pending" | "running" | "waiting_human" | "completed" | "failed" | "skipped";

export interface WorkflowStepRunRecord {
  readonly id: string;
  readonly workflowRunId: string;
  readonly stepIndex: number;
  readonly nodeId: string;
  readonly nodeKind: "human" | "agent";
  readonly status: WorkflowStepRunStatusValue;
  readonly title: string;
  readonly agentRunId: string | null;
  readonly output: Record<string, unknown> | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly completedAt: string | null;
}

export interface WorkflowRunRecord {
  readonly id: string;
  readonly requesterUserId: string;
  readonly executorUserId: string;
  readonly deviceId: string | null;
  readonly capabilityId: string | null;
  readonly templateId: string;
  readonly orchestrationVersion: number;
  readonly status: WorkflowRunStatusValue;
  readonly currentStepIndex: number;
  readonly fieldValues: Readonly<Record<string, string>>;
  readonly stepOutputs: Readonly<Record<string, unknown>>;
  readonly definitionSnapshot: Record<string, unknown>;
  readonly errorMessage: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly completedAt: string | null;
}

export default WorkflowRunRecord;
