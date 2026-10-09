import { asRowArray, getSql } from "@/lib/db";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { isBotOwnedBy } from "@/lib/projects/acl/isBotOwnedBy";
import { resolveFolderRefActor } from "@/lib/projects/acl/resolveFolderRefActor";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

export type SetBotInviterResult =
  | { readonly ok: true; readonly inviterUserId: string }
  | {
      readonly ok: false;
      readonly code: "not_found" | "forbidden" | "invalid_inviter";
    };

const isEligibleInviter = async (
  projectId: string,
  ownerUserId: string,
  userId: string,
): Promise<boolean> => {
  if (userId === ownerUserId) return true;
  const seat = await getActiveProjectMembership(projectId, userId);
  return seat?.role === "member" && seat.memberKind === "human";
};

/**
 * Claim an assistant / change who invited it. Only the person who owns the bot
 * may do it; for an unclaimed legacy assistant the project owner may too. A
 * member cannot take over somebody else's assistant. The new inviter is the owner or an active member.
 */
export const setBotInviter = async (input: {
  readonly projectId: string;
  readonly membershipId: string;
  readonly actorUserId: string;
  readonly inviterUserId?: string | null;
}): Promise<SetBotInviterResult> => {
  const actor = await resolveFolderRefActor(input);
  if (!actor.ok) return actor;
  const project = await getUserProjectById(input.projectId);
  const rows = asRowArray(
    await getSql()`
      SELECT user_id, invited_by_user_id FROM project_memberships
      WHERE id = ${input.membershipId} AND project_id = ${input.projectId}
        AND status = 'active' AND member_kind = 'bot'
      LIMIT 1
    `,
  );
  if (project === null || rows.length === 0)
    return { ok: false, code: "not_found" };
  // Whoever does not own the assistant (its person, or the project owner while unclaimed) cannot take it over.
  const unclaimed = !rows[0].invited_by_user_id;
  const mayChange =
    (unclaimed && actor.isOwner) ||
    (await isBotOwnedBy(String(rows[0].user_id), input.actorUserId));
  if (!mayChange) {
    return { ok: false, code: "forbidden" };
  }
  const inviterUserId = input.inviterUserId?.trim() || input.actorUserId;
  if (
    !(await isEligibleInviter(
      input.projectId,
      project.ownerUserId,
      inviterUserId,
    ))
  ) {
    return { ok: false, code: "invalid_inviter" };
  }
  await getSql()`
    UPDATE project_memberships SET invited_by_user_id = ${inviterUserId}
    WHERE id = ${input.membershipId} AND project_id = ${input.projectId}
  `;
  return { ok: true, inviterUserId };
};
