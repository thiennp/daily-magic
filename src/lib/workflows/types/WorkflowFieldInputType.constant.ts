export const WorkflowFieldInputType = {
  TEXT: "text",
  TEXTAREA: "textarea",
  NUMBER: "number",
  PHONE: "phone",
  EMAIL: "email",
  URL: "url",
  DATE: "date",
  BOOLEAN: "boolean",
  SELECT: "select",
  PROJECT: "project",
} as const;

export type WorkflowFieldInputTypeValue =
  (typeof WorkflowFieldInputType)[keyof typeof WorkflowFieldInputType];

export const WORKFLOW_FIELD_INPUT_TYPE_VALUES = [
  WorkflowFieldInputType.TEXT,
  WorkflowFieldInputType.TEXTAREA,
  WorkflowFieldInputType.NUMBER,
  WorkflowFieldInputType.PHONE,
  WorkflowFieldInputType.EMAIL,
  WorkflowFieldInputType.URL,
  WorkflowFieldInputType.DATE,
  WorkflowFieldInputType.BOOLEAN,
  WorkflowFieldInputType.SELECT,
  WorkflowFieldInputType.PROJECT,
] as const;

export const AUTHORABLE_WORKFLOW_FIELD_INPUT_TYPES = [
  WorkflowFieldInputType.TEXT,
  WorkflowFieldInputType.TEXTAREA,
  WorkflowFieldInputType.NUMBER,
  WorkflowFieldInputType.PHONE,
  WorkflowFieldInputType.EMAIL,
  WorkflowFieldInputType.URL,
  WorkflowFieldInputType.DATE,
  WorkflowFieldInputType.BOOLEAN,
  WorkflowFieldInputType.SELECT,
] as const;

export type AuthorableWorkflowFieldInputType =
  (typeof AUTHORABLE_WORKFLOW_FIELD_INPUT_TYPES)[number];
