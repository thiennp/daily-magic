import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import mapProjectAccessRequestRow from "@/lib/projects/acl/mapProjectAccessRequestRow";
import type ProjectAccessRequestRecord from "@/lib/projects/acl/types/ProjectAccessRequestRecord.type";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { asRowArray, getSql } from "@/lib/db";

export type DenyProjectAccessResult =
  | { readonly ok: true; readonly request: ProjectAccessRequestRecord }
  | {
      readonly ok: false;
      readonly code: "not_found" | "forbidden" | "not_pending";
    };

export const denyProjectAccessRequest = async (input: {
  readonly projectId: string;
  readonly requestId: string;
  readonly ownerUserId: string;
}): Promise<DenyProjectAccessResult> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return { ok: false, code: "not_found" };
  }
  if (project.ownerUserId !== input.ownerUserId) {
    return { ok: false, code: "forbidden" };
  }

  await ensureProjectAclSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      UPDATE project_access_requests
      SET status = 'denied',
          decided_by_user_id = ${input.ownerUserId},
          decided_at = NOW()
      WHERE id = ${input.requestId}
        AND project_id = ${input.projectId}
        AND status = 'pending'
      RETURNING *
    `,
  );
  if (rows.length === 0) {
    return { ok: false, code: "not_pending" };
  }
  const request = mapProjectAccessRequestRow(rows[0]);
  await writeProjectAccessAudit({
    projectId: input.projectId,
    actorUserId: input.ownerUserId,
    action: "deny",
    targetUserId: request.requesterUserId,
    detail: { requestId: request.id },
  });
  return { ok: true, request };
};
