import type { CapabilityTypeValue } from "@/lib/capabilities/CapabilityType.constant";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

export default interface LibraryPlaybookTemplate {
  readonly id: string;
  readonly name: string;
  readonly type: CapabilityTypeValue;
  readonly exampleRequest: string;
  readonly workflowFields: readonly WorkflowFieldDefinition[];
}
