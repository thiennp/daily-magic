import { isBotLinkedToOwnerUser } from "@/lib/projects/acl/invites/botInvites/isBotLinkedToOwnerUser";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { isAgentUserId } from "@/lib/projects/acl/isAgentUser";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

export type BotInviterSeat =
  | {
      readonly ok: true;
      readonly ownerUserId: string;
      readonly membership: ProjectMembershipRecord;
    }
  | {
      readonly ok: false;
      readonly code:
        | "not_found"
        | "inviter_not_bot"
        | "inviter_not_member"
        | "inviter_not_same_owner";
    };

/**
 * Who may mint a bot-made invite: a bot (agent user, bot membership) with an
 * ACTIVE membership on the project, itself linked server-side to the project
 * owner. Humans, computers, owners, pending/revoked seats are all rejected.
 */
export const resolveBotInviterSeat = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
}): Promise<BotInviterSeat> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return { ok: false, code: "not_found" };
  }
  if (
    project.ownerUserId === input.actorUserId ||
    !(await isAgentUserId(input.actorUserId))
  ) {
    return { ok: false, code: "inviter_not_bot" };
  }
  const membership = await getActiveProjectMembership(
    input.projectId,
    input.actorUserId,
  );
  if (membership === null) {
    return { ok: false, code: "inviter_not_member" };
  }
  if ((membership.memberKind ?? "bot") !== "bot") {
    return { ok: false, code: "inviter_not_bot" };
  }
  const linked = await isBotLinkedToOwnerUser({
    botUserId: input.actorUserId,
    ownerUserId: project.ownerUserId,
  });
  if (!linked) {
    return { ok: false, code: "inviter_not_same_owner" };
  }
  return { ok: true, ownerUserId: project.ownerUserId, membership };
};
