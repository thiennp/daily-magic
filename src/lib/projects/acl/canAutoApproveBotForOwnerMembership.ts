import type { ProjectMembershipRole } from "@/lib/projects/acl/types/ProjectMembershipRecord.type";

/**
 * @deprecated Silent member-owner bot auto-approve was removed.
 * Joins require explicit owner Approve or invite.autoApprove / test flag.
 * Kept for FSA/audit reason string stability; always returns false.
 */
export const MEMBER_OWNER_BOT_AUTO_APPROVE_REASON =
  "member_owner_bot_auto_approve" as const;

/** Always false — member-owner auto-approve path removed. */
export const canAutoApproveBotForOwnerMembership = (
  _role: ProjectMembershipRole,
): boolean => false;
