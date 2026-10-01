import { randomUUID } from "node:crypto";

import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import mapProjectAccessRequestRow from "@/lib/projects/acl/mapProjectAccessRequestRow";
import { PROJECT_ACL_DEFAULT_MEMBER_SCOPES } from "@/lib/projects/acl/projectAclScopes.constant";
import type ProjectAccessRequestRecord from "@/lib/projects/acl/types/ProjectAccessRequestRecord.type";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";
import { checkProjectMembershipStatus } from "@/lib/projects/acl/checkProjectMembershipStatus";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { asRowArray, getSql } from "@/lib/db";

export type CreateProjectAccessRequestResult =
  | { readonly ok: true; readonly request: ProjectAccessRequestRecord }
  | {
      readonly ok: false;
      readonly code:
        "not_found" | "already_member" | "already_pending" | "owner";
    };

export const createProjectAccessRequest = async (input: {
  readonly projectId: string;
  readonly requesterUserId: string;
  readonly reason?: string | null;
  readonly teamLabel?: string | null;
}): Promise<CreateProjectAccessRequestResult> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return { ok: false, code: "not_found" };
  }

  const status = await checkProjectMembershipStatus(
    input.projectId,
    input.requesterUserId,
  );
  if (status === "owner") {
    return { ok: false, code: "owner" };
  }
  if (status === "active") {
    return { ok: false, code: "already_member" };
  }
  if (status === "pending") {
    return { ok: false, code: "already_pending" };
  }

  await ensureProjectAclSchema();
  const sql = getSql();
  const scopes = [...PROJECT_ACL_DEFAULT_MEMBER_SCOPES];
  const reason =
    input.reason && input.reason.trim().length > 0
      ? input.reason.trim().slice(0, 200)
      : null;
  const rows = asRowArray(
    await sql`
      INSERT INTO project_access_requests (
        id, project_id, requester_user_id, reason, requested_scopes, status
      )
      VALUES (
        ${randomUUID()},
        ${input.projectId},
        ${input.requesterUserId},
        ${reason},
        ${scopes},
        'pending'
      )
      RETURNING *
    `,
  );
  if (rows.length === 0) {
    return { ok: false, code: "already_pending" };
  }
  const request = mapProjectAccessRequestRow(rows[0]);
  await writeProjectAccessAudit({
    projectId: input.projectId,
    actorUserId: input.requesterUserId,
    action: "request",
    targetUserId: input.requesterUserId,
    detail: { requestId: request.id, teamLabel: input.teamLabel ?? null },
  });
  return { ok: true, request };
};
