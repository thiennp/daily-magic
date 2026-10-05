import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { checkProjectMessageSilence } from "@/lib/projects/acl/messaging/checkProjectMessageSilence";
import { purgeExpiredProjectMessages } from "@/lib/projects/acl/messaging/purgeExpiredProjectMessages";
import { stampProjectInboxReadAt } from "@/lib/projects/acl/messaging/stampProjectInboxReadAt";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import {
  mapProjectInboxRow,
  type ProjectInboxMessage,
} from "@/lib/projects/acl/messaging/mapProjectInboxRow";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { asRowArray, getSql } from "@/lib/db";

export type { ProjectInboxMessage };

export type ListProjectInboxResult =
  | { readonly ok: true; readonly messages: readonly ProjectInboxMessage[] }
  | { readonly ok: false; readonly code: "forbidden" };

export const listProjectInbox = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly since?: string | null;
  readonly limit?: number;
}): Promise<ListProjectInboxResult> => {
  const membership = await getActiveProjectMembership(
    input.projectId,
    input.actorUserId,
  );
  const project = await getUserProjectById(input.projectId);
  const isOwner = project?.ownerUserId === input.actorUserId;
  if (membership === null && !isOwner) {
    return { ok: false, code: "forbidden" };
  }
  const teamLabel = membership?.teamLabel ?? null;
  const membershipId = membership?.id ?? null;
  await ensureProjectAclSchema();
  await purgeExpiredProjectMessages();
  await checkProjectMessageSilence({ now: new Date() });
  const sql = getSql();
  const limit = Math.min(Math.max(input.limit ?? 50, 1), 100);
  const since = input.since ?? null;
  const rows = asRowArray(
    await sql`
      SELECT m.*, sender.project_display_name AS sender_display_name,
        (
          SELECT a.result
          FROM project_grok_routine_wake_attempts a
          WHERE a.message_id = m.id
            AND a.membership_id = ${membershipId}
          ORDER BY a.created_at DESC
          LIMIT 1
        ) AS grok_wake_result
      FROM project_messages m
      LEFT JOIN project_memberships sender
        ON sender.id = m.sender_membership_id
      WHERE m.project_id = ${input.projectId}
        AND (
          m.to_user_id = ${input.actorUserId}
          OR (
            m.to_team_label IS NOT NULL
            AND m.to_team_label = ${teamLabel}
          )
          OR EXISTS (
            SELECT 1 FROM project_message_deliveries own
            WHERE own.message_id = m.id
              AND own.membership_id = ${membershipId}
          )
        )
        AND (
          ${since}::timestamptz IS NULL
          OR m.created_at > ${since}::timestamptz
        )
      ORDER BY m.created_at DESC
      LIMIT ${limit}
    `,
  );
  const messages = rows.map(mapProjectInboxRow);
  // Fetch stamps read_at only; delete-on-read tick needs notice/terminal (not listing alone).
  await stampProjectInboxReadAt({
    messageIds: messages.map((message) => message.messageId),
  });
  return {
    ok: true,
    messages,
  };
};
