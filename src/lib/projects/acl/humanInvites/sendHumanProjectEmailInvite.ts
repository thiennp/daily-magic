import isHumanInviteEmailConfigured from "@/lib/email/isHumanInviteEmailConfigured";
import sendHumanInviteEmail from "@/lib/email/sendHumanInviteEmail";
import { getUserById } from "@/lib/auth/userRepository";
import { authorizeProjectInviter } from "@/lib/projects/acl/authorizeProjectInviter";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { buildHumanInviteUrl } from "@/lib/projects/acl/humanInvites/buildHumanInviteUrl";
import { parseHumanInviteRole } from "@/lib/projects/acl/humanInvites/clampHumanInviteParams";
import {
  createHumanInviteToken,
  hashHumanInviteToken,
} from "@/lib/projects/acl/humanInvites/hashHumanInviteToken";
import { HUMAN_INVITE_DEFAULT_EXPIRES_DAYS } from "@/lib/projects/acl/humanInvites/humanInvite.constants";
import { insertHumanEmailInviteRow } from "@/lib/projects/acl/humanInvites/insertHumanEmailInviteRow";
import {
  HUMAN_INVITE_EMAIL_MEMBER_RATE_LIMIT_COUNT,
  HUMAN_INVITE_EMAIL_RATE_LIMIT_COUNT,
} from "@/lib/projects/acl/humanInvites/humanInviteEmail.constant";
import {
  countRecentHumanEmailInvites,
  expireStaleHumanEmailInvites,
  markHumanEmailInviteSent,
  retireUnsentHumanEmailInvite,
} from "@/lib/projects/acl/humanInvites/humanInviteEmailSql";
import { logHumanInviteCreated } from "@/lib/projects/acl/humanInvites/logHumanInviteActivity";
import mapHumanInviteRow from "@/lib/projects/acl/humanInvites/mapHumanInviteRow";
import {
  parseHumanInviteEmailAddress,
  parseEmailInviteRequireEmailMatch,
  parseRequiresApproval,
} from "@/lib/projects/acl/humanInvites/parseHumanInviteEmailAddress";
import type HumanInviteRecord from "@/lib/projects/acl/humanInvites/types/HumanInviteRecord.type";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

export type SendHumanEmailInviteFailCode =
  | "not_found"
  | "forbidden"
  | "invalid"
  | "invalid_email"
  | "cannot_invite_self"
  | "already_invited"
  | "rate_limited"
  | "email_not_configured"
  | "email_send_failed";

export type SendHumanEmailInviteResult =
  | { readonly ok: true; readonly invite: HumanInviteRecord }
  | { readonly ok: false; readonly code: SendHumanEmailInviteFailCode };

/**
 * DF-025 owner-only: create a single-use human invite and email the accept
 * link via the existing Resend client. Token is hashed at rest and never
 * returned, logged, or stored in plaintext; the API response has no link.
 */
export const sendHumanProjectEmailInvite = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
  readonly email?: unknown;
  readonly role?: unknown;
  readonly requireEmailMatch?: unknown;
  readonly requiresApproval?: unknown;
}): Promise<SendHumanEmailInviteResult> => {
  const access = await authorizeProjectInviter({
    projectId: input.projectId,
    actorUserId: input.ownerUserId,
  });
  if (!access.allow) return { ok: false, code: access.reason };
  const email = parseHumanInviteEmailAddress(input.email);
  if (email === null) return { ok: false, code: "invalid_email" };
  const role = parseHumanInviteRole(input.role ?? "member");
  if (role === null) return { ok: false, code: "invalid" };
  if (!isHumanInviteEmailConfigured()) {
    return { ok: false, code: "email_not_configured" };
  }
  const [owner, project] = await Promise.all([
    getUserById(input.ownerUserId),
    getUserProjectById(input.projectId),
  ]);
  if (owner?.email.trim().toLowerCase() === email) {
    return { ok: false, code: "cannot_invite_self" };
  }

  await ensureProjectAclSchema();
  await expireStaleHumanEmailInvites({ projectId: input.projectId, email });
  const recent = await countRecentHumanEmailInvites(
    input.projectId,
    access.owner ? null : input.ownerUserId,
  );
  const limit = access.owner
    ? HUMAN_INVITE_EMAIL_RATE_LIMIT_COUNT
    : HUMAN_INVITE_EMAIL_MEMBER_RATE_LIMIT_COUNT;
  if (recent >= limit) {
    return { ok: false, code: "rate_limited" };
  }

  const requiresApproval =
    !access.owner || parseRequiresApproval(input.requiresApproval);
  const token = createHumanInviteToken();
  const inserted = await insertHumanEmailInviteRow({
    projectId: input.projectId,
    ownerUserId: input.ownerUserId,
    tokenHash: hashHumanInviteToken(token),
    email,
    role,
    requireEmailMatch: parseEmailInviteRequireEmailMatch(
      input.requireEmailMatch,
    ),
    requiresApproval,
  });
  if (inserted === "duplicate") return { ok: false, code: "already_invited" };
  if (inserted === null) return { ok: false, code: "invalid" };
  const created = mapHumanInviteRow(inserted);

  const sent = await sendHumanInviteEmail({
    to: email,
    url: buildHumanInviteUrl(token),
    inviterName: owner?.name?.trim() || owner?.email || "A teammate",
    projectName: project?.name?.trim() || "a project",
    roleLabel: role === "viewer" ? "Viewer" : "Member",
    expiresInDays: HUMAN_INVITE_DEFAULT_EXPIRES_DAYS,
    requiresApproval,
  });
  if (!sent.ok) {
    await retireUnsentHumanEmailInvite(created.id);
    return { ok: false, code: sent.code };
  }
  const stamped = await markHumanEmailInviteSent(created.id);
  const invite = stamped === null ? created : mapHumanInviteRow(stamped);
  await logHumanInviteCreated(invite);
  return { ok: true, invite };
};
