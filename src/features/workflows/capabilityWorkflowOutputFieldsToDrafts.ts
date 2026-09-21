import { createDraftWorkflowOutputField } from "@/features/workflows/createDraftWorkflowOutputField";
import type DraftWorkflowOutputField from "@/features/workflows/types/DraftWorkflowOutputField.type";
import type WorkflowOutputFieldDefinition from "@/lib/workflows/types/WorkflowOutputFieldDefinition.type";

export function capabilityWorkflowOutputFieldsToDrafts(
  fields: readonly WorkflowOutputFieldDefinition[],
): readonly DraftWorkflowOutputField[] {
  return fields.map((field) => ({
    ...createDraftWorkflowOutputField(),
    label: field.label,
    kind: field.kind,
    required: field.required,
  }));
}
