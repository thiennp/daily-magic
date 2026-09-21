import {
  WORKFLOW_FIELD_FILE_ACCEPT_VALUES,
  type WorkflowFieldFileAcceptValue,
} from "@/lib/workflows/types/WorkflowFieldFileAccept.constant";

export const parseWorkflowFieldAccept = (
  value: unknown,
): readonly WorkflowFieldFileAcceptValue[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (entry): entry is WorkflowFieldFileAcceptValue =>
      typeof entry === "string" &&
      (WORKFLOW_FIELD_FILE_ACCEPT_VALUES as readonly string[]).includes(entry),
  );
};
