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

export default function mapProjectMembershipRow(
  row: Record<string, unknown>,
): ProjectMembershipRecord {
  const role = row.role === "owner" ? "owner" : "member";
  const status = row.status === "revoked" ? "revoked" : "active";
  return {
    id: String(row.id),
    projectId: String(row.project_id),
    userId: String(row.user_id),
    role,
    status,
    teamLabel: row.team_label ? String(row.team_label) : null,
    scopes: parseScopes(row.scopes),
    createdAt: String(row.created_at),
    revokedAt: row.revoked_at ? String(row.revoked_at) : null,
  };
}
