import type { AccessMembershipView } from "@/features/projects/access/utils/projectAccessApi.types";

export type AwcMemberWakeLinkState = "awaiting" | "wakes" | "on_demand" | null;

type WakeLinkMember = Pick<
  AccessMembershipView,
  "id" | "isAgent" | "wakeLinkSet" | "deliveryMode"
>;

/** A stored wake link, or one saved in this session (until the next poll). */
export const hasMemberWakeLink = (
  member: Pick<AccessMembershipView, "id" | "wakeLinkSet">,
  savedIds: ReadonlySet<string> = new Set(),
): boolean => member.wakeLinkSet === true || savedIds.has(member.id);

/**
 * Stored mode, with a wake-link save in this session counted as webhook
 * (the save flips delivery_mode to webhook server-side).
 */
const effectiveDeliveryMode = (
  member: WakeLinkMember,
  savedIds: ReadonlySet<string>,
): "webhook" | "poll" =>
  savedIds.has(member.id) || member.deliveryMode !== "poll" ? "webhook" : "poll";

/**
 * Display truth (Product MUST): "Wakes up on its own" only with a wake link
 * AND delivery_mode=webhook. Everything else shows "Checks on demand" — never
 * claim wake without a link.
 */
export const resolveMemberDeliveryModeDisplay = (
  member: WakeLinkMember,
  savedIds: ReadonlySet<string> = new Set(),
): "webhook" | "poll" =>
  hasMemberWakeLink(member, savedIds) &&
  effectiveDeliveryMode(member, savedIds) === "webhook"
    ? "webhook"
    : "poll";

/**
 * Owner Access row badge, by mode first. `wakeLinkSet` is only on owner
 * snapshots for active member bots; absent → null (no pill).
 * - poll → "on_demand" (Checks on demand), even with a wake link
 * - webhook + link → "wakes" (Wakes up on its own)
 * - webhook + no link → "awaiting" (Waiting for wake link)
 */
export const resolveMemberWakeLinkState = (
  member: WakeLinkMember,
  savedIds: ReadonlySet<string> = new Set(),
): AwcMemberWakeLinkState => {
  if (!member.isAgent || member.wakeLinkSet === undefined) {
    return null;
  }
  if (effectiveDeliveryMode(member, savedIds) === "poll") {
    return "on_demand";
  }
  return hasMemberWakeLink(member, savedIds) ? "wakes" : "awaiting";
};

/** Members still waiting for the owner to save a wake link. */
export const listMembersAwaitingWakeLink = <T extends WakeLinkMember>(
  members: readonly T[],
  savedIds: ReadonlySet<string> = new Set(),
): readonly T[] =>
  members.filter(
    (member) => resolveMemberWakeLinkState(member, savedIds) === "awaiting",
  );
