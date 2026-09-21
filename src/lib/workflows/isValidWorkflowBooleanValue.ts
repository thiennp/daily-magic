export const WORKFLOW_BOOLEAN_YES = "yes";
export const WORKFLOW_BOOLEAN_NO = "no";

export const isValidWorkflowBooleanValue = (value: string): boolean =>
  value === WORKFLOW_BOOLEAN_YES || value === WORKFLOW_BOOLEAN_NO;
