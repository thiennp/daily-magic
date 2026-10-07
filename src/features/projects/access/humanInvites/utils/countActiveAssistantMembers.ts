import type { AccessMemberForHumanFilter } from "@/features/projects/access/humanInvites/utils/filterJoinedHumanMembers";

/**
 * DF-036: active assistant memberships (memberKind=bot, or isAgent when the
 * payload omits memberKind). Computers and people are not counted.
 */
export const countActiveAssistantMembers = (
  members: readonly AccessMemberForHumanFilter[],
): number =>
  members.filter((member) => {
    if (member.status !== undefined && member.status !== "active") return false;
    if (member.memberKind !== undefined) return member.memberKind === "bot";
    return member.isAgent;
  }).length;
