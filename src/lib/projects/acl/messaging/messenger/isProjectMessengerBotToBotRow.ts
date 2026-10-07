import { PROJECT_MESSAGE_LIFECYCLE_KINDS } from "@/lib/projects/acl/messaging/projectMessage.constants";
import { PROJECT_MESSENGER_HIDDEN_KINDS } from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";
import type { ProjectMessengerRow } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";

const EXCLUDED_KINDS: ReadonlySet<string> = new Set([
  ...PROJECT_MESSAGE_LIFECYCLE_KINDS,
  ...PROJECT_MESSENGER_HIDDEN_KINDS,
]);

/**
 * DF-023: a bot's project_dispatch to another bot seat (or to a team label).
 * Lifecycle fan-outs (peer.joined/left/renamed, project.updated, system
 * notices) are not dispatches and stay out — the owner already gets its own copy.
 */
export const isProjectMessengerBotToBotRow = (input: {
  readonly row: ProjectMessengerRow;
  readonly botIds: ReadonlySet<string>;
}): boolean => {
  const { row } = input;
  if (
    row.senderKind !== "bot" ||
    row.senderMembershipId === null ||
    !input.botIds.has(row.senderMembershipId) ||
    EXCLUDED_KINDS.has(row.kind)
  ) {
    return false;
  }
  if (row.toMembershipId !== null) {
    return row.recipientKind === "bot" && input.botIds.has(row.toMembershipId);
  }
  return row.toUserId === null && row.toTeamLabel !== null;
};
