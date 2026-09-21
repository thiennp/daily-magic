import type { HarnessItemKind } from "@/lib/agentWitch/harness/types/HarnessItemKind.constant";
import type { CapabilityTypeValue } from "@/lib/capabilities/CapabilityType.constant";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

export interface CreateGuestPlaybookHarnessItem {
  readonly id: string;
  readonly kind: HarnessItemKind;
  readonly title: string;
  readonly content: string;
}

export default interface CreateGuestPlaybookPayload {
  readonly type: CapabilityTypeValue;
  readonly name: string;
  readonly description: string;
  readonly exampleRequest: string;
  readonly workflowFields?: readonly WorkflowFieldDefinition[];
  readonly harnessItems: readonly CreateGuestPlaybookHarnessItem[];
}
