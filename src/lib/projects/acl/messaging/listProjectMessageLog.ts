import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { mapProjectMessageLogRow } from "@/lib/projects/acl/messaging/mapProjectMessageLogRow";
import { purgeExpiredProjectMessages } from "@/lib/projects/acl/messaging/purgeExpiredProjectMessages";
import type { ListProjectMessageLogResult } from "@/lib/projects/acl/messaging/projectMessageLog.types";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
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
 * Owner-only full project message log (peer↔peer + Owner-addressed).
 * Reverse-chrono with optional since + cursor pagination.
 */
export const listProjectMessageLog = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly since?: string | null;
  readonly cursor?: string | null;
  readonly limit?: number;
}): Promise<ListProjectMessageLogResult> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return { ok: false, code: "not_found" };
  }
  if (project.ownerUserId !== input.actorUserId) {
    return { ok: false, code: "forbidden" };
  }

  await ensureProjectAclSchema();
  await purgeExpiredProjectMessages();
  const sql = getSql();
  const limit = clampLimit(input.limit);
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

  return { ok: true, messages: page, nextCursor, scope: "project" };
};
