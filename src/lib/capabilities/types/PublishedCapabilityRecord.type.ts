import type { CapabilityStatusValue } from "@/lib/capabilities/CapabilityStatus.constant";
import type { CapabilityTypeValue } from "@/lib/capabilities/CapabilityType.constant";
import type { CapabilityVisibilityValue } from "@/lib/capabilities/CapabilityVisibility.constant";
import type { DispatchPolicyValue } from "@/lib/dispatch/DispatchPolicy.constant";

export default interface PublishedCapabilityRecord {
  readonly id: string;
  readonly ownerUserId: string;
  readonly groupId: string | null;
  readonly type: CapabilityTypeValue;
  readonly name: string;
  readonly description: string;
  readonly exampleRequest: string;
  readonly visibility: CapabilityVisibilityValue;
  readonly status: CapabilityStatusValue;
  readonly dispatchPolicyOverride: DispatchPolicyValue | null;
  readonly harnessSetSlug: string | null;
  readonly currentVersionId: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface PublishedCapabilitySummary {
  readonly id: string;
  readonly ownerUserId: string;
  readonly type: CapabilityTypeValue;
  readonly name: string;
  readonly description: string;
  readonly exampleRequest: string;
  readonly visibility: CapabilityVisibilityValue;
}
