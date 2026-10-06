import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { hashProjectInviteToken } from "@/lib/projects/acl/invites/hashProjectInviteToken";
import { parseProjectInvitePlatform } from "@/lib/projects/acl/invites/projectInvitePlatform.constant";
import mapProjectAccessRequestRow from "@/lib/projects/acl/mapProjectAccessRequestRow";
import type ProjectAccessRequestRecord from "@/lib/projects/acl/types/ProjectAccessRequestRecord.type";
import { asRowArray, getSql } from "@/lib/db";

/**
 * Re-redeem while still pending (e.g. "If you are a Grok Bot, call redeem
 * again with joinType grok-bot"): updates join_platform on THIS actor's
 * pending request from THIS invite. Never consumes a use, never inserts a
 * second request, never approves. The join-time delivery_mode is resolved
 * from join_platform on Approve. Null = no such pending request.
 */
export const retypePendingRedeemJoinPlatform = async (input: {
  readonly token: string;
  readonly actorUserId: string;
  readonly joinPlatform: string;
}): Promise<{
  readonly request: ProjectAccessRequestRecord;
  readonly invitePlatform: string | null;
} | null> => {
  const trimmed = input.token.trim();
  if (trimmed.length < 16) return null;
  await ensureProjectAclSchema();
  const rows = asRowArray(
    await getSql()`
      UPDATE project_access_requests AS r
      SET join_platform = ${input.joinPlatform}
      FROM project_invites AS i
      WHERE i.token_hash = ${hashProjectInviteToken(trimmed)}
        AND i.revoked_at IS NULL
        AND r.invite_id = i.id
        AND r.requester_user_id = ${input.actorUserId}
        AND r.status = 'pending'
        AND r.expires_at > NOW()
      RETURNING r.*, i.platform AS invite_platform
    `,
  );
  const row = rows[0];
  if (row === undefined) return null;
  return {
    request: mapProjectAccessRequestRow(row),
    invitePlatform: parseProjectInvitePlatform(row.invite_platform),
  };
};
