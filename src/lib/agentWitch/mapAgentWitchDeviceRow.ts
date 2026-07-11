import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";

export default function mapAgentWitchDeviceRow(
  row: Record<string, unknown>,
): AgentWitchDeviceRecord {
  return {
    id: String(row.id),
    userId: String(row.user_id),
    deviceLabel: row.device_label ? String(row.device_label) : null,
    claimedAt: String(row.claimed_at),
    lastSeenAt: row.last_seen_at ? String(row.last_seen_at) : null,
    revokedAt: row.revoked_at ? String(row.revoked_at) : null,
  };
}
