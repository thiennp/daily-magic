import type { FeedbackStatusValue } from "@/lib/feedback/FeedbackStatus.constant";

export default interface CapabilityFeedbackRecord {
  readonly id: string;
  readonly agentRunId: string;
  readonly capabilityId: string | null;
  readonly reviewerUserId: string;
  readonly rating: number | null;
  readonly comment: string;
  readonly status: FeedbackStatusValue;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CapabilityFeedbackInboxItem extends CapabilityFeedbackRecord {
  readonly capabilityName: string | null;
  readonly reviewerEmail: string;
  readonly runPrompt: string;
}
