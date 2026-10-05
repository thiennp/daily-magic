import { normalizeProjectDisplayNameKey } from "@/lib/projects/acl/displayNames/normalizeProjectDisplayName";
import { asRowArray, getSql } from "@/lib/db";

export type DispatchMemberKind = "human" | "bot" | "computer";

export type DispatchRecipient = {
  readonly id: string | null;
  readonly user_id: string;
  /** Present when resolved from project_memberships (not owner alias). */
  readonly memberKind?: DispatchMemberKind;
  /** Computer seats only; loaded when memberKind=computer. */
  readonly deviceId?: string | null;
};

const parseMemberKind = (value: unknown): DispatchMemberKind => {
  if (value === "human") return "human";
  if (value === "computer") return "computer";
  return "bot";
};

const toRecipient = (row: Record<string, unknown>): DispatchRecipient => ({
  id: String(row.id),
  user_id: String(row.user_id),
  memberKind: parseMemberKind(row.member_kind),
  deviceId: row.device_id ? String(row.device_id) : null,
});

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
  return rows.map((row) => toRecipient(row));
};

export const lookupDisplayNameRecipients = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly toProjectDisplayName: string;
}): Promise<readonly DispatchRecipient[]> => {
  const sql = getSql();
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
  const matched = rows
    .filter(
      (row) =>
        row.project_display_name &&
        normalizeProjectDisplayNameKey(String(row.project_display_name)) ===
          key &&
        String(row.user_id) !== input.actorUserId,
    )
    .map((row) => toRecipient(row));
  if (matched.length > 0) {
    return matched;
  }
  return resolveByDisplayNameAlias({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
    key,
  });
};
