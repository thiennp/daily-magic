import { asRowArray, getSql } from "@/lib/db";
import { PROJECT_COMPOSER_RECIPIENT_STICKY_MEMBER_KINDS } from "@/lib/projects/acl/composer/projectComposerRecipientSticky.constants";

/** True when membershipId is an active bot/computer assignee on the project. */
export const isActiveComposerRecipientStickyMembership = async (input: {
  readonly projectId: string;
  readonly membershipId: string;
}): Promise<boolean> => {
  const sql = getSql();
  const kinds = [...PROJECT_COMPOSER_RECIPIENT_STICKY_MEMBER_KINDS];
  const rows = asRowArray(
    await sql`
      SELECT id
      FROM project_memberships
      WHERE project_id = ${input.projectId}
        AND id = ${input.membershipId}
        AND status = 'active'
        AND member_kind = ANY(${kinds}::text[])
      LIMIT 1
    `,
  );
  return rows.length > 0;
};
