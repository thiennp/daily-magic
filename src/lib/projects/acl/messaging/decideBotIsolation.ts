export type IsolationSeat = {
  readonly memberKind: string | null;
  readonly invitedByUserId: string | null;
  readonly isolated: boolean;
};

/**
 * Pure: an isolated bot may only exchange messages with non-bot seats
 * (owner, people, computers) and bots invited by the same person. Applies in
 * both directions; the restriction is the stricter side's.
 */
export const isBotIsolationBlocked = (
  sender: IsolationSeat,
  recipient: IsolationSeat,
): boolean => {
  if (sender.memberKind !== "bot" || recipient.memberKind !== "bot") {
    return false;
  }
  if (!sender.isolated && !recipient.isolated) return false;
  return (
    sender.invitedByUserId === null ||
    sender.invitedByUserId !== recipient.invitedByUserId
  );
};
