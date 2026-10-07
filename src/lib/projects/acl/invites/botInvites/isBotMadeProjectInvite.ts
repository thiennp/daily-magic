import type ProjectInviteRecord from "@/lib/projects/acl/invites/types/ProjectInviteRecord.type";

/** Pure: migration 112 marks a bot-made invite by created_by_membership_id. */
export const isBotMadeProjectInvite = (invite: ProjectInviteRecord): boolean =>
  typeof invite.createdByMembershipId === "string" &&
  invite.createdByMembershipId.length > 0;
