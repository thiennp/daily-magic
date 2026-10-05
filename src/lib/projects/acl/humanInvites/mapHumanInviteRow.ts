import type { HumanInviteRole } from "@/lib/projects/acl/humanInvites/humanInvite.constants";
import type HumanInviteRecord from "@/lib/projects/acl/humanInvites/types/HumanInviteRecord.type";

const parseRole = (value: unknown): HumanInviteRole =>
  value === "viewer" ? "viewer" : "member";

export default function mapHumanInviteRow(
  row: Record<string, unknown>,
): HumanInviteRecord {
  return {
    id: String(row.id),
    projectId: String(row.project_id),
    createdByUserId: String(row.created_by_user_id),
    email: row.email ? String(row.email) : null,
    role: parseRole(row.role),
    maxUses: Number(row.max_uses),
    usesRemaining: Number(row.uses_remaining),
    expiresAt: String(row.expires_at),
    revokedAt: row.revoked_at ? String(row.revoked_at) : null,
    redeemedAt: row.redeemed_at ? String(row.redeemed_at) : null,
    redeemedByUserId: row.redeemed_by_user_id
      ? String(row.redeemed_by_user_id)
      : null,
    createdAt: String(row.created_at),
  };
}
