export default interface WorkflowStepFailurePayload {
  readonly stepRunId: string;
  readonly stepIndex: number;
  readonly title: string;
  readonly errorMessage: string;
  readonly workflowLabel?: string;
}

export interface WorkflowStepFailureRequest extends WorkflowStepFailurePayload {
  readonly workflowRunId: string;
}
