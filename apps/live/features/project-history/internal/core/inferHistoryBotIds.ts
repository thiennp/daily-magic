import { readOptionalHistoryStringKeys } from "./readOptionalHistoryString";

/**
 * Best-effort bot membership ids when the history payload has no member_kind.
 * Owner→bot: only `toMembershipId`. Bot→human: only `fromMembershipId`.
 * Member→bot: only `toMembershipId` (from stays human).
 */
export const inferHistoryBotIds = (
  message: Readonly<Record<string, unknown>>,
): ReadonlySet<string> => {
  const fromMembershipId = readOptionalHistoryStringKeys(message, [
    "fromMembershipId",
    "senderMembershipId",
    "sender_membership_id",
  ]);
  const toMembershipId = readOptionalHistoryStringKeys(message, [
    "toMembershipId",
    "to_membership_id",
  ]);
  if (fromMembershipId === null && toMembershipId !== null) {
    return new Set([toMembershipId]);
  }
  if (fromMembershipId !== null && toMembershipId === null) {
    return new Set([fromMembershipId]);
  }
  if (fromMembershipId !== null && toMembershipId !== null) {
    return new Set([toMembershipId]);
  }
  return new Set();
};
