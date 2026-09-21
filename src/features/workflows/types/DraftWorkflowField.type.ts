import type { WorkflowFieldInputTypeValue } from "@/lib/workflows/types/WorkflowFieldInputType.constant";

export default interface DraftWorkflowField {
  readonly id: string;
  readonly label: string;
  readonly type: WorkflowFieldInputTypeValue;
  readonly required: boolean;
  readonly options: readonly string[];
}
