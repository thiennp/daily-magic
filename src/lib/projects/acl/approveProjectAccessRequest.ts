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
  const membershipId = randomUUID();
  const scopes = [...PROJECT_ACL_DEFAULT_MEMBER_SCOPES];
  const teamLabel = input.teamLabel ?? null;

  const combinedRows = asRowArray(
    await sql`
      WITH approved_request AS (
        UPDATE project_access_requests
        SET status = 'approved',
            decided_by_user_id = ${input.ownerUserId},
            decided_at = NOW()
        WHERE id = ${input.requestId}
          AND project_id = ${input.projectId}
          AND status = 'pending'
          AND expires_at > NOW()
        RETURNING *
      ),
      new_member AS (
        INSERT INTO project_memberships (
          id, project_id, user_id, role, status, team_label, scopes
        )
        SELECT
          ${membershipId},
          ${input.projectId},
          approved_request.requester_user_id,
          'member',
          'active',
          ${teamLabel},
          ${scopes}
        FROM approved_request
        RETURNING *
      )
      SELECT
        to_jsonb(approved_request) AS request_row,
        to_jsonb(new_member) AS member_row
      FROM approved_request
      INNER JOIN new_member ON true
    `,
  );

  if (combinedRows.length === 0) {
    return { ok: false, code: "not_pending" };
  }

  const requestPayload = combinedRows[0].request_row;
  const memberPayload = combinedRows[0].member_row;
  if (
    requestPayload === null ||
    typeof requestPayload !== "object" ||
    memberPayload === null ||
    typeof memberPayload !== "object"
  ) {
    return { ok: false, code: "not_pending" };
  }

  const request = mapProjectAccessRequestRow(
    requestPayload as Record<string, unknown>,
  );
  const membership = mapProjectMembershipRow(
    memberPayload as Record<string, unknown>,
  );
  await writeProjectAccessAudit({
    projectId: input.projectId,
    actorUserId: input.ownerUserId,
    action: "approve",
    targetUserId: request.requesterUserId,
    detail: { requestId: request.id, membershipId: membership.id },
  });
  return { ok: true, request, membership };
};
