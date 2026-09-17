export type OfficialWorkflowNodeKind = "human" | "agent";

export interface OfficialWorkflowHumanNode {
  readonly id: string;
  readonly kind: "human";
  readonly title: string;
  readonly instructions: string;
}

export interface OfficialWorkflowAgentNode {
  readonly id: string;
  readonly kind: "agent";
  readonly title: string;
  readonly promptSection: string;
}

export type OfficialWorkflowNode =
  OfficialWorkflowHumanNode | OfficialWorkflowAgentNode;

export interface OfficialWorkflowDefinition {
  readonly templateId: string;
  readonly version: 1;
  readonly capabilityName: string;
  readonly nodes: readonly OfficialWorkflowNode[];
}

export default OfficialWorkflowDefinition;
