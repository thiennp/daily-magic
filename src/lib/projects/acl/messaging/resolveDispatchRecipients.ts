import { normalizeProjectDisplayNameKey } from "@/lib/projects/acl/displayNames/normalizeProjectDisplayName";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { asRowArray, getSql } from "@/lib/db";

export type DispatchRecipient = { readonly id: string | null; readonly user_id: string };

const resolveByDisplayNameAlias = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly key: string;
}): Promise<readonly DispatchRecipient[]> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT m.id, m.user_id
      FROM project_membership_display_name_aliases a
      INNER JOIN project_memberships m
        ON m.id = a.membership_id
       AND m.project_id = a.project_id
       AND m.status = 'active'
      WHERE a.project_id = ${input.projectId}
        AND a.display_name_key = ${input.key}
        AND a.expires_at > NOW()
        AND m.user_id <> ${input.actorUserId}
    `,
  );
  return rows.map((row) => ({
    id: String(row.id),
    user_id: String(row.user_id),
  }));
};

export const resolveDispatchRecipients = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly toMembershipId?: string | null;
  readonly toProjectDisplayName: string | null;
  readonly toTeamLabel: string | null;
}): Promise<
  | { readonly ok: true; readonly recipients: readonly DispatchRecipient[] }
  | { readonly ok: false; readonly code: "recipient_not_found" | "fanout_cap" }
> => {
  const sql = getSql();
  if (input.toMembershipId) {
    const rows = asRowArray(
      await sql`
        SELECT id, user_id
        FROM project_memberships
        WHERE project_id = ${input.projectId}
          AND status = 'active'
          AND id = ${input.toMembershipId}
          AND user_id <> ${input.actorUserId}
        LIMIT 1
      `,
    );
    const row = rows[0];
    if (!row) {
      return { ok: false, code: "recipient_not_found" };
    }
    return {
      ok: true,
      recipients: [{ id: String(row.id), user_id: String(row.user_id) }],
    };
  }
  if (input.toProjectDisplayName?.trim().toLowerCase() === "owner") {
    const project = await getUserProjectById(input.projectId);
    if (project === null || project.ownerUserId === input.actorUserId) {
      return { ok: false, code: "recipient_not_found" };
    }
    return { ok: true, recipients: [{ id: null, user_id: project.ownerUserId }] };
  }
  if (input.toProjectDisplayName) {
    const key = normalizeProjectDisplayNameKey(input.toProjectDisplayName);
    const rows = asRowArray(
      await sql`
        SELECT id, user_id, project_display_name
        FROM project_memberships
        WHERE project_id = ${input.projectId}
          AND status = 'active'
          AND project_display_name IS NOT NULL
      `,
    );
    let recipients = rows
      .filter(
        (row) =>
          row.project_display_name &&
          normalizeProjectDisplayNameKey(String(row.project_display_name)) ===
            key &&
          String(row.user_id) !== input.actorUserId,
      )
      .map((row) => ({ id: String(row.id), user_id: String(row.user_id) }));
    if (recipients.length === 0) {
      recipients = [
        ...(await resolveByDisplayNameAlias({
          projectId: input.projectId,
          actorUserId: input.actorUserId,
          key,
        })),
      ];
    }
    if (recipients.length === 0) {
      return { ok: false, code: "recipient_not_found" };
    }
    if (recipients.length > 20) {
      return { ok: false, code: "fanout_cap" };
    }
    return { ok: true, recipients };
  }
  if (input.toTeamLabel) {
    const rows = asRowArray(
      await sql`
        SELECT id, user_id
        FROM project_memberships
        WHERE project_id = ${input.projectId}
          AND status = 'active'
          AND team_label = ${input.toTeamLabel}
          AND user_id <> ${input.actorUserId}
      `,
    );
    const recipients = rows.map((row) => ({
      id: String(row.id),
      user_id: String(row.user_id),
    }));
    if (recipients.length === 0) {
      return { ok: false, code: "recipient_not_found" };
    }
    if (recipients.length > 20) {
      return { ok: false, code: "fanout_cap" };
    }
    return { ok: true, recipients };
  }
  return { ok: false, code: "recipient_not_found" };
};
