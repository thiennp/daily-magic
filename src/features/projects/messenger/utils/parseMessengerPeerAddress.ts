import type { AwcMessengerPeerAddress } from "@/features/projects/messenger/types/awcMessengerPeerAddress.type";

const optionalText = (value: unknown): string | null =>
  typeof value === "string" ? value : null;

/** DF-023: additive `peer` on owner-view bot↔bot entries; absent → undefined. */
export const parseMessengerPeerAddress = (
  value: unknown,
): AwcMessengerPeerAddress | undefined => {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }
  const row = value as Record<string, unknown>;
  return {
    toMembershipId: optionalText(row.toMembershipId),
    toDisplayName: optionalText(row.toDisplayName),
    toTeamLabel: optionalText(row.toTeamLabel),
  };
};
