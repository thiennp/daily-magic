import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { purgeExpiredProjectMessages } from "@/lib/projects/acl/messaging/purgeExpiredProjectMessages";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { asRowArray, getSql } from "@/lib/db";

export type ProjectInboxMessage = {
  readonly messageId: string;
  readonly kind: string;
  readonly summary: string;
  readonly refs: Readonly<Record<string, unknown>>;
  readonly fromProjectDisplayName: string | null;
  readonly fromMembershipId: string | null;
  readonly createdAt: string;
  readonly ackedAt: string | null;
};

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
  await ensureProjectAclSchema();
  await purgeExpiredProjectMessages();
  const sql = getSql();
  const limit = Math.min(Math.max(input.limit ?? 50, 1), 100);
  const since = input.since ?? null;
  const rows = asRowArray(
    since
      ? await sql`
          SELECT m.*, sender.project_display_name AS sender_display_name
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
            )
            AND m.created_at > ${since}::timestamptz
          ORDER BY m.created_at DESC
          LIMIT ${limit}
        `
      : await sql`
          SELECT m.*, sender.project_display_name AS sender_display_name
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
            )
          ORDER BY m.created_at DESC
          LIMIT ${limit}
        `,
  );
  return {
    ok: true,
    messages: rows.map((row) => ({
      messageId: String(row.id),
      kind: String(row.kind),
      summary: String(row.summary),
      refs:
        row.refs !== null && typeof row.refs === "object"
          ? (row.refs as Record<string, unknown>)
          : {},
      fromProjectDisplayName: row.sender_membership_id === null
        ? "Owner"
        : row.sender_display_name
          ? String(row.sender_display_name)
          : null,
      fromMembershipId: row.sender_membership_id
        ? String(row.sender_membership_id)
        : null,
      createdAt: String(row.created_at),
      ackedAt: row.acked_at ? String(row.acked_at) : null,
    })),
  };
};
