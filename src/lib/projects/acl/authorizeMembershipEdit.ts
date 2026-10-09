import { asRowArray, getSql } from "@/lib/db";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

export type MembershipEditAuth =
  | { readonly ok: true; readonly ownerUserId: string }
  | { readonly ok: false; readonly code: "not_found" | "forbidden" };

/** Pure: may `actor` edit an assistant seat invited by `invitedBy`? */
export const canEditAssistant = (input: {
  readonly actorUserId: string;
  readonly isOwner: boolean;
  readonly invitedBy: string | null;
  /** Owner may act on any assistant (remove only). */
  readonly ownerMayOverride: boolean;
}): boolean =>
  input.invitedBy === input.actorUserId ||
  (input.isOwner && (input.invitedBy === null || input.ownerMayOverride));

/**
 * Edit gate for one membership. An assistant belongs to whoever invited it:
 * only that person edits it (rename, wake link, delivery mode, block, new
 * guidance); the owner does not edit other people's assistants. Older seats
 * with no recorded inviter fall back to the owner. People and computers stay
 * owner-only. `ownerUserId` is returned for the lib calls that act as owner.
 */
export const authorizeMembershipEdit = async (input: {
  readonly projectId: string;
  readonly membershipId: string;
  readonly actorUserId: string;
  readonly ownerMayOverride?: boolean;
}): Promise<MembershipEditAuth> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) return { ok: false, code: "not_found" };
  const isOwner = project.ownerUserId === input.actorUserId;
  const rows = asRowArray(
    await getSql()`
      SELECT member_kind, invited_by_user_id FROM project_memberships
      WHERE id = ${input.membershipId} AND project_id = ${input.projectId}
      LIMIT 1
    `,
  );
  if (rows.length === 0) return { ok: false, code: "not_found" };
  const { ownerUserId } = project;
  if (rows[0].member_kind !== "bot") {
    return isOwner
      ? { ok: true, ownerUserId }
      : { ok: false, code: "forbidden" };
  }
  const invitedBy = rows[0].invited_by_user_id
    ? String(rows[0].invited_by_user_id)
    : null;
  const allowed = canEditAssistant({
    actorUserId: input.actorUserId,
    isOwner,
    invitedBy,
    ownerMayOverride: input.ownerMayOverride === true,
  });
  if (!allowed) return { ok: false, code: "forbidden" };
  if (!isOwner) {
    const seat = await getActiveProjectMembership(
      input.projectId,
      input.actorUserId,
    );
    if (seat?.role !== "member" || seat.memberKind !== "human") {
      return { ok: false, code: "forbidden" };
    }
  }
  return { ok: true, ownerUserId };
};
