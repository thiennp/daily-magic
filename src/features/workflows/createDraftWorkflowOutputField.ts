import { WorkflowFieldOutputKind } from "@/lib/workflows/types/WorkflowFieldOutputKind.constant";
import type DraftWorkflowOutputField from "@/features/workflows/types/DraftWorkflowOutputField.type";

export const createDraftWorkflowOutputField = (): DraftWorkflowOutputField => ({
  id: crypto.randomUUID(),
  label: "",
  kind: WorkflowFieldOutputKind.TEXT,
  required: false,
});
