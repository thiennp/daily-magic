import { asRowArray, getSql } from "@/lib/db";
import { insertProjectMessageWithDeliveries } from "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries";
import {
  PROJECT_MESSAGE_KIND_TASK_PROCESSING,
  PROJECT_MESSAGE_SUMMARY_MAX_CHARS,
} from "@/lib/projects/acl/messaging/projectMessage.constants";

const processingReceiptSummary = (originalMessageId: string): string =>
  `processing ${originalMessageId}`.slice(0, PROJECT_MESSAGE_SUMMARY_MAX_CHARS);

type MembershipRow = {
  readonly id: string;
  readonly userId: string;
  readonly projectDisplayName: string | null;
};

const loadActiveMemberships = async (input: {
  readonly projectId: string;
  readonly membershipIds: readonly string[];
}): Promise<ReadonlyMap<string, MembershipRow>> => {
  if (input.membershipIds.length === 0) {
    return new Map();
  }
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT id, user_id, project_display_name
      FROM project_memberships
      WHERE project_id = ${input.projectId}
        AND status = 'active'
        AND id = ANY(${[...input.membershipIds]}::text[])
    `,
  );
  return new Map(
    rows.map((row) => {
      const id = String(row.id);
      const membership: MembershipRow = {
        id,
        userId: String(row.user_id),
        projectDisplayName:
          typeof row.project_display_name === "string"
            ? row.project_display_name
            : null,
      };
      return [id, membership] as const;
    }),
  );
};

/**
 * Thin task.processing receipt for the original sender when a peer's HMAC POST
 * returns 2xx. Same shape as the Grok http_200 path; direct insert so a receipt
 * cannot spawn another via orchestrate.
 */
export const insertProjectHmacProcessingReceipt = async (input: {
  readonly projectId: string;
  readonly originalMessageId: string;
  readonly senderMembershipId: string;
  readonly peerMembershipId: string;
}): Promise<void> => {
  if (input.peerMembershipId === input.senderMembershipId) {
    return;
  }
  const byId = await loadActiveMemberships({
    projectId: input.projectId,
    membershipIds: [input.senderMembershipId, input.peerMembershipId],
  });
  const sender = byId.get(input.senderMembershipId);
  const peer = byId.get(input.peerMembershipId);
  if (sender === undefined || peer === undefined) {
    return;
  }
  await insertProjectMessageWithDeliveries({
    projectId: input.projectId,
    senderMembershipId: peer.id,
    senderUserId: peer.userId,
    senderProjectDisplayName: peer.projectDisplayName,
    toMembershipId: sender.id,
    toUserId: sender.userId,
    toTeamLabel: null,
    toProjectDisplayName: sender.projectDisplayName,
    kind: PROJECT_MESSAGE_KIND_TASK_PROCESSING,
    summary: processingReceiptSummary(input.originalMessageId),
    refsJson: "{}",
    recipients: [{ id: sender.id, user_id: sender.userId }],
  });
};
