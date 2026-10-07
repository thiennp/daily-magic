import { PROJECT_MESSENGER_WHOLE_THREAD_KEY } from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";

export type ProjectMessageChatKeyInput = {
  readonly senderMembershipId: string | null;
  readonly toMembershipId: string | null;
  readonly toUserId: string | null;
  readonly toTeamLabel: string | null;
  /** When true, treat as whole-project (no single peer address). */
  readonly isWhole?: boolean;
};

/**
 * Stable chat key for Neon keep-300. Matches messenger thread keys for
 * human↔bot and whole; extends to bot↔bot, team, and system rows.
 */
export const projectMessageChatKey = (
  input: ProjectMessageChatKeyInput,
): string => {
  const team = input.toTeamLabel?.trim() ?? "";
  if (team.length > 0) {
    return `team:${team}`;
  }
  if (input.isWhole === true) {
    return PROJECT_MESSENGER_WHOLE_THREAD_KEY;
  }
  const toMem = input.toMembershipId;
  const fromMem = input.senderMembershipId;
  if (
    toMem === null &&
    input.toUserId === null &&
    fromMem === null
  ) {
    return PROJECT_MESSENGER_WHOLE_THREAD_KEY;
  }
  if (toMem !== null && fromMem !== null && toMem !== fromMem) {
    const [a, b] = toMem < fromMem ? [toMem, fromMem] : [fromMem, toMem];
    return `pair:${a}:${b}`;
  }
  if (toMem !== null) {
    return toMem;
  }
  if (fromMem !== null && input.toUserId !== null) {
    return fromMem;
  }
  if (fromMem === null && toMem === null && input.toUserId !== null) {
    return `system:${input.toUserId}`;
  }
  return PROJECT_MESSENGER_WHOLE_THREAD_KEY;
};
