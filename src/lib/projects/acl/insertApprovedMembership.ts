import mapProjectAccessRequestRow from "@/lib/projects/acl/mapProjectAccessRequestRow";
import mapProjectMembershipRow from "@/lib/projects/acl/mapProjectMembershipRow";
import type ProjectAccessRequestRecord from "@/lib/projects/acl/types/ProjectAccessRequestRecord.type";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";
import type { ProjectAclScope } from "@/lib/projects/acl/projectAclScopes.constant";
import { asRowArray, getSql } from "@/lib/db";

export type InsertApprovedMembershipResult =
  | {
      readonly ok: true;
      readonly request: ProjectAccessRequestRecord;
      readonly membership: ProjectMembershipRecord;
    }
  | { readonly ok: false; readonly code: "not_pending" | "display_name_taken" };

export const insertApprovedMembership = async (input: {
  readonly projectId: string;
  readonly requestId: string;
  readonly ownerUserId: string;
  readonly membershipId: string;
  readonly teamLabel: string | null;
  readonly displayName: string | null;
  readonly scopes: readonly ProjectAclScope[];
}): Promise<InsertApprovedMembershipResult> => {
  const sql = getSql();
  try {
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
            id, project_id, user_id, role, status, team_label, scopes,
            project_display_name
          )
          SELECT
            ${input.membershipId},
            ${input.projectId},
            approved_request.requester_user_id,
            'member',
            'active',
            ${input.teamLabel},
            ${[...input.scopes]},
            ${input.displayName}
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
    return {
      ok: true,
      request: mapProjectAccessRequestRow(
        requestPayload as Record<string, unknown>,
      ),
      membership: mapProjectMembershipRow(
        memberPayload as Record<string, unknown>,
      ),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (
      message.includes("project_memberships_display_name_active_idx") ||
      message.includes("unique") ||
      message.includes("duplicate")
    ) {
      return { ok: false, code: "display_name_taken" };
    }
    throw error;
  }
};
