import { classifyHumanInviteMiss } from "@/lib/projects/acl/humanInvites/classifyHumanInviteMiss";
import { peekHumanInviteByToken } from "@/lib/projects/acl/humanInvites/peekHumanInviteByToken";
import type { HumanInviteRole } from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";
import { getUserById } from "@/lib/auth/userRepository";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

export type HumanInviteAcceptLoad =
  | {
      readonly ok: true;
      readonly token: string;
      readonly projectId: string;
      readonly projectName: string;
      readonly inviterDisplayName: string;
      readonly role: HumanInviteRole;
      readonly expiresAt: string;
      readonly email: string | null;
      /** From peek/API when server exposes requireEmailMatch + invitedEmailMasked. */
      readonly requireEmailMatch: boolean;
      readonly invitedEmailMasked: string | null;
    }
  | {
      readonly ok: false;
      readonly token: string;
      readonly miss: "invalid_token" | "expired" | "revoked" | "already_redeemed";
      readonly projectName: string | null;
      readonly inviterDisplayName: string;
    };

const formatInviter = (name: string | null, email: string | null): string =>
  name?.trim() || email?.trim() || "Someone";

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
  const inviterDisplayName = formatInviter(
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
  // Arch soft: render server invitedEmailMasked only — no client-side mask fallback.
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
  };
};
