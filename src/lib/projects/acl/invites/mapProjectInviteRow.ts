import type { ProjectAclScope } from "@/lib/projects/acl/projectAclScopes.constant";
import { isProjectAclScope } from "@/lib/projects/acl/projectAclScopes.constant";
import type ProjectInviteRecord from "@/lib/projects/acl/invites/types/ProjectInviteRecord.type";
import { parseProjectInvitePlatform } from "@/lib/projects/acl/invites/projectInvitePlatform.constant";

const parseScopes = (value: unknown): readonly ProjectAclScope[] => {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter(
    (item): item is ProjectAclScope =>
      typeof item === "string" && isProjectAclScope(item),
  );
};

export default function mapProjectInviteRow(
  row: Record<string, unknown>,
): ProjectInviteRecord {
  return {
    id: String(row.id),
    projectId: String(row.project_id),
    createdByUserId: String(row.created_by_user_id),
    teamLabel: row.team_label ? String(row.team_label) : null,
    scopes: parseScopes(row.scopes),
    maxUses: Number(row.max_uses),
    usesRemaining: Number(row.uses_remaining),
    autoApprove: row.auto_approve === true,
    expiresAt: String(row.expires_at),
    revokedAt: row.revoked_at ? String(row.revoked_at) : null,
    createdAt: String(row.created_at),
    platform: parseProjectInvitePlatform(row.platform),
    // 107: only a flag leaves this mapper; the ciphertext never does.
    copyAvailable:
      typeof row.token_ciphertext === "string" &&
      row.token_ciphertext.length > 0 &&
      typeof row.token_iv === "string" &&
      row.token_iv.length > 0,
  };
}
