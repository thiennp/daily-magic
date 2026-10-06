import { asRowArray, getSql } from "@/lib/db";
import { PROJECT_COMPOSER_RECIPIENT_STICKY_MEMBER_KINDS } from "@/lib/projects/acl/composer/projectComposerRecipientSticky.constants";

export type ComposerRecipientAssistantSeat = {
  readonly membershipId: string;
  readonly displayName: string | null;
  readonly memberKind: "bot" | "computer";
};

/** Active bot + computer seats sticky / one-assistant FSA may target. */
export const loadActiveComposerRecipientAssistants = async (
  projectId: string,
): Promise<readonly ComposerRecipientAssistantSeat[]> => {
  const sql = getSql();
  const kinds = [...PROJECT_COMPOSER_RECIPIENT_STICKY_MEMBER_KINDS];
  const rows = asRowArray(
    await sql`
      SELECT id, project_display_name, member_kind
      FROM project_memberships
      WHERE project_id = ${projectId}
        AND status = 'active'
        AND member_kind = ANY(${kinds}::text[])
      ORDER BY project_display_name ASC NULLS LAST, created_at ASC
    `,
  );
  return rows.flatMap((row) => {
    const kind = row.member_kind;
    if (kind !== "bot" && kind !== "computer") {
      return [];
    }
    return [
      {
        membershipId: String(row.id),
        displayName: row.project_display_name
          ? String(row.project_display_name)
          : null,
        memberKind: kind,
      },
    ];
  });
};
