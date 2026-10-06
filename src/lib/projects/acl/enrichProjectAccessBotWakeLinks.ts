import type { MembershipView } from "@/lib/projects/acl/buildProjectAccessViews";
import { loadProjectMemberWakeLinkSet } from "@/lib/projects/acl/webhooks/loadProjectMemberWakeLinkSet";

/** Rows the owner's Grok wake-link form can write (owner route = active role='member' bot). */
export const isWakeLinkEligibleMember = (member: MembershipView): boolean =>
  member.isAgent &&
  member.memberKind === "bot" &&
  member.role === "member" &&
  member.status === "active";

/**
 * Owner-only: add `wakeLinkSet` to active member bots so the Access panel can
 * show "Waiting for wake link" until the owner saves the Grok wake link.
 * Other rows are returned untouched. On a read failure the flag is omitted
 * (no awaiting UI) instead of failing the whole Access snapshot.
 */
export const enrichProjectAccessBotWakeLinks = async (
  projectId: string,
  members: readonly MembershipView[],
): Promise<readonly MembershipView[]> => {
  const eligibleIds = members.filter(isWakeLinkEligibleMember).map((m) => m.id);
  if (eligibleIds.length === 0) {
    return members;
  }
  const flags = await loadProjectMemberWakeLinkSet({
    projectId,
    membershipIds: eligibleIds,
  }).catch(() => null);
  if (flags === null) {
    return members;
  }
  return members.map((member) =>
    isWakeLinkEligibleMember(member)
      ? { ...member, wakeLinkSet: flags.get(member.id) ?? false }
      : member,
  );
};
