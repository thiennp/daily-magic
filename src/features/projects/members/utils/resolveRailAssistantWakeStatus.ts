import type { AccessMembershipView } from "@/features/projects/access/utils/projectAccessApi.types";
import type { AssistantWakeHealth } from "@/features/projects/members/utils/formatAssistantWakeHealth";

export type RailAssistantWakeStatus =
  | "ready"
  | "checks_on_demand"
  | "checking"
  | "cant_reach"
  | "cant_check"
  | "not_connected";

/**
 * Honest wake status for a Members rail assistant row (DF-036):
 * - poll (no wake save this session) → Checks in only when asked
 * - no stored wake link → Checking… right after a save, else Not connected
 * - stored link: status request failed → Couldn't check the wake link (+ Retry);
 *   loading → Checking…; backend says none saved → Not connected;
 *   last wake failed → Wake failed; else Wake link ✓
 * Never "Not connected" while the backend has a link saved; never a fake ✓.
 */
export const resolveRailAssistantWakeStatus = (input: {
  readonly member: Pick<AccessMembershipView, "id" | "wakeLinkSet" | "deliveryMode">;
  readonly savedIds: ReadonlySet<string>;
  /** undefined = still loading; null = backend says no wake link is saved. */
  readonly health: AssistantWakeHealth | null | undefined;
  readonly loadFailed?: boolean;
}): RailAssistantWakeStatus => {
  const { member, savedIds, health } = input;
  const savedNow = savedIds.has(member.id);
  if (member.deliveryMode === "poll" && !savedNow) return "checks_on_demand";
  if (member.wakeLinkSet !== true) return savedNow ? "checking" : "not_connected";
  if (input.loadFailed === true) return "cant_check";
  if (health === undefined) return "checking";
  if (health === null) return "not_connected";
  return health.failed ? "cant_reach" : "ready";
};
