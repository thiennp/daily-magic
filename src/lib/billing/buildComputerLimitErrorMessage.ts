import { isAgentWitchDeviceRecentlySeen } from "@/lib/agentWitch/agentWitchHeartbeat.constant";
import type { ActiveComputerForLimit } from "@/lib/billing/listActiveComputersForLimit";

const MAX_NAMED_OFFLINE = 3;

const formatOfflineNames = (labels: readonly string[]): string => {
  const named = labels.slice(0, MAX_NAMED_OFFLINE).join(", ");
  const more = labels.length - MAX_NAMED_OFFLINE;
  return more > 0 ? `${named} and ${more} more` : named;
};

/**
 * f6e63bf4 (E2E 6/8): the limit error said "you have 5 connected" while the
 * sidebar said "3 connected", because offline and outdated computers count
 * too, and it sent people to a "Computers page" that does not exist. The
 * message now splits online / offline, names the offline ones, and points at
 * the real list (sidebar Computers, or Your computers on Home). The limit
 * itself is unchanged.
 */
export const buildComputerLimitErrorMessage = (input: {
  readonly maxComputers: number;
  readonly computers: readonly ActiveComputerForLimit[];
  readonly nowMs?: number;
}): string => {
  const nowMs = input.nowMs ?? Date.now();
  const offline = input.computers.filter(
    (computer) => !isAgentWitchDeviceRecentlySeen(computer.lastSeenAt, nowMs),
  );
  const total = input.computers.length;
  const online = total - offline.length;
  const split =
    offline.length === 0
      ? "all online"
      : `${online} online, ${offline.length} offline: ${formatOfflineNames(offline.map((computer) => computer.label))}`;
  return [
    `This plan allows up to ${input.maxComputers} computers, and ${total} are linked to your account (${split}).`,
    offline.length > 0 ? "Offline computers still count." : null,
    "Remove one you no longer use: in Computers in the sidebar or Your computers on Home, open its ⋯ menu and choose Delete. Then connect again.",
  ]
    .filter((part): part is string => part !== null)
    .join(" ");
};
