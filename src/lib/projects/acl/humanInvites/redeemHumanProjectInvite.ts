import { assertHumanInviteEmailLock } from "@/lib/projects/acl/humanInvites/assertHumanInviteEmailLock";
import { claimAndInsertHumanMembership } from "@/lib/projects/acl/humanInvites/claimAndInsertHumanMembership";
import { classifyHumanInviteMiss } from "@/lib/projects/acl/humanInvites/classifyHumanInviteMiss";
import { parseHumanInviteEmail } from "@/lib/projects/acl/humanInvites/clampHumanInviteParams";
import { decideHumanMembershipTransition } from "@/lib/projects/acl/humanInvites/decideHumanMembershipTransition";
import { loadUserAccountName } from "@/lib/projects/acl/humanInvites/loadUserAccountName";
import { loadUserEmailVerified } from "@/lib/projects/acl/humanInvites/loadUserEmailVerified";
import { peekHumanInviteByToken } from "@/lib/projects/acl/humanInvites/peekHumanInviteByToken";
import { resolveHumanAcceptDisplayName } from "@/lib/projects/acl/humanInvites/resolveHumanAcceptDisplayName";
import type { RedeemHumanInviteResult } from "@/lib/projects/acl/humanInvites/types/RedeemHumanInviteResult.type";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

export type { RedeemHumanInviteResult };

/** Peek → email lock → guards → name (no claim) → atomic claim+insert. */
export const redeemHumanProjectInvite = async (input: {
  readonly token: string;
  readonly claimantUserId: string;
  readonly claimantEmail?: string | null;
  readonly suggestedProjectDisplayName?: string | null;
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

  const claimantEmailNormalized = parseHumanInviteEmail(
    input.claimantEmail ?? null,
  );
  if (peeked.requireEmailMatch) {
    const claimantEmailVerified = await loadUserEmailVerified(
      input.claimantUserId,
    );
    const lock = assertHumanInviteEmailLock({
      requireEmailMatch: true,
      invitedEmail: peeked.email,
      claimantEmail: input.claimantEmail,
      claimantEmailVerified,
    });
    if (!lock.ok) {
      return {
        ok: false,
        code: lock.code,
        projectId: peeked.projectId,
        invitedEmailMasked: lock.invitedEmailMasked,
      };
    }
  }

  const accountName = await loadUserAccountName(input.claimantUserId);
  const named = await resolveHumanAcceptDisplayName({
    projectId: peeked.projectId,
    suggestedProjectDisplayName: input.suggestedProjectDisplayName,
    accountName,
  });
  if (!named.ok) {
    return {
      ok: false,
      code: named.code,
      projectId: peeked.projectId,
      suggestedProjectDisplayName: named.suggestedProjectDisplayName,
    };
  }

  if (
    decideHumanMembershipTransition({ from: "none", event: "accept" }) !==
    "active"
  ) {
    return { ok: false, code: "invalid_transition" };
  }

  const settled = await claimAndInsertHumanMembership({
    token: input.token,
    claimantUserId: input.claimantUserId,
    claimantEmailNormalized,
    projectDisplayName: named.name,
    role: peeked.role,
  });
  if (!settled.ok) {
    if (settled.code === "invalid_token") {
      return { ok: false, code: await classifyHumanInviteMiss(input.token) };
    }
    if (settled.code === "display_name_taken") {
      return {
        ok: false,
        code: "display_name_taken",
        projectId: peeked.projectId,
        suggestedProjectDisplayName: named.name,
      };
    }
    return { ok: false, code: "already_member", projectId: peeked.projectId };
  }
  return {
    ok: true,
    membership: settled.membership,
    projectId: settled.invite.projectId,
    role: settled.invite.role,
    projectDisplayName: named.name,
  };
};
