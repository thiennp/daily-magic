import type QueuedAgentRunRecord from "@/lib/dispatch/types/QueuedAgentRunRecord.type";

export default function mapQueuedAgentRunRow(
  row: Record<string, unknown>,
): QueuedAgentRunRecord {
  return {
    id: String(row.id),
    requesterUserId: String(row.requester_user_id),
    executorUserId: String(row.executor_user_id),
    groupId: row.group_id ? String(row.group_id) : null,
    capabilityId: row.capability_id ? String(row.capability_id) : null,
    prompt: String(row.prompt),
    createdAt: String(row.created_at),
  };
}
