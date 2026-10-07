import { randomUUID } from "node:crypto";

import { asRowArray, getSql } from "@/lib/db";
import { authorizeProjectOwner } from "@/lib/projects/acl/authorizeProjectOwner";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { classifyClaimInsertError } from "@/lib/projects/acl/humanInvites/classifyClaimInsertError";
import { defaultHumanMembershipScopes } from "@/lib/projects/acl/humanInvites/defaultHumanMembershipScopes";
import { logHumanInviteRequestApproved } from "@/lib/projects/acl/humanInvites/logHumanInviteDecision";
import mapHumanInviteRow from "@/lib/projects/acl/humanInvites/mapHumanInviteRow";
import {
  resolveHumanInviteDecisionMiss,
  type HumanInviteDecisionFailCode,
} from "@/lib/projects/acl/humanInvites/resolveHumanInviteDecisionMiss";
import type HumanInviteRecord from "@/lib/projects/acl/humanInvites/types/HumanInviteRecord.type";
import mapProjectMembershipRow from "@/lib/projects/acl/mapProjectMembershipRow";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";

export type ApproveHumanInviteRequestResult =
  | {
      readonly ok: true;
      readonly invite: HumanInviteRecord;
      readonly membership: ProjectMembershipRecord;
    }
  | { readonly ok: false; readonly code: HumanInviteDecisionFailCode };

/**
 * Owner Approve (108): atomically flip 'accepted' → 'approved' and insert the
 * human membership in one statement. This is the ONLY path that admits an
 * approval-required invitee.
 */
export const approveHumanInviteRequest = async (input: {
  readonly projectId: string;
  readonly inviteId: string;
  readonly ownerUserId: string;
}): Promise<ApproveHumanInviteRequestResult> => {
  const access = await authorizeProjectOwner({
    projectId: input.projectId,
    actorUserId: input.ownerUserId,
  });
  if (!access.allow) return { ok: false, code: access.reason };
  await ensureProjectAclSchema();
  const sql = getSql();
  const membershipId = randomUUID();
  try {
    const rows = asRowArray(
      await sql`
        WITH decided AS (
          UPDATE project_human_invites
          SET status = 'approved',
              redeemed_at = NOW(),
              redeemed_by_user_id = accepted_by_user_id,
              decided_at = NOW(),
              decided_by_user_id = ${input.ownerUserId},
              updated_at = NOW()
          WHERE id = ${input.inviteId}
            AND project_id = ${input.projectId}
            AND status = 'accepted'
            AND accepted_by_user_id IS NOT NULL
          RETURNING *
        ),
        inserted AS (
          INSERT INTO project_memberships (
            id, project_id, user_id, role, status, team_label, scopes,
            project_display_name, member_kind
          )
          SELECT
            ${membershipId},
            decided.project_id,
            decided.accepted_by_user_id,
            decided.role,
            'active',
            NULL,
            CASE WHEN decided.role = 'viewer'
              THEN ${[...defaultHumanMembershipScopes("viewer")]}::text[]
              ELSE ${[...defaultHumanMembershipScopes("member")]}::text[]
            END,
            decided.accepted_display_name,
            'human'
          FROM decided
          RETURNING *
        )
        SELECT to_jsonb(decided) AS invite_row, to_jsonb(inserted) AS member_row
        FROM decided INNER JOIN inserted ON true
      `,
    );
    if (rows.length === 0) {
      return {
        ok: false,
        code: await resolveHumanInviteDecisionMiss(
          input.projectId,
          input.inviteId,
        ),
      };
    }
    const invite = mapHumanInviteRow(
      rows[0].invite_row as Record<string, unknown>,
    );
    const membership = mapProjectMembershipRow(
      rows[0].member_row as Record<string, unknown>,
    );
    await logHumanInviteRequestApproved({
      invite,
      membership,
      ownerUserId: input.ownerUserId,
    });
    return { ok: true, invite, membership };
  } catch (error) {
    const code = classifyClaimInsertError(error);
    if (code !== null) return { ok: false, code };
    throw error;
  }
};
