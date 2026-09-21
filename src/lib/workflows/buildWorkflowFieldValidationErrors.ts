import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";
import { validateWorkflowFieldValue } from "@/lib/workflows/validateWorkflowFieldValue";

export const buildWorkflowFieldValidationErrors = (
  fields: readonly WorkflowFieldDefinition[],
  values: Readonly<Record<string, string>>,
): Readonly<Record<string, string>> =>
  Object.fromEntries(
    fields.flatMap((field) => {
      const message = validateWorkflowFieldValue(field, values[field.key]);
      return message === null ? [] : [[field.key, message] as const];
    }),
  );
