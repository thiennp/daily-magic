export const WorkflowFieldInputType = {
  TEXT: "text",
  TEXTAREA: "textarea",
  PROJECT: "project",
} as const;

export type WorkflowFieldInputTypeValue =
  (typeof WorkflowFieldInputType)[keyof typeof WorkflowFieldInputType];

export default interface WorkflowFieldDefinition {
  readonly key: string;
  readonly label: string;
  readonly type: WorkflowFieldInputTypeValue;
  readonly required: boolean;
}
