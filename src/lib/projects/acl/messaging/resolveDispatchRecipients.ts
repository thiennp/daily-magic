import { normalizeProjectDisplayNameKey } from "@/lib/projects/acl/displayNames/normalizeProjectDisplayName";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { asRowArray, getSql } from "@/lib/db";

export type DispatchRecipient = { readonly id: string | null; readonly user_id: string };

export const resolveDispatchRecipients = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly toProjectDisplayName: string | null;
  readonly toTeamLabel: string | null;
}): Promise<
  | { readonly ok: true; readonly recipients: readonly DispatchRecipient[] }
  | { readonly ok: false; readonly code: "recipient_not_found" | "fanout_cap" }
> => {
  const sql = getSql();
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
    const recipients = rows
      .filter(
        (row) =>
          row.project_display_name &&
          normalizeProjectDisplayNameKey(String(row.project_display_name)) ===
            key &&
          String(row.user_id) !== input.actorUserId,
      )
      .map((row) => ({ id: String(row.id), user_id: String(row.user_id) }));
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
