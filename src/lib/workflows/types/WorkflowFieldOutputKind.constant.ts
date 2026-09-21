export const WorkflowFieldOutputKind = {
  TEXT: "text",
  MARKDOWN: "markdown",
  FILE: "file",
  TABLE: "table",
  JSON: "json",
} as const;

export type WorkflowFieldOutputKind =
  (typeof WorkflowFieldOutputKind)[keyof typeof WorkflowFieldOutputKind];
