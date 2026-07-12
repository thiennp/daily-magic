import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";
import type { DraftWorkflowField } from "@/features/workflows/WorkflowBuilderFieldRow";

export function capabilityWorkflowFieldsToDrafts(
  fields: readonly WorkflowFieldDefinition[],
): readonly DraftWorkflowField[] {
  return fields.map((field) => ({
    id: crypto.randomUUID(),
    label: field.label,
    type: field.type,
    required: field.required,
  }));
}
