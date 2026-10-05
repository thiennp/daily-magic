import type { ProjectMessengerParentRow } from "@/lib/projects/acl/messaging/messenger/loadProjectMessengerParentRow";

/** Reserved owner address for project_dispatch (same as bots use today). */
const OWNER_ADDRESS = { toProjectDisplayName: "Owner" } as const;

export type ProjectMessengerReplyAddress =
  typeof OWNER_ADDRESS | { readonly toMembershipId: string };

/**
 * Who gets the bot's reply: the human member who sent the parent, else the
 * owner (owner parent, missing parent, or no parent). Never another bot —
 * bot↔bot stays on project_dispatch.
 */
export const pickProjectMessengerReplyAddress = (
  parent: ProjectMessengerParentRow | null,
): ProjectMessengerReplyAddress =>
  parent !== null &&
  parent.senderMembershipId !== null &&
  parent.senderMemberKind === "human"
    ? { toMembershipId: parent.senderMembershipId }
    : OWNER_ADDRESS;
