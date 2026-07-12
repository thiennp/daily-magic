import { isImprovementStatus } from "@/lib/improvements/ImprovementStatus.constant";
import type CapabilityImprovementRecord from "@/lib/improvements/types/CapabilityImprovementRecord.type";

export default function mapCapabilityImprovementRow(
  row: Record<string, unknown>,
): CapabilityImprovementRecord {
  const status = String(row.status);

  return {
    id: String(row.id),
    feedbackId: row.feedback_id ? String(row.feedback_id) : null,
    capabilityId: String(row.capability_id),
    ownerUserId: String(row.owner_user_id),
    suggestion: String(row.suggestion),
    status: isImprovementStatus(status) ? status : "proposed",
    resultingVersionId: row.resulting_version_id
      ? String(row.resulting_version_id)
      : null,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}
