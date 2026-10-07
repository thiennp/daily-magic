import { BOT_PROJECT_INVITE_EXPIRES_MINUTES } from "@/lib/projects/acl/invites/botInvites/botProjectInvite.constants";
import type { CreateBotProjectInviteResult } from "@/lib/projects/acl/invites/botInvites/botProjectInviteResult.type";
import { clampBotInviteGrant } from "@/lib/projects/acl/invites/botInvites/clampBotInviteGrant";
import { consumeBotProjectInviteRateLimit } from "@/lib/projects/acl/invites/botInvites/consumeBotProjectInviteRateLimit";
import { ensureProjectBotInviteSchema } from "@/lib/projects/acl/invites/botInvites/ensureProjectBotInviteSchema";
import { insertBotProjectInviteRow } from "@/lib/projects/acl/invites/botInvites/insertBotProjectInviteRow";
import { resolveBotInviterSeat } from "@/lib/projects/acl/invites/botInvites/resolveBotInviterSeat";
import { writeBotInviteCreatedEvent } from "@/lib/projects/acl/invites/botInvites/writeBotInviteAccessEvents";
import { buildProjectInviteUrl } from "@/lib/projects/acl/invites/buildProjectInviteUrl";
import {
  createProjectInviteToken,
  hashProjectInviteToken,
} from "@/lib/projects/acl/invites/hashProjectInviteToken";
import { parseProjectInvitePlatform } from "@/lib/projects/acl/invites/projectInvitePlatform.constant";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";

const readTeamLabel = (raw: unknown, fallback: string | null): string | null =>
  typeof raw === "string" && raw.trim().length > 0
    ? raw.trim().slice(0, 64)
    : fallback;

/**
 * DF-038: an ACTIVE same-owner bot member mints a single-use, 30-minute,
 * member-only assistant invite. Order: seat → grant clamp → rate limit →
 * insert → Access log. Owner-session createProjectInvite is untouched.
 */
export const createBotProjectInvite = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly role?: unknown;
  readonly scopes?: unknown;
  readonly teamLabel?: unknown;
  readonly platform?: unknown;
  readonly nowMs?: number;
}): Promise<CreateBotProjectInviteResult> => {
  const seat = await resolveBotInviterSeat(input);
  if (!seat.ok) return seat;
  const grant = clampBotInviteGrant({
    requestedRole: input.role,
    requestedScopes: input.scopes,
    inviterRole: seat.membership.role,
    inviterScopes: seat.membership.scopes,
  });
  if (!grant.ok) return grant;
  const limit = await consumeBotProjectInviteRateLimit({
    inviterMembershipId: seat.membership.id,
    projectId: input.projectId,
  });
  if (!limit.ok) return { ...limit, code: "rate_limited" };

  await ensureProjectAclSchema();
  await ensureProjectBotInviteSchema();
  const token = createProjectInviteToken();
  const expiresAt = new Date(
    (input.nowMs ?? Date.now()) + BOT_PROJECT_INVITE_EXPIRES_MINUTES * 60_000,
  ).toISOString();
  const invite = await insertBotProjectInviteRow({
    projectId: input.projectId,
    inviterUserId: input.actorUserId,
    inviterMembershipId: seat.membership.id,
    boundOwnerUserId: seat.ownerUserId,
    tokenHash: hashProjectInviteToken(token),
    teamLabel: readTeamLabel(input.teamLabel, seat.membership.teamLabel),
    scopes: grant.scopes,
    expiresAt,
    platform: parseProjectInvitePlatform(input.platform),
  });
  if (invite === null) return { ok: false, code: "invalid" };
  await writeBotInviteCreatedEvent({
    invite,
    inviter: {
      userId: input.actorUserId,
      displayName: seat.membership.projectDisplayName,
    },
  });
  return { ok: true, invite, token, url: buildProjectInviteUrl(token) };
};
