import type { WorkflowFieldOutputKind } from "@/lib/workflows/types/WorkflowFieldOutputKind.constant";

export default interface DraftWorkflowOutputField {
  readonly id: string;
  readonly label: string;
  readonly kind: WorkflowFieldOutputKind;
  readonly required: boolean;
}
