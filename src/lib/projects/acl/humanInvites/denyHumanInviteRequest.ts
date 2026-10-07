import { asRowArray, getSql } from "@/lib/db";
import { authorizeProjectOwner } from "@/lib/projects/acl/authorizeProjectOwner";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { logHumanInviteRequestDenied } from "@/lib/projects/acl/humanInvites/logHumanInviteDecision";
import mapHumanInviteRow from "@/lib/projects/acl/humanInvites/mapHumanInviteRow";
import {
  resolveHumanInviteDecisionMiss,
  type HumanInviteDecisionFailCode,
} from "@/lib/projects/acl/humanInvites/resolveHumanInviteDecisionMiss";
import type HumanInviteRecord from "@/lib/projects/acl/humanInvites/types/HumanInviteRecord.type";

export type DenyHumanInviteRequestResult =
  | { readonly ok: true; readonly invite: HumanInviteRecord }
  | { readonly ok: false; readonly code: HumanInviteDecisionFailCode };

/** Owner Deny (108): 'accepted' → 'revoked'. No membership is created. */
export const denyHumanInviteRequest = async (input: {
  readonly projectId: string;
  readonly inviteId: string;
  readonly ownerUserId: string;
}): Promise<DenyHumanInviteRequestResult> => {
  const access = await authorizeProjectOwner({
    projectId: input.projectId,
    actorUserId: input.ownerUserId,
  });
  if (!access.allow) return { ok: false, code: access.reason };
  await ensureProjectAclSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      UPDATE project_human_invites
      SET status = 'revoked',
          revoked_at = NOW(),
          decided_at = NOW(),
          decided_by_user_id = ${input.ownerUserId},
          updated_at = NOW()
      WHERE id = ${input.inviteId}
        AND project_id = ${input.projectId}
        AND status = 'accepted'
      RETURNING *
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
  const invite = mapHumanInviteRow(rows[0]);
  await logHumanInviteRequestDenied({ invite, ownerUserId: input.ownerUserId });
  return { ok: true, invite };
};
