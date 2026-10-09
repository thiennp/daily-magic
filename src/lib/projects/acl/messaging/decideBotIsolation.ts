export type IsolationSeat = {
  readonly memberKind: string | null;
  readonly invitedByUserId: string | null;
  readonly isolated: boolean;
  readonly userId?: string;
  /** Only its inviter (and their assistants, and the owner) may message it. */
  readonly closed?: boolean;
};

export type BotMessageBlock = "bot_isolated" | "bot_closed";

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

/**
 * Pure: a closed bot only takes messages from the person who invited it and
 * from assistants that same person invited (the owner never reaches this check).
 */
export const isClosedBotBlocked = (
  sender: IsolationSeat,
  recipient: IsolationSeat,
): boolean => {
  if (recipient.memberKind !== "bot" || recipient.closed !== true) return false;
  const inviter = recipient.invitedByUserId;
  if (inviter === null) return false;
  if (sender.userId === inviter) return false;
  return !(sender.memberKind === "bot" && sender.invitedByUserId === inviter);
};

/** Which restriction (if any) stops `sender` messaging `recipient`. */
export const decideBotMessageBlock = (
  sender: IsolationSeat,
  recipient: IsolationSeat,
): BotMessageBlock | null => {
  if (isClosedBotBlocked(sender, recipient)) return "bot_closed";
  return isBotIsolationBlocked(sender, recipient) ? "bot_isolated" : null;
};
