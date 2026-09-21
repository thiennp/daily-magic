import { WorkflowFieldOutputKind } from "@/lib/workflows/types/WorkflowFieldOutputKind.constant";
import type { WorkflowFieldOutputKind as WorkflowFieldOutputKindValue } from "@/lib/workflows/types/WorkflowFieldOutputKind.constant";

export const isWorkflowFieldOutputKind = (
  value: string,
): value is WorkflowFieldOutputKindValue =>
  (Object.values(WorkflowFieldOutputKind) as readonly string[]).includes(value);
