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

export default function mapProjectMembershipRow(
  row: Record<string, unknown>,
): ProjectMembershipRecord {
  const role = row.role === "owner" ? "owner" : "member";
  return {
    id: String(row.id),
    projectId: String(row.project_id),
    userId: String(row.user_id),
    role,
    status: parseStatus(row.status),
    teamLabel: row.team_label ? String(row.team_label) : null,
    scopes: parseScopes(row.scopes),
    projectDisplayName: row.project_display_name
      ? String(row.project_display_name)
      : null,
    createdAt: String(row.created_at),
    revokedAt: row.revoked_at ? String(row.revoked_at) : null,
  };
}
