import type { ProjectMembershipRole } from "@/lib/projects/acl/types/ProjectMembershipRecord.type";

/**
 * FSA-friendly reason when a bot joins active because its linked human
 * owner holds an editor-or-higher human seat (not project owner).
 * Same-owner auto-approve stays a separate path.
 */
export const MEMBER_OWNER_BOT_AUTO_APPROVE_REASON =
  "member_owner_bot_auto_approve" as const;

/**
 * Human invite roles are member|viewer. "member" is editor-or-higher for
 * seat powers (Dispatch, connect-own-bots). DB also allows role "owner" on
 * memberships; treat that as qualifying. Viewer never auto-approves.
 */
export const canAutoApproveBotForOwnerMembership = (
  role: ProjectMembershipRole,
): boolean => role === "member" || role === "owner";
