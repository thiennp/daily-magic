import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { countArchivedProjectMessages } from "@/lib/projects/acl/messaging/countArchivedProjectMessages";
import { mapProjectMessageLogRow } from "@/lib/projects/acl/messaging/mapProjectMessageLogRow";
import { purgeExpiredProjectMessages } from "@/lib/projects/acl/messaging/purgeExpiredProjectMessages";
import type { ListProjectMessageLogResult } from "@/lib/projects/acl/messaging/projectMessageLog.types";
import { resolveOwnerOrActiveHumanSeat } from "@/lib/projects/acl/resolveOwnerOrActiveHumanSeat";
import { asRowArray, getSql } from "@/lib/db";

export type {
  ListProjectMessageLogResult,
  ProjectMessageLogEntry,
} from "@/lib/projects/acl/messaging/projectMessageLog.types";

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 100;

const clampLimit = (limit: number | undefined): number => {
  if (limit === undefined || !Number.isFinite(limit)) return DEFAULT_LIMIT;
  const whole = Math.floor(limit);
  if (whole < 1) return 1;
  return whole > MAX_LIMIT ? MAX_LIMIT : whole;
};

/**
 * Full project message log (peer↔peer + Owner-addressed).
 * Owner, or active human member|viewer (read-only seats still may read).
 * Reverse-chrono with optional since + cursor pagination.
 * Inbox (default) hides archived rows; archived=true lists only archived rows
 * (Archived filter). Same read access either way; Restore is owner-only.
 */
export const listProjectMessageLog = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly since?: string | null;
  readonly cursor?: string | null;
  readonly limit?: number;
  readonly archived?: boolean;
}): Promise<ListProjectMessageLogResult> => {
  const access = await resolveOwnerOrActiveHumanSeat({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
  });
  if (!access.ok) {
    return { ok: false, code: access.code };
  }

  await ensureProjectAclSchema();
  await purgeExpiredProjectMessages();
  const sql = getSql();
  const limit = clampLimit(input.limit);
  const archived = input.archived === true;
  const since =
    typeof input.since === "string" && input.since.trim().length > 0
      ? input.since.trim()
      : null;
  const cursor =
    typeof input.cursor === "string" && input.cursor.trim().length > 0
      ? input.cursor.trim()
      : null;

  const rows = asRowArray(
    await sql`
      SELECT
        m.*,
        sender.project_display_name AS sender_display_name,
        recipient.project_display_name AS recipient_display_name
      FROM project_messages m
      LEFT JOIN project_memberships sender
        ON sender.id = m.sender_membership_id
      LEFT JOIN project_memberships recipient
        ON recipient.id = m.to_membership_id
      WHERE m.project_id = ${input.projectId}
        AND (m.archived_at IS NOT NULL) = ${archived}::boolean
        AND (${since}::timestamptz IS NULL OR m.created_at > ${since}::timestamptz)
        AND (
          ${cursor}::text IS NULL
          OR m.created_at < (
            SELECT c.created_at FROM project_messages c
            WHERE c.id = ${cursor} AND c.project_id = ${input.projectId}
          )
          OR (
            m.created_at = (
              SELECT c.created_at FROM project_messages c
              WHERE c.id = ${cursor} AND c.project_id = ${input.projectId}
            )
            AND m.id < ${cursor}
          )
        )
      ORDER BY m.created_at DESC, m.id DESC
      LIMIT ${limit + 1}
    `,
  );

  const page = rows.slice(0, limit).map(mapProjectMessageLogRow);
  const nextCursor =
    rows.length > limit && page.length > 0
      ? page[page.length - 1].messageId
      : null;

  return {
    ok: true,
    messages: page,
    nextCursor,
    scope: "project",
    archived,
    archivedCount: await countArchivedProjectMessages(input.projectId),
    canRestore: access.kind === "owner",
  };
};
