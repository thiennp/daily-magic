import { asRowArray, getSql } from "@/lib/db";

/** Ids of pending requests that already have a pre-registered wake link (flag only, no secrets). */
export const listPendingWakeLinkRequestIds = async (
  projectId: string,
): Promise<ReadonlySet<string>> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT request_id FROM project_access_request_grok_webhooks
      WHERE project_id = ${projectId}
    `,
  );
  return new Set(rows.map((row) => String(row.request_id)));
};
