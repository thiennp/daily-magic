import { asRowArray, getSql } from "@/lib/db";
import { canEditAssistant } from "@/lib/projects/acl/authorizeMembershipEdit";
import mapProjectMembershipRow from "@/lib/projects/acl/mapProjectMembershipRow";
import { resolveFolderRefActor } from "@/lib/projects/acl/resolveFolderRefActor";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";

export type BotManager =
  | {
      readonly ok: true;
      readonly isOwner: boolean;
      readonly bot: ProjectMembershipRecord;
    }
  | { readonly ok: false; readonly code: "not_found" | "forbidden" };

/**
 * Who may manage an assistant seat (block it from other people's assistants,
 * send it new guidance): the person who invited it. The owner only for
 * assistants they invited or older seats with no recorded inviter.
 */
export const resolveBotManager = async (input: {
  readonly projectId: string;
  readonly membershipId: string;
  readonly actorUserId: string;
}): Promise<BotManager> => {
  const actor = await resolveFolderRefActor(input);
  if (!actor.ok) return actor;
  const rows = asRowArray(
    await getSql()`
      SELECT * FROM project_memberships
      WHERE id = ${input.membershipId} AND project_id = ${input.projectId}
        AND status = 'active' AND member_kind = 'bot'
      LIMIT 1
    `,
  );
  if (rows.length === 0) return { ok: false, code: "not_found" };
  const bot = mapProjectMembershipRow(rows[0]);
  const allowed = canEditAssistant({
    actorUserId: input.actorUserId,
    isOwner: actor.isOwner,
    invitedBy: bot.invitedByUserId ?? null,
    ownerMayOverride: false,
  });
  if (!allowed) {
    return { ok: false, code: "forbidden" };
  }
  return { ok: true, isOwner: actor.isOwner, bot };
};
