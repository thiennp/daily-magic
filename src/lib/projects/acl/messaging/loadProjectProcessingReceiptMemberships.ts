import { asRowArray, getSql } from "@/lib/db";

export type ProjectProcessingReceiptMembership = {
  readonly id: string;
  readonly userId: string;
  readonly projectDisplayName: string | null;
  readonly role: unknown;
};

// No status filter: both wake paths only reach peers that
// resolveDispatchRecipients already resolved with status = 'active'.
export const loadProjectProcessingReceiptMemberships = async (input: {
  readonly projectId: string;
  readonly ids: readonly string[];
}): Promise<ReadonlyMap<string, ProjectProcessingReceiptMembership>> => {
  const rows = asRowArray(
    await getSql()`
      SELECT id, user_id, project_display_name, role
      FROM project_memberships
      WHERE project_id = ${input.projectId}
        AND id = ANY(${[...input.ids]}::text[])
    `,
  );
  return new Map(
    rows.map((row) => [
      String(row.id),
      {
        id: String(row.id),
        userId: String(row.user_id),
        projectDisplayName:
          typeof row.project_display_name === "string"
            ? row.project_display_name
            : null,
        role: row.role,
      },
    ]),
  );
};
