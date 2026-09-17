export default interface WorkflowHumanStepPayload {
  readonly stepRunId: string;
  readonly stepIndex: number;
  readonly title: string;
  readonly instructions: string;
}

export interface WorkflowHumanStepRequest extends WorkflowHumanStepPayload {
  readonly workflowRunId: string;
}
