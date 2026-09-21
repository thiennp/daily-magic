import { WorkflowFieldInputType } from "@/lib/workflows/types/WorkflowFieldInputType.constant";
import type DraftWorkflowField from "@/features/workflows/types/DraftWorkflowField.type";

export const createDraftWorkflowField = (): DraftWorkflowField => ({
  id: crypto.randomUUID(),
  label: "",
  type: WorkflowFieldInputType.TEXT,
  required: true,
  options: [],
});
