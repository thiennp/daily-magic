import { claimHumanInviteToken } from "@/lib/projects/acl/humanInvites/claimHumanInviteToken";
import { classifyHumanInviteMiss } from "@/lib/projects/acl/humanInvites/classifyHumanInviteMiss";
import { decideHumanMembershipTransition } from "@/lib/projects/acl/humanInvites/decideHumanMembershipTransition";
import { insertHumanProjectMembership } from "@/lib/projects/acl/humanInvites/insertHumanProjectMembership";
import { peekHumanInviteByToken } from "@/lib/projects/acl/humanInvites/peekHumanInviteByToken";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

export type RedeemHumanInviteResult =
  | {
      readonly ok: true;
      readonly membership: ProjectMembershipRecord;
      readonly projectId: string;
      readonly role: string;
    }
  | {
      readonly ok: false;
      readonly code:
        | "invalid_token"
        | "expired"
        | "revoked"
        | "already_redeemed"
        | "already_owner"
        | "already_member"
        | "invalid_transition";
      readonly projectId?: string;
    };

/**
 * Accept orchestrator: peek → explicit already_owner/already_member (no burn) →
 * atomic claim → insert human seat. Double-accept: one membership only.
 */
export const redeemHumanProjectInvite = async (input: {
  readonly token: string;
  readonly claimantUserId: string;
}): Promise<RedeemHumanInviteResult> => {
  const peeked = await peekHumanInviteByToken(input.token);
  if (peeked === null) {
    return { ok: false, code: "invalid_token" };
  }
  const project = await getUserProjectById(peeked.projectId);
  if (project !== null && project.ownerUserId === input.claimantUserId) {
    return { ok: false, code: "already_owner", projectId: peeked.projectId };
  }
  const existing = await getActiveProjectMembership(
    peeked.projectId,
    input.claimantUserId,
  );
  if (existing !== null) {
    return { ok: false, code: "already_member", projectId: peeked.projectId };
  }
  const claimed = await claimHumanInviteToken({
    token: input.token,
    claimantUserId: input.claimantUserId,
  });
  if (!claimed.ok) {
    return { ok: false, code: await classifyHumanInviteMiss(input.token) };
  }
  const next = decideHumanMembershipTransition({
    from: "none",
    event: "accept",
  });
  if (next !== "active") {
    return { ok: false, code: "invalid_transition" };
  }
  const inserted = await insertHumanProjectMembership({
    projectId: claimed.invite.projectId,
    userId: input.claimantUserId,
    role: claimed.invite.role,
  });
  if (!inserted.ok) {
    return {
      ok: false,
      code: "already_member",
      projectId: claimed.invite.projectId,
    };
  }
  return {
    ok: true,
    membership: inserted.membership,
    projectId: claimed.invite.projectId,
    role: claimed.invite.role,
  };
};
