import type { AccessMembershipView } from "@/features/projects/access/utils/projectAccessApi.types";

export type AwcMemberWakeLinkState = "awaiting" | "set" | null;

/**
 * Owner Access row state. `wakeLinkSet` is only on owner snapshots for active
 * member bots; absent → null (no pill). A save in this session wins until the
 * next poll confirms it.
 */
export const resolveMemberWakeLinkState = (
  member: Pick<AccessMembershipView, "id" | "isAgent" | "wakeLinkSet">,
  savedIds: ReadonlySet<string> = new Set(),
): AwcMemberWakeLinkState => {
  if (!member.isAgent || member.wakeLinkSet === undefined) {
    return null;
  }
  if (member.wakeLinkSet || savedIds.has(member.id)) {
    return "set";
  }
  return "awaiting";
};

/** Members still waiting for the owner to save a wake link. */
export const listMembersAwaitingWakeLink = <
  T extends Pick<AccessMembershipView, "id" | "isAgent" | "wakeLinkSet">,
>(
  members: readonly T[],
  savedIds: ReadonlySet<string> = new Set(),
): readonly T[] =>
  members.filter(
    (member) => resolveMemberWakeLinkState(member, savedIds) === "awaiting",
  );
