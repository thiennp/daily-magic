import { randomUUID } from "node:crypto";

import mapProjectAccessRequestRow from "@/lib/projects/acl/mapProjectAccessRequestRow";
import type { ProjectAclScope } from "@/lib/projects/acl/projectAclScopes.constant";
import type ProjectAccessRequestRecord from "@/lib/projects/acl/types/ProjectAccessRequestRecord.type";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";
import { asRowArray, getSql } from "@/lib/db";

export type InsertRedeemPendingResult =
  | {
      readonly ok: true;
      readonly request: ProjectAccessRequestRecord;
    }
  | { readonly ok: false; readonly code: "already_pending" };

export const insertRedeemPendingAccessRequest = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly invitedByUserId: string;
  readonly inviteId: string;
  readonly teamLabel: string | null;
  readonly scopes: readonly ProjectAclScope[];
  readonly suggestedName: string | null;
  readonly usesRemaining: number;
  /** Parsed redeem joinType (see projectInviteJoinPlatform.constant); null = not given. */
  readonly joinPlatform?: string | null;
}): Promise<InsertRedeemPendingResult> => {
  const sql = getSql();
  try {
    const rows = asRowArray(
      await sql`
        INSERT INTO project_access_requests (
          id, project_id, requester_user_id, invited_by_user_id, reason,
          requested_scopes, status, invite_id, team_label,
          suggested_project_display_name, join_platform
        )
        VALUES (
          ${randomUUID()},
          ${input.projectId},
          ${input.actorUserId},
          ${input.invitedByUserId},
          ${"invite_redeem"},
          ${[...input.scopes]},
          'pending',
          ${input.inviteId},
          ${input.teamLabel},
          ${input.suggestedName},
          ${input.joinPlatform ?? null}
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
      actorUserId: input.actorUserId,
      action: "invite.redeem",
      targetUserId: input.actorUserId,
      detail: {
        inviteId: input.inviteId,
        requestId: request.id,
        usesRemaining: input.usesRemaining,
        suggestedProjectDisplayName: input.suggestedName,
        joinPlatform: input.joinPlatform ?? null,
      },
    });
    return { ok: true, request };
  } catch {
    return { ok: false, code: "already_pending" };
  }
};
