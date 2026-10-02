import { normalizeProjectDisplayNameKey } from "@/lib/projects/acl/displayNames/normalizeProjectDisplayName";
import { asRowArray, getSql } from "@/lib/db";

/**
 * True when name collides with an active/naming_required membership, or
 * (when softCheckPending) another pending request's suggestion.
 */
export const isProjectDisplayNameTaken = async (input: {
  readonly projectId: string;
  readonly displayNameKey: string;
  readonly softCheckPending?: boolean;
}): Promise<boolean> => {
  const sql = getSql();
  const key = input.displayNameKey;
  const memberRows = asRowArray(
    await sql`
      SELECT 1 AS hit
      FROM project_memberships
      WHERE project_id = ${input.projectId}
        AND status IN ('active', 'naming_required')
        AND project_display_name IS NOT NULL
        AND length(trim(project_display_name)) > 0
        AND lower(trim(project_display_name)) = ${key}
      LIMIT 1
    `,
  );
  if (memberRows.length > 0) {
    return true;
  }
  if (input.softCheckPending !== true) {
    return false;
  }
  const pendingRows = asRowArray(
    await sql`
      SELECT 1 AS hit
      FROM project_access_requests
      WHERE project_id = ${input.projectId}
        AND status = 'pending'
        AND expires_at > NOW()
        AND suggested_project_display_name IS NOT NULL
        AND length(trim(suggested_project_display_name)) > 0
        AND lower(trim(suggested_project_display_name)) = ${key}
      LIMIT 1
    `,
  );
  return pendingRows.length > 0;
};

export const projectDisplayNameKeyFromValidated = (name: string): string =>
  normalizeProjectDisplayNameKey(name);
