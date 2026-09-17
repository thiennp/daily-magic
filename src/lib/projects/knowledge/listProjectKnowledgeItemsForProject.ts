import { asRowArray, getSql } from "@/lib/db";

export type ProjectKnowledgeItemRow = {
  readonly id: string;
  readonly projectId: string;
  readonly sourceRunId: string | null;
  readonly kind: string;
  readonly body: string | null;
  readonly syncState: string;
  readonly status: string;
  readonly createdAt: string;
};

const listProjectKnowledgeItemsForProject = async (
  ownerUserId: string,
  projectId: string,
  statusFilter?: readonly string[],
): Promise<readonly ProjectKnowledgeItemRow[]> => {
  const sql = getSql();
  const rows = asRowArray(
    statusFilter !== undefined && statusFilter.length > 0
      ? await sql`
          SELECT
            pki.id,
            pki.project_id,
            pki.source_run_id,
            pki.kind,
            pki.body,
            pki.sync_state,
            pki.status,
            pki.created_at
          FROM project_knowledge_items pki
          INNER JOIN user_projects up ON up.id = pki.project_id
          WHERE up.owner_user_id = ${ownerUserId}
            AND pki.project_id = ${projectId}
            AND pki.status = ANY(${[...statusFilter]})
          ORDER BY pki.created_at DESC
        `
      : await sql`
          SELECT
            pki.id,
            pki.project_id,
            pki.source_run_id,
            pki.kind,
            pki.body,
            pki.sync_state,
            pki.status,
            pki.created_at
          FROM project_knowledge_items pki
          INNER JOIN user_projects up ON up.id = pki.project_id
          WHERE up.owner_user_id = ${ownerUserId}
            AND pki.project_id = ${projectId}
          ORDER BY pki.created_at DESC
        `,
  );

  return rows.map((row) => ({
    id: String(row.id),
    projectId: String(row.project_id),
    sourceRunId:
      row.source_run_id !== null && row.source_run_id !== undefined
        ? String(row.source_run_id)
        : null,
    kind: String(row.kind),
    body: row.body !== null && row.body !== undefined ? String(row.body) : null,
    syncState: String(row.sync_state),
    status: String(row.status),
    createdAt: String(row.created_at),
  }));
};

export default listProjectKnowledgeItemsForProject;
