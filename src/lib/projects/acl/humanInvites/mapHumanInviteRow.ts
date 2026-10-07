import type { HumanInviteRole } from "@/lib/projects/acl/humanInvites/humanInvite.constants";
import {
  HUMAN_INVITE_STATUSES,
  type HumanInviteStatus,
} from "@/lib/projects/acl/humanInvites/humanInviteEmail.constant";
import type HumanInviteRecord from "@/lib/projects/acl/humanInvites/types/HumanInviteRecord.type";
import { toPostgresTimestamptz } from "@/lib/projects/acl/messaging/toPostgresTimestamptz";

const parseRole = (value: unknown): HumanInviteRole =>
  value === "viewer" ? "viewer" : "member";

const parseStatus = (value: unknown): HumanInviteStatus =>
  (HUMAN_INVITE_STATUSES as readonly unknown[]).includes(value)
    ? (value as HumanInviteStatus)
    : "pending";

const optionalString = (value: unknown): string | null =>
  value === null || value === undefined || value === "" ? null : String(value);

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
    status: parseStatus(row.status),
    delivery: row.delivery === "email" ? "email" : "link",
    requiresApproval: row.requires_approval === true,
    emailSentAt: toPostgresTimestamptz(row.email_sent_at),
    acceptedAt: toPostgresTimestamptz(row.accepted_at),
    acceptedByUserId: optionalString(row.accepted_by_user_id),
    acceptedDisplayName: optionalString(row.accepted_display_name),
    acceptedByEmail: optionalString(row.accepted_by_email),
    decidedAt: toPostgresTimestamptz(row.decided_at),
  };
}
