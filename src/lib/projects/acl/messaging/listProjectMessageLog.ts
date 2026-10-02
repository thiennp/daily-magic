import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { purgeExpiredProjectMessages } from "@/lib/projects/acl/messaging/purgeExpiredProjectMessages";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { asRowArray, getSql } from "@/lib/db";

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 100;

export type ProjectMessageLogEntry = {
  readonly messageId: string;
  readonly kind: string;
  readonly summary: string;
  readonly refs: Readonly<Record<string, unknown>>;
  readonly fromProjectDisplayName: string | null;
  readonly fromMembershipId: string | null;
  readonly toProjectDisplayName: string | null;
  readonly toMembershipId: string | null;
  readonly toUserId: string | null;
  readonly toTeamLabel: string | null;
  readonly createdAt: string;
  readonly ackedAt: string | null;
};

export type ListProjectMessageLogResult =
  | {
      readonly ok: true;
      readonly messages: readonly ProjectMessageLogEntry[];
      readonly nextCursor: string | null;
      readonly scope: "project";
    }
  | { readonly ok: false; readonly code: "not_found" | "forbidden" };

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

  const page = rows.slice(0, limit);
  const messages: ProjectMessageLogEntry[] = page.map((row) => {
    const senderMembershipId = row.sender_membership_id
      ? String(row.sender_membership_id)
      : null;
    const storedToName = row.to_project_display_name
      ? String(row.to_project_display_name)
      : null;
    const liveToName = row.recipient_display_name
      ? String(row.recipient_display_name)
      : null;
    return {
      messageId: String(row.id),
      kind: String(row.kind),
      summary: String(row.summary),
      refs:
        row.refs !== null && typeof row.refs === "object"
          ? (row.refs as Record<string, unknown>)
          : {},
      fromProjectDisplayName:
        senderMembershipId === null
          ? "Owner"
          : row.sender_display_name
            ? String(row.sender_display_name)
            : null,
      fromMembershipId: senderMembershipId,
      toProjectDisplayName: liveToName ?? storedToName,
      toMembershipId: row.to_membership_id ? String(row.to_membership_id) : null,
      toUserId: row.to_user_id ? String(row.to_user_id) : null,
      toTeamLabel: row.to_team_label ? String(row.to_team_label) : null,
      createdAt: String(row.created_at),
      ackedAt: row.acked_at ? String(row.acked_at) : null,
    };
  });

  const nextCursor =
    rows.length > limit && messages.length > 0
      ? messages[messages.length - 1].messageId
      : null;

  return { ok: true, messages, nextCursor, scope: "project" };
};
