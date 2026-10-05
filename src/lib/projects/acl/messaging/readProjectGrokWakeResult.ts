import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { STORED_GROK_WAKE_RESULT } from "@/lib/projects/acl/messaging/storedGrokWakeResult.constant";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

export type ReadProjectGrokWakeResult =
  | {
      readonly ok: true;
      readonly messageId: string;
      readonly membershipId: string;
      readonly result: string;
    }
  | { readonly ok: false; readonly code: "not_found" | "forbidden" };

const storedWakeResult = (
  row: Record<string, unknown> | undefined,
): ReadProjectGrokWakeResult => {
  const messageId = row?.message_id;
  const membershipId = row?.membership_id;
  const result = row?.result;
  if (
    typeof messageId !== "string" ||
    typeof membershipId !== "string" ||
    typeof result !== "string" ||
    !STORED_GROK_WAKE_RESULT.test(result)
  ) {
    return { ok: false, code: "not_found" };
  }
  return { ok: true, messageId, membershipId, result };
};

/**
 * Owner read of one stored wake result for a message in this project.
 * Prefers the live wake-attempts join; falls back to project_message_outcomes
 * after delete-on-read / ack removed the message row. Never invents http_200
 * and never returns a URL.
 */
export const readProjectGrokWakeResult = async (input: {
  readonly projectId: string;
  readonly messageId: string;
  readonly actorUserId: string;
}): Promise<ReadProjectGrokWakeResult> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return { ok: false, code: "not_found" };
  }
  if (project.ownerUserId !== input.actorUserId) {
    return { ok: false, code: "forbidden" };
  }

  await ensureProjectAclSchema();
  const sql = getSql();
  const live = asRowArray(
    await sql`
      SELECT a.message_id, a.membership_id, a.result
      FROM project_grok_routine_wake_attempts a
      INNER JOIN project_messages m
        ON m.id = a.message_id
       AND m.project_id = ${input.projectId}
      WHERE a.message_id = ${input.messageId}
      ORDER BY a.created_at DESC
      LIMIT 1
    `,
  );
  const fromLive = storedWakeResult(live[0]);
  if (fromLive.ok) {
    return fromLive;
  }

  const outcomes = asRowArray(
    await sql`
      SELECT message_id,
        recipient_membership_id AS membership_id,
        grok_wake_result AS result
      FROM project_message_outcomes
      WHERE project_id = ${input.projectId}
        AND message_id = ${input.messageId}
      ORDER BY deleted_at DESC
      LIMIT 1
    `,
  );
  return storedWakeResult(outcomes[0]);
};
