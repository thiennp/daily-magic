import { canViewerMessageBot } from "@/lib/projects/acl/messaging/canViewerMessageBot";
import { loadClosedBotSeats } from "@/lib/projects/acl/messaging/messenger/loadClosedBotSeats";
import type { ProjectMessengerRow } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";

/**
 * Leaves out the rows sent by or to an assistant that is closed to `viewerUserId` (only the person
 * who invited a closed assistant sees its traffic; no owner exemption). No viewer: unchanged.
 */
export const hideClosedAssistantRows = async <
  Row extends Pick<
    ProjectMessengerRow,
    "toMembershipId" | "senderMembershipId"
  >,
>(input: {
  readonly projectId: string;
  readonly viewerUserId: string | undefined;
  readonly rows: readonly Row[];
}): Promise<readonly Row[]> => {
  const { viewerUserId } = input;
  if (viewerUserId === undefined) return input.rows;
  const closed = await loadClosedBotSeats(input.projectId);
  if (closed.size === 0) return input.rows;
  const hidden = (membershipId: string | null): boolean =>
    membershipId !== null &&
    !canViewerMessageBot(
      {
        closed: closed.has(membershipId),
        invitedByUserId: closed.get(membershipId) ?? null,
      },
      viewerUserId,
    );
  return input.rows.filter(
    (row) => !hidden(row.toMembershipId) && !hidden(row.senderMembershipId),
  );
};
