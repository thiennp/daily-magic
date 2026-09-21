export type OfficialWorkflowNodeKind = "human" | "agent";

export interface OfficialWorkflowHumanNode {
  readonly id: string;
  readonly kind: "human";
  readonly title: string;
  readonly instructions: string;
  /** Checkpoint the operator may pass without writing an answer. */
  readonly allowSkip?: boolean;
}

export interface OfficialWorkflowAgentNode {
  readonly id: string;
  readonly kind: "agent";
  readonly title: string;
  readonly promptSection: string;
  /** Skip the step when the previous operator answer matches one of these phrases. */
  readonly skipWhenPriorResponseMatches?: readonly string[];
}

export type OfficialWorkflowNode =
  OfficialWorkflowHumanNode | OfficialWorkflowAgentNode;

export interface OfficialWorkflowDefinition {
  readonly templateId: string;
  readonly version: number;
  readonly capabilityName: string;
  readonly nodes: readonly OfficialWorkflowNode[];
}

export default OfficialWorkflowDefinition;
