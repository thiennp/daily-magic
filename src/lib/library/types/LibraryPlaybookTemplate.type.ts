import type { CapabilityTypeValue } from "@/lib/capabilities/CapabilityType.constant";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";
import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export default interface LibraryPlaybookTemplate {
  readonly id: string;
  readonly name: string;
  readonly type: CapabilityTypeValue;
  readonly exampleRequest: string;
  readonly workflowFields: readonly WorkflowFieldDefinition[];
  readonly operatorSteps: readonly OperatorStepDefinition[];
  readonly harnessSetSlug: string | null;
  /** Populated for unpublished create-flow trials only. */
  readonly initialWorkflowFieldValues?: Readonly<Record<string, string>>;
}
