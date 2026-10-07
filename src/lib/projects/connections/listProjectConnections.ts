import { asRowArray, getSql } from "@/lib/db";
import { PROJECT_CONNECTION_PROVIDERS } from "@/lib/projects/connections/projectConnection.constants";
import { ensureProjectConnectionsSchema } from "@/lib/projects/connections/ensureProjectConnectionsSchema";
import { mapProjectConnectionRowToListItem } from "@/lib/projects/connections/mapProjectConnectionRow";
import type { ProjectConnectionListItem } from "@/lib/projects/connections/projectConnection.types";

/**
 * List metadata for a project. Always returns four provider rows
 * (missing → status none) so the UI merge is a no-op when complete.
 * Past token_expires_at while status=connected → expired in the DTO.
 */
export const listProjectConnections = async (
  projectId: string,
): Promise<readonly ProjectConnectionListItem[]> => {
  await ensureProjectConnectionsSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT provider, status, account_label, connected_at, token_expires_at
      FROM project_connections
      WHERE project_id = ${projectId}
    `,
  );
  const byProvider = new Map<string, ProjectConnectionListItem>();
  for (const row of rows) {
    const item = mapProjectConnectionRowToListItem(row);
    if (item !== null) byProvider.set(item.provider, item);
  }
  return PROJECT_CONNECTION_PROVIDERS.map(
    (provider) =>
      byProvider.get(provider) ?? {
        provider,
        status: "none" as const,
        accountLabel: null,
        connectedAt: null,
      },
  );
};
