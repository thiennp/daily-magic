import type { AccessMembershipView } from "@/features/projects/access/utils/projectAccessApi.types";
import type { AssistantWakeHealth } from "@/features/projects/members/utils/formatAssistantWakeHealth";

export type RailAssistantWakeStatus =
  | "ready"
  | "checks_on_demand"
  | "checking"
  | "cant_reach"
  | "not_connected";

/**
 * P1-S1b: honest wake status for a Members rail assistant row.
 * - poll (no wake save this session) → Checks in only when asked
 * - no stored wake link → Checking… right after a save, else Not connected
 * - stored link: health loading → Checking…; last wake failed → Wake failed;
 *   health known and fine → Wake link ✓; health unknown (load failed) → Not connected
 * Never a fake Ready.
 */
export const resolveRailAssistantWakeStatus = (input: {
  readonly member: Pick<AccessMembershipView, "id" | "wakeLinkSet" | "deliveryMode">;
  readonly savedIds: ReadonlySet<string>;
  /** undefined = still loading; null = could not load. */
  readonly health: AssistantWakeHealth | null | undefined;
}): RailAssistantWakeStatus => {
  const { member, savedIds, health } = input;
  const savedNow = savedIds.has(member.id);
  if (member.deliveryMode === "poll" && !savedNow) return "checks_on_demand";
  if (member.wakeLinkSet !== true) return savedNow ? "checking" : "not_connected";
  if (health === undefined) return "checking";
  if (health === null) return "not_connected";
  return health.failed ? "cant_reach" : "ready";
};
