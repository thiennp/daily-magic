import { randomUUID } from "node:crypto";

import mapProjectAccessRequestRow from "@/lib/projects/acl/mapProjectAccessRequestRow";
import type ProjectAccessRequestRecord from "@/lib/projects/acl/types/ProjectAccessRequestRecord.type";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";
import { asRowArray, getSql } from "@/lib/db";

export type InsertOpenPendingAccessRequestResult =
  | { readonly ok: true; readonly request: ProjectAccessRequestRecord }
  | { readonly ok: false; readonly code: "already_pending" };

/** Insert a pending open (no-invite) access request and write request audit. */
export const insertOpenPendingAccessRequest = async (input: {
  readonly projectId: string;
  readonly requesterUserId: string;
  readonly reason: string | null;
  readonly teamLabel: string | null;
  readonly suggestedName: string | null;
  readonly scopes: readonly string[];
}): Promise<InsertOpenPendingAccessRequestResult> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      INSERT INTO project_access_requests (
        id, project_id, requester_user_id, reason, requested_scopes, status,
        team_label, suggested_project_display_name
      )
      VALUES (
        ${randomUUID()},
        ${input.projectId},
        ${input.requesterUserId},
        ${input.reason},
        ${input.scopes},
        'pending',
        ${input.teamLabel},
        ${input.suggestedName}
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
    detail: { requestId: request.id, teamLabel: input.teamLabel },
  });
  return { ok: true, request };
};
