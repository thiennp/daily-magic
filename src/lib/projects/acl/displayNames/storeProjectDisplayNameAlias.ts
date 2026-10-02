import { PROJECT_DISPLAY_NAME_ALIAS_TTL_DAYS } from "@/lib/projects/acl/displayNames/projectDisplayNameAlias.constant";
import { normalizeProjectDisplayNameKey } from "@/lib/projects/acl/displayNames/normalizeProjectDisplayName";
import { getSql } from "@/lib/db";

export const storeProjectDisplayNameAlias = async (input: {
  readonly projectId: string;
  readonly membershipId: string;
  readonly previousDisplayName: string;
  readonly ttlDays?: number;
  readonly now?: Date;
}): Promise<void> => {
  const trimmed = input.previousDisplayName.trim();
  if (trimmed.length === 0) {
    return;
  }
  const ttlDays = input.ttlDays ?? PROJECT_DISPLAY_NAME_ALIAS_TTL_DAYS;
  const key = normalizeProjectDisplayNameKey(trimmed);
  const base = input.now ?? new Date();
  const expiresAt = new Date(
    base.getTime() + ttlDays * 24 * 60 * 60 * 1000,
  ).toISOString();
  const sql = getSql();
  await sql`
    INSERT INTO project_membership_display_name_aliases (
      project_id, membership_id, display_name, display_name_key, expires_at
    )
    VALUES (
      ${input.projectId},
      ${input.membershipId},
      ${trimmed},
      ${key},
      ${expiresAt}
    )
  `;
};
