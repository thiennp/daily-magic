import { classifyHumanInviteMiss } from "@/lib/projects/acl/humanInvites/classifyHumanInviteMiss";
import { peekHumanInviteByToken } from "@/lib/projects/acl/humanInvites/peekHumanInviteByToken";
import type { HumanInviteAcceptLoad } from "@/features/projects/access/humanInvites/types/humanInviteAcceptLoad.type";
import { formatHumanInviteInviter } from "@/features/projects/access/humanInvites/utils/public-api/presentation";
import { getUserById } from "@/lib/auth/userRepository";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

export type { HumanInviteAcceptLoad } from "@/features/projects/access/humanInvites/types/humanInviteAcceptLoad.type";

/** Server load for /invite/h/[token] — peek + project + inviter (open-link v1). */
export const loadHumanInviteAcceptPage = async (
  rawToken: string,
): Promise<HumanInviteAcceptLoad> => {
  const token = decodeURIComponent(rawToken ?? "").trim();
  if (token.length < 16) {
    return {
      ok: false,
      token,
      miss: "invalid_token",
      projectName: null,
      inviterDisplayName: "Someone",
    };
  }

  const peeked = await peekHumanInviteByToken(token);
  if (peeked === null) {
    const miss = await classifyHumanInviteMiss(token);
    return {
      ok: false,
      token,
      miss,
      projectName: null,
      inviterDisplayName: "Someone",
    };
  }

  const [project, inviter] = await Promise.all([
    getUserProjectById(peeked.projectId),
    getUserById(peeked.createdByUserId),
  ]);
  const inviterDisplayName = formatHumanInviteInviter(
    inviter?.name ?? null,
    inviter?.email ?? null,
  );
  const projectName = project?.name ?? "this project";

  const now = Date.now();
  const expiresAt = new Date(peeked.expiresAt).getTime();
  if (peeked.revokedAt) {
    return {
      ok: false,
      token,
      miss: "revoked",
      projectName,
      inviterDisplayName,
    };
  }
  if (peeked.status === "accepted") {
    return {
      ok: false,
      token,
      miss: "awaiting_approval",
      projectName,
      inviterDisplayName,
    };
  }
  if (peeked.redeemedAt || peeked.usesRemaining <= 0) {
    return {
      ok: false,
      token,
      miss: "already_redeemed",
      projectName,
      inviterDisplayName,
    };
  }
  if (Number.isFinite(expiresAt) && expiresAt <= now) {
    return {
      ok: false,
      token,
      miss: "expired",
      projectName,
      inviterDisplayName,
    };
  }

  const peekedLock = peeked as typeof peeked & {
    readonly requireEmailMatch?: boolean;
    readonly invitedEmailMasked?: string | null;
  };
  const requireEmailMatch = peekedLock.requireEmailMatch === true;
  const invitedEmailMasked =
    typeof peekedLock.invitedEmailMasked === "string"
      ? peekedLock.invitedEmailMasked
      : null;

  return {
    ok: true,
    token,
    projectId: peeked.projectId,
    projectName,
    inviterDisplayName,
    role: peeked.role,
    expiresAt: peeked.expiresAt,
    email: peeked.email,
    requireEmailMatch,
    invitedEmailMasked,
    requiresApproval: peeked.requiresApproval,
  };
};
