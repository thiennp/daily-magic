import { isProjectMessengerWholeAddress } from "@/lib/projects/acl/messaging/messenger/isProjectMessengerWholeAddress";
import { PROJECT_MESSENGER_WHOLE_THREAD_KEY } from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";
import type {
  ProjectMessengerRow,
  ProjectMessengerThreadKey,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";

const isHuman = (kind: ProjectMessengerRow["recipientKind"]): boolean =>
  kind === "owner" || kind === "member";

/**
 * Which thread a row belongs to, or null when it is not owner/member↔bot chat:
 * - owner/member → one bot: that bot's thread
 * - owner/member → whole (no single address): Whole project
 * - bot → owner/member: the bot's thread, or Whole project when it replies
 *   to a Whole project message
 * - bot↔bot, system notices, team-label sends: not in the messenger
 */
export const projectMessengerThreadKeyForRow = (input: {
  readonly row: ProjectMessengerRow;
  readonly botIds: ReadonlySet<string>;
  readonly wholeMessageIds: ReadonlySet<string>;
  readonly inReplyTo: string | null;
}): ProjectMessengerThreadKey | null => {
  const { row } = input;
  if (row.senderKind === "owner" || row.senderKind === "member") {
    if (isProjectMessengerWholeAddress(row)) {
      return PROJECT_MESSENGER_WHOLE_THREAD_KEY;
    }
    return row.toMembershipId !== null && input.botIds.has(row.toMembershipId)
      ? row.toMembershipId
      : null;
  }
  if (
    row.senderKind !== "bot" ||
    row.senderMembershipId === null ||
    !input.botIds.has(row.senderMembershipId) ||
    !isHuman(row.recipientKind)
  ) {
    return null;
  }
  return input.inReplyTo !== null && input.wholeMessageIds.has(input.inReplyTo)
    ? PROJECT_MESSENGER_WHOLE_THREAD_KEY
    : row.senderMembershipId;
};
