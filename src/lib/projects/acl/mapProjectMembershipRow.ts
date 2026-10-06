import type { ProjectAclScope } from "@/lib/projects/acl/projectAclScopes.constant";
import { isProjectAclScope } from "@/lib/projects/acl/projectAclScopes.constant";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";

const parseScopes = (value: unknown): readonly ProjectAclScope[] => {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter(
    (item): item is ProjectAclScope =>
      typeof item === "string" && isProjectAclScope(item),
  );
};

const parseStatus = (
  value: unknown,
): ProjectMembershipRecord["status"] => {
  if (value === "revoked") return "revoked";
  if (value === "naming_required") return "naming_required";
  return "active";
};

const parseRole = (value: unknown): ProjectMembershipRecord["role"] => {
  if (value === "owner") return "owner";
  if (value === "viewer") return "viewer";
  return "member";
};

const parseMemberKind = (
  value: unknown,
): ProjectMembershipRecord["memberKind"] => {
  if (value === "human") return "human";
  if (value === "computer") return "computer";
  return "bot";
};

export default function mapProjectMembershipRow(
  row: Record<string, unknown>,
): ProjectMembershipRecord {
  return {
    id: String(row.id),
    projectId: String(row.project_id),
    userId: String(row.user_id),
    role: parseRole(row.role),
    status: parseStatus(row.status),
    memberKind: parseMemberKind(row.member_kind),
    teamLabel: row.team_label ? String(row.team_label) : null,
    scopes: parseScopes(row.scopes),
    projectDisplayName: row.project_display_name
      ? String(row.project_display_name)
      : null,
    deviceId: row.device_id ? String(row.device_id) : null,
    createdAt: String(row.created_at),
    revokedAt: row.revoked_at ? String(row.revoked_at) : null,
    autoApprovedViaInviteLabel: row.auto_approved_via_invite_label
      ? String(row.auto_approved_via_invite_label)
      : null,
  };
}
