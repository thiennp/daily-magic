import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { asRowArray, getSql } from "@/lib/db";

export type ClearAllProjectMessagesResult =
  | {
      readonly ok: true;
      readonly deletedMessages: number;
      readonly deletedDeliveries: number;
    }
  | { readonly ok: false; readonly code: "not_found" | "forbidden" | "confirm_required" };

/**
 * Owner-only project-wide wipe of project_messages (+ CASCADE deliveries).
 * Does NOT revoke memberships or delete webhook registrations.
 * Deleting message rows also resets the sender-keyed 60/day dispatch counters
 * for messages that lived in this project (counters are COUNT of message rows,
 * not a separate table).
 */
export const clearAllProjectMessages = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly confirm: boolean;
}): Promise<ClearAllProjectMessagesResult> => {
  if (input.confirm !== true) {
    return { ok: false, code: "confirm_required" };
  }

  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return { ok: false, code: "not_found" };
  }
  if (project.ownerUserId !== input.actorUserId) {
    return { ok: false, code: "forbidden" };
  }

  await ensureProjectAclSchema();
  const sql = getSql();

  const deliveryRows = asRowArray(
    await sql`
      DELETE FROM project_message_deliveries d
      USING project_messages m
      WHERE d.message_id = m.id
        AND m.project_id = ${input.projectId}
      RETURNING d.id
    `,
  );
  const messageRows = asRowArray(
    await sql`
      DELETE FROM project_messages
      WHERE project_id = ${input.projectId}
      RETURNING id
    `,
  );

  const deletedDeliveries = deliveryRows.length;
  const deletedMessages = messageRows.length;

  await writeProjectAccessAudit({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
    action: "msg.clear",
    detail: { deletedMessages, deletedDeliveries, count: deletedMessages },
  });

  return { ok: true, deletedMessages, deletedDeliveries };
};
