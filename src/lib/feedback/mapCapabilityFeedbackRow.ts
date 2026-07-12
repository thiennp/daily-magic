import { isFeedbackStatus } from "@/lib/feedback/FeedbackStatus.constant";
import type CapabilityFeedbackRecord from "@/lib/feedback/types/CapabilityFeedbackRecord.type";

export default function mapCapabilityFeedbackRow(
  row: Record<string, unknown>,
): CapabilityFeedbackRecord {
  const status = String(row.status);

  return {
    id: String(row.id),
    agentRunId: String(row.agent_run_id),
    capabilityId: row.capability_id ? String(row.capability_id) : null,
    reviewerUserId: String(row.reviewer_user_id),
    rating: typeof row.rating === "number" ? row.rating : null,
    comment: String(row.comment ?? ""),
    status: isFeedbackStatus(status) ? status : "submitted",
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}
