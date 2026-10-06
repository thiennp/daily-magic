import type { AccessMembershipView } from "@/features/projects/access/utils/projectAccessApi.types";

export type AwcMemberWakeLinkState = "awaiting" | "set" | "on_demand" | null;

/**
 * Owner Access row state. `wakeLinkSet` is only on owner snapshots for active
 * member bots; absent → null (no pill). A save in this session wins until the
 * next poll confirms it. delivery_mode=poll without a link → "on_demand"
 * (Checks on demand), not "awaiting": no wake link is expected.
 */
export const resolveMemberWakeLinkState = (
  member: Pick<
    AccessMembershipView,
    "id" | "isAgent" | "wakeLinkSet" | "deliveryMode"
  >,
  savedIds: ReadonlySet<string> = new Set(),
): AwcMemberWakeLinkState => {
  if (!member.isAgent || member.wakeLinkSet === undefined) {
    return null;
  }
  if (member.wakeLinkSet || savedIds.has(member.id)) {
    return "set";
  }
  return member.deliveryMode === "poll" ? "on_demand" : "awaiting";
};

/** Members still waiting for the owner to save a wake link. */
export const listMembersAwaitingWakeLink = <
  T extends Pick<
    AccessMembershipView,
    "id" | "isAgent" | "wakeLinkSet" | "deliveryMode"
  >,
>(
  members: readonly T[],
  savedIds: ReadonlySet<string> = new Set(),
): readonly T[] =>
  members.filter(
    (member) => resolveMemberWakeLinkState(member, savedIds) === "awaiting",
  );
