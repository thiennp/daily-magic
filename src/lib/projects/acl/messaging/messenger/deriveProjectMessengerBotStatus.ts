import type { ProjectMembershipDeliveryMode } from "@/lib/projects/acl/membershipDeliveryMode.constant";
import { isProjectMembershipPollDeliveryMode } from "@/lib/projects/acl/membershipDeliveryMode.constant";
import type { ProjectMessengerBotStatus } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";

const WORKING_STATES: readonly string[] = ["processing", "status_reporting"];
const POLL_WAITING_STATES: readonly string[] = [
  "awaiting_first_activity",
  "silent_5m_notified",
  "blocked_silent_10m",
];
const WAKE_OK = /^http_2\d\d$/;

/**
 * Thread list status from existing signals only (no heartbeat):
 * - working: some live delivery is processing / status_reporting
 * - checks_on_demand: poll-mode bot waiting on an open delivery (no 5/10m)
 * - silent: newest watched ended blocked_silent_10m, or wake not http_2xx
 * - idle: otherwise
 */
export const deriveProjectMessengerBotStatus = (input: {
  readonly states: readonly (string | null)[];
  readonly latestWakeResult: string | null;
  readonly deliveryMode?: ProjectMembershipDeliveryMode;
}): ProjectMessengerBotStatus => {
  if (
    input.states.some(
      (state) => state !== null && WORKING_STATES.includes(state),
    )
  ) {
    return "working";
  }
  const newestWatched = input.states.find((state) => state !== null) ?? null;
  if (isProjectMembershipPollDeliveryMode(input.deliveryMode)) {
    if (
      newestWatched !== null &&
      POLL_WAITING_STATES.includes(newestWatched)
    ) {
      return "checks_on_demand";
    }
    return "idle";
  }
  if (newestWatched === "blocked_silent_10m") {
    return "silent";
  }
  if (
    input.latestWakeResult !== null &&
    !WAKE_OK.test(input.latestWakeResult)
  ) {
    return "silent";
  }
  return "idle";
};
