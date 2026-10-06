import { asRowArray, getSql } from "@/lib/db";
import type { ProjectComposerRecipientStickyMode } from "@/lib/projects/acl/composer/projectComposerRecipientSticky.constants";
import type { ProjectComposerRecipientStickyRecord } from "@/lib/projects/acl/composer/projectComposerRecipientSticky.types";

const mapRow = (
  row: Record<string, unknown>,
): ProjectComposerRecipientStickyRecord => ({
  mode: row.mode === "membership" ? "membership" : "all",
  membershipId:
    row.membership_id === null || row.membership_id === undefined
      ? null
      : String(row.membership_id),
  updatedAt: String(row.updated_at),
});

export const loadProjectComposerRecipientStickyRow = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
}): Promise<ProjectComposerRecipientStickyRecord | null> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT mode, membership_id, updated_at
      FROM project_composer_recipient_sticky
      WHERE project_id = ${input.projectId}
        AND actor_user_id = ${input.actorUserId}
      LIMIT 1
    `,
  );
  return rows.length === 0 ? null : mapRow(rows[0]);
};

export const upsertProjectComposerRecipientStickyRow = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly mode: ProjectComposerRecipientStickyMode;
  readonly membershipId: string | null;
}): Promise<ProjectComposerRecipientStickyRecord> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      INSERT INTO project_composer_recipient_sticky (
        project_id, actor_user_id, mode, membership_id, updated_at
      )
      VALUES (
        ${input.projectId},
        ${input.actorUserId},
        ${input.mode},
        ${input.membershipId},
        NOW()
      )
      ON CONFLICT (project_id, actor_user_id) DO UPDATE SET
        mode = EXCLUDED.mode,
        membership_id = EXCLUDED.membership_id,
        updated_at = NOW()
      RETURNING mode, membership_id, updated_at
    `,
  );
  return mapRow(rows[0]);
};

/** DELETE sticky for one actor. Returns true if a row was removed. */
export const deleteProjectComposerRecipientStickyRow = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
}): Promise<boolean> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      DELETE FROM project_composer_recipient_sticky
      WHERE project_id = ${input.projectId}
        AND actor_user_id = ${input.actorUserId}
      RETURNING actor_user_id
    `,
  );
  return rows.length > 0;
};

/**
 * Clear every sticky that pointed at a left/removed membership.
 * Returns actor user ids that had sticky cleared (for notices).
 */
export const clearProjectComposerRecipientStickyForMembership = async (input: {
  readonly projectId: string;
  readonly membershipId: string;
}): Promise<readonly string[]> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      DELETE FROM project_composer_recipient_sticky
      WHERE project_id = ${input.projectId}
        AND membership_id = ${input.membershipId}
      RETURNING actor_user_id
    `,
  );
  return rows.map((row) => String(row.actor_user_id));
};
