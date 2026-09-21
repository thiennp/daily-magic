import type { WorkflowFieldInputTypeValue } from "@/lib/workflows/types/WorkflowFieldInputType.constant";
import type { WorkflowFieldFileAcceptValue } from "@/lib/workflows/types/WorkflowFieldFileAccept.constant";

export default interface WorkflowFieldDefinition {
  readonly key: string;
  readonly label: string;
  readonly type: WorkflowFieldInputTypeValue;
  readonly required: boolean;
  readonly options?: readonly string[];
  readonly accept?: readonly WorkflowFieldFileAcceptValue[];
}
