import type { ProjectMessengerBotStatus } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";

const WORKING_STATES: readonly string[] = ["processing", "status_reporting"];
const WAKE_OK = /^http_2\d\d$/;

/**
 * Thread list status from existing signals only (no heartbeat):
 * - working: some live delivery to the bot is processing / status_reporting
 * - silent: newest watched delivery ended blocked_silent_10m, or the bot's
 *   latest stored Grok wake result is not http_2xx
 * - idle: otherwise
 * states: b2b_state of the bot's live deliveries, newest message first.
 */
export const deriveProjectMessengerBotStatus = (input: {
  readonly states: readonly (string | null)[];
  readonly latestWakeResult: string | null;
}): ProjectMessengerBotStatus => {
  if (
    input.states.some(
      (state) => state !== null && WORKING_STATES.includes(state),
    )
  ) {
    return "working";
  }
  const newestWatched = input.states.find((state) => state !== null) ?? null;
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
