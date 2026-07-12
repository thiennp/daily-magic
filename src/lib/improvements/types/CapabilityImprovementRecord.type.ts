import type { ImprovementStatusValue } from "@/lib/improvements/ImprovementStatus.constant";

export default interface CapabilityImprovementRecord {
  readonly id: string;
  readonly feedbackId: string | null;
  readonly capabilityId: string;
  readonly ownerUserId: string;
  readonly suggestion: string;
  readonly status: ImprovementStatusValue;
  readonly resultingVersionId: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CapabilityImprovementInboxItem extends CapabilityImprovementRecord {
  readonly capabilityName: string;
  readonly feedbackComment: string | null;
}
