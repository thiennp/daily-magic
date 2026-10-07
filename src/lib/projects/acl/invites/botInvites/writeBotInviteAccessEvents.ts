import { writeProjectActivityEvent } from "@/lib/projects/acl/activity/writeProjectActivityEvent";
import type ProjectInviteRecord from "@/lib/projects/acl/invites/types/ProjectInviteRecord.type";

/** Inviting bot as the Access log actor ("Invited by {bot nickname}"). */
type BotInviter = {
  readonly userId: string;
  readonly displayName: string | null;
};

/** Access log: a bot created an invite (actor = inviting bot, never owner). */
export const writeBotInviteCreatedEvent = async (input: {
  readonly invite: ProjectInviteRecord;
  readonly inviter: BotInviter;
}): Promise<void> => {
  await writeProjectActivityEvent({
    projectId: input.invite.projectId,
    type: "invite.created",
    actor: {
      kind: "member",
      userId: input.inviter.userId,
      label: input.inviter.displayName,
    },
    detail: {
      inviteId: input.invite.id,
      label: input.invite.id.slice(0, 8),
      expiresAt: input.invite.expiresAt,
      maxUses: input.invite.maxUses,
      teamLabel: input.invite.teamLabel,
      autoApprove: false,
      approvalSource: "bot_invite",
    },
  });
};

/** Access log: a same-owner bot joined through a bot-made invite. */
export const writeBotInviteRedeemedEvent = async (input: {
  readonly projectId: string;
  readonly inviteId: string;
  readonly inviter: BotInviter;
  readonly membershipId: string;
  readonly memberUserId: string;
  readonly memberDisplayName: string;
}): Promise<void> => {
  await writeProjectActivityEvent({
    projectId: input.projectId,
    type: "member.auto_approved",
    actor: {
      kind: "member",
      userId: input.inviter.userId,
      label: input.inviter.displayName,
    },
    target: {
      membershipId: input.membershipId,
      userId: input.memberUserId,
      label: input.memberDisplayName,
    },
    detail: {
      inviteId: input.inviteId,
      label: input.inviteId.slice(0, 8),
      membershipId: input.membershipId,
      memberKind: "bot",
      approvalSource: "bot_invite",
    },
  });
};
