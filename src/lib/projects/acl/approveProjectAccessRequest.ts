import { randomUUID } from "node:crypto";

import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import mapProjectAccessRequestRow from "@/lib/projects/acl/mapProjectAccessRequestRow";
import mapProjectMembershipRow from "@/lib/projects/acl/mapProjectMembershipRow";
import { PROJECT_ACL_DEFAULT_MEMBER_SCOPES } from "@/lib/projects/acl/projectAclScopes.constant";
import type ProjectAccessRequestRecord from "@/lib/projects/acl/types/ProjectAccessRequestRecord.type";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { asRowArray, getSql } from "@/lib/db";

export type ApproveProjectAccessResult =
  | {
      readonly ok: true;
      readonly request: ProjectAccessRequestRecord;
      readonly membership: ProjectMembershipRecord;
    }
  | {
      readonly ok: false;
      readonly code: "not_found" | "forbidden" | "not_pending";
    };

export const approveProjectAccessRequest = async (input: {
  readonly projectId: string;
  readonly requestId: string;
  readonly ownerUserId: string;
  readonly teamLabel?: string | null;
}): Promise<ApproveProjectAccessResult> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return { ok: false, code: "not_found" };
  }
  if (project.ownerUserId !== input.ownerUserId) {
    return { ok: false, code: "forbidden" };
  }

  await ensureProjectAclSchema();
  const sql = getSql();
  const requestRows = asRowArray(
    await sql`
      UPDATE project_access_requests
      SET status = 'approved',
          decided_by_user_id = ${input.ownerUserId},
          decided_at = NOW()
      WHERE id = ${input.requestId}
        AND project_id = ${input.projectId}
        AND status = 'pending'
        AND expires_at > NOW()
      RETURNING *
    `,
  );
  if (requestRows.length === 0) {
    return { ok: false, code: "not_pending" };
  }
  const request = mapProjectAccessRequestRow(requestRows[0]);
  const scopes = [...PROJECT_ACL_DEFAULT_MEMBER_SCOPES];
  const memberRows = asRowArray(
    await sql`
      INSERT INTO project_memberships (
        id, project_id, user_id, role, status, team_label, scopes
      )
      VALUES (
        ${randomUUID()},
        ${input.projectId},
        ${request.requesterUserId},
        'member',
        'active',
        ${input.teamLabel ?? null},
        ${scopes}
      )
      RETURNING *
    `,
  );
  if (memberRows.length === 0) {
    return { ok: false, code: "not_found" };
  }
  const membership = mapProjectMembershipRow(memberRows[0]);
  await writeProjectAccessAudit({
    projectId: input.projectId,
    actorUserId: input.ownerUserId,
    action: "approve",
    targetUserId: request.requesterUserId,
    detail: { requestId: request.id, membershipId: membership.id },
  });
  return { ok: true, request, membership };
};
