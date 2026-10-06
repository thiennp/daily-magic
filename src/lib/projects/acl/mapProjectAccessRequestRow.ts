import type { ProjectAclScope } from "@/lib/projects/acl/projectAclScopes.constant";
import { isProjectAclScope } from "@/lib/projects/acl/projectAclScopes.constant";
import type ProjectAccessRequestRecord from "@/lib/projects/acl/types/ProjectAccessRequestRecord.type";

const parseScopes = (value: unknown): readonly ProjectAclScope[] => {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter(
    (item): item is ProjectAclScope =>
      typeof item === "string" && isProjectAclScope(item),
  );
};

const parseStatus = (value: unknown): ProjectAccessRequestRecord["status"] => {
  if (
    value === "pending" ||
    value === "approved" ||
    value === "denied" ||
    value === "expired"
  ) {
    return value;
  }
  return "pending";
};

export default function mapProjectAccessRequestRow(
  row: Record<string, unknown>,
): ProjectAccessRequestRecord {
  return {
    id: String(row.id),
    projectId: String(row.project_id),
    requesterUserId: String(row.requester_user_id),
    invitedByUserId: row.invited_by_user_id
      ? String(row.invited_by_user_id)
      : null,
    reason: row.reason ? String(row.reason) : null,
    requestedScopes: parseScopes(row.requested_scopes),
    status: parseStatus(row.status),
    decidedByUserId: row.decided_by_user_id
      ? String(row.decided_by_user_id)
      : null,
    decidedAt: row.decided_at ? String(row.decided_at) : null,
    createdAt: String(row.created_at),
    expiresAt: String(row.expires_at),
  };
}
