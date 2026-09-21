export default interface WorkflowHumanStepPayload {
  readonly stepRunId: string;
  readonly stepIndex: number;
  readonly title: string;
  readonly instructions: string;
  /** Total nodes in the workflow graph, for "step N of M" progress. */
  readonly totalSteps?: number;
  /** Operator may pass this checkpoint without writing an answer. */
  readonly allowSkip?: boolean;
  /** Output of the closest preceding agent step, so the operator can answer in place. */
  readonly priorAgentOutputPreview?: string;
}

export interface WorkflowHumanStepRequest extends WorkflowHumanStepPayload {
  readonly workflowRunId: string;
}
