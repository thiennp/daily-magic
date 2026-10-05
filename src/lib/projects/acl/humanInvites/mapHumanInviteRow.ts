import type { HumanInviteRole } from "@/lib/projects/acl/humanInvites/humanInvite.constants";
import type HumanInviteRecord from "@/lib/projects/acl/humanInvites/types/HumanInviteRecord.type";
import { toPostgresTimestamptz } from "@/lib/projects/acl/messaging/toPostgresTimestamptz";

const parseRole = (value: unknown): HumanInviteRole =>
  value === "viewer" ? "viewer" : "member";

const requireTs = (value: unknown): string =>
  toPostgresTimestamptz(value) ?? "";

export default function mapHumanInviteRow(
  row: Record<string, unknown>,
): HumanInviteRecord {
  return {
    id: String(row.id),
    projectId: String(row.project_id),
    createdByUserId: String(row.created_by_user_id),
    email: row.email ? String(row.email) : null,
    requireEmailMatch: row.require_email_match === true,
    role: parseRole(row.role),
    maxUses: Number(row.max_uses),
    usesRemaining: Number(row.uses_remaining),
    expiresAt: requireTs(row.expires_at),
    revokedAt: toPostgresTimestamptz(row.revoked_at),
    redeemedAt: toPostgresTimestamptz(row.redeemed_at),
    redeemedByUserId: row.redeemed_by_user_id
      ? String(row.redeemed_by_user_id)
      : null,
    createdAt: requireTs(row.created_at),
  };
}
