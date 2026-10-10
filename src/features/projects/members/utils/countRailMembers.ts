import { filterJoinedHumanMembers } from "@/features/projects/access/humanInvites/utils/public-api/presentation";
import type { AccessMemberForHumanFilter } from "@/features/projects/access/humanInvites/utils/public-api/types";
import { isComputerAccessMember } from "@/features/projects/access/utils/isComputerAccessMember";

/** Assistants rail row: an agent seat that is not a computer (same rule as the Assistants list). */
export const isRailAssistantMember = (
  member: AccessMemberForHumanFilter,
): boolean => member.isAgent && !isComputerAccessMember(member);

/**
 * DF-036 D1 "Members · {n}": you (owner) + joined people + assistants.
 * Computers and anything waiting are not counted.
 */
export const countRailMembers = (
  members: readonly AccessMemberForHumanFilter[],
): number =>
  1 +
  filterJoinedHumanMembers(members).length +
  members.filter(isRailAssistantMember).length;

/**
 * DF-036 F5 "{k} waiting": waiting person invites + open join requests +
 * unused assistant invites. The rail header and the main chip use this.
 */
export const countRailWaiting = (input: {
  readonly peopleInvites: number;
  readonly joinRequests: number;
  readonly assistantInvites: number;
}): number => input.peopleInvites + input.joinRequests + input.assistantInvites;
