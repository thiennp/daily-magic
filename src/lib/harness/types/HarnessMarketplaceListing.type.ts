import type { CapabilityTypeValue } from "@/lib/capabilities/CapabilityType.constant";
import type { CapabilityVisibilityValue } from "@/lib/capabilities/CapabilityVisibility.constant";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

export default interface HarnessMarketplaceListing {
  readonly capabilityId: string;
  readonly ownerUserId: string;
  readonly ownerEmail: string;
  readonly ownerName: string | null;
  readonly type: CapabilityTypeValue;
  readonly name: string;
  readonly description: string;
  readonly exampleRequest: string;
  readonly visibility: CapabilityVisibilityValue;
  readonly workflowFields: readonly WorkflowFieldDefinition[];
  readonly harnessSetSlug: string;
  readonly harnessSetName: string | null;
  readonly harnessItemCount: number | null;
  readonly isOnline: boolean;
  readonly hostname: string | null;
  readonly isOfficialPreset?: boolean;
}
