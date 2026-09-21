import type { WorkflowFieldOutputKind } from "@/lib/workflows/types/WorkflowFieldOutputKind.constant";

/** Declared workflow outputs (Phase 4 graph execution will consume these). */
export default interface WorkflowOutputFieldDefinition {
  readonly key: string;
  readonly label: string;
  readonly kind: WorkflowFieldOutputKind;
  readonly required: boolean;
}
