import {
  BOT_PROJECT_INVITE_EXPIRES_MINUTES,
  BOT_PROJECT_INVITE_ROLE,
} from "@/lib/projects/acl/invites/botInvites/botProjectInvite.constants";
import type { CreateBotProjectInviteResult } from "@/lib/projects/acl/invites/botInvites/botProjectInviteResult.type";
import { buildProjectInviteJoinUrl } from "@/lib/projects/acl/invites/buildProjectInviteJoinUrl";

type CreatedOk = Extract<CreateBotProjectInviteResult, { readonly ok: true }>;

/** Shared 201 body for the MCP tool and the REST route (token shown once). */
export const botProjectInviteSuccessBody = (
  created: CreatedOk,
): Readonly<Record<string, unknown>> => ({
  ok: true,
  inviteId: created.invite.id,
  projectId: created.invite.projectId,
  token: created.token,
  url: created.url,
  joinUrl: buildProjectInviteJoinUrl(created.token),
  expiresAt: created.invite.expiresAt,
  maxUses: created.invite.maxUses,
  role: BOT_PROJECT_INVITE_ROLE,
  scopes: [...created.invite.scopes],
  message: `Single-use invite, expires in ${BOT_PROJECT_INVITE_EXPIRES_MINUTES} min. Give it only to a bot claimed by this project's owner; that bot calls redeem_project_invite with the token and a suggestedProjectDisplayName and is seated as a member at once. Any other redeemer is rejected and the code is used up. It shows in the owner's Access log as invited by you, and the owner can revoke it.`,
});
