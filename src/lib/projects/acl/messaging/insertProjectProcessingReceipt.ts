import { asRowArray, getSql } from "@/lib/db";
import { isProjectMessageReadOnlyRole } from "@/lib/projects/acl/messaging/decideProjectMessagePostAccess";
import { hasProjectProcessingReceipt } from "@/lib/projects/acl/messaging/hasProjectProcessingReceipt";
import { insertProjectMessageWithDeliveries } from "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries";
import {
  PROJECT_MESSAGE_KIND_TASK_PROCESSING,
  PROJECT_MESSAGE_SUMMARY_MAX_CHARS,
} from "@/lib/projects/acl/messaging/projectMessage.constants";
import { serializeByKey } from "@/lib/projects/acl/messaging/serializeByKey";

type Membership = {
  readonly id: string;
  readonly userId: string;
  readonly projectDisplayName: string | null;
  readonly role: unknown;
};

const processingReceiptSummary = (originalMessageId: string): string =>
  `processing ${originalMessageId}`.slice(0, PROJECT_MESSAGE_SUMMARY_MAX_CHARS);

// No status filter: both wake paths only reach peers that
// resolveDispatchRecipients already resolved with status = 'active'.
const loadMemberships = async (input: {
  readonly projectId: string;
  readonly ids: readonly string[];
}): Promise<ReadonlyMap<string, Membership>> => {
  const rows = asRowArray(
    await getSql()`
      SELECT id, user_id, project_display_name, role
      FROM project_memberships
      WHERE project_id = ${input.projectId}
        AND id = ANY(${[...input.ids]}::text[])
    `,
  );
  return new Map(
    rows.map((row) => [
      String(row.id),
      {
        id: String(row.id),
        userId: String(row.user_id),
        projectDisplayName:
          typeof row.project_display_name === "string"
            ? row.project_display_name
            : null,
        role: row.role,
      },
    ]),
  );
};

/**
 * Thin task.processing receipt peer → sender for one accepted wake (Grok
 * http_200 or HMAC 2xx). At most one per peer + original message: calls for
 * the same pair run one after another and skip when the receipt is stored.
 * Direct insert, so a receipt cannot spawn another via orchestrate.
 * `peer` and `sender` are membership ids.
 */
export const insertProjectProcessingReceipt = async (input: {
  readonly projectId: string;
  readonly peer: string;
  readonly sender: string;
  readonly originalMessageId: string;
}): Promise<void> => {
  if (input.peer === input.sender) {
    return;
  }
  const summary = processingReceiptSummary(input.originalMessageId);
  const key = `${input.projectId}:${input.peer}:${input.originalMessageId}`;
  await serializeByKey(key, async () => {
    if (await hasProjectProcessingReceipt({ ...input, summary })) {
      return;
    }
    const byId = await loadMemberships({
      projectId: input.projectId,
      ids: [input.peer, input.sender],
    });
    const peer = byId.get(input.peer);
    const sender = byId.get(input.sender);
    // Viewers are read-only on messages: never post a receipt as them.
    if (peer === undefined || sender === undefined || isProjectMessageReadOnlyRole(peer.role)) {
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
      summary,
      refsJson: "{}",
      recipients: [{ id: sender.id, user_id: sender.userId }],
    });
  });
};
